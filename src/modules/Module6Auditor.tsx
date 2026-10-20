import { useState, useMemo } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Clipboard, Zap } from 'lucide-react';
import { edgeCaseChecklist } from '../data/data';
import { useApp } from '../context/AppContext';

interface AuditResult {
  id: string;
  name: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

function runAudit(code: string, language: 'python' | 'cpp'): AuditResult[] {
  const results: AuditResult[] = [];

  // Check: missing import sys
  if (language === 'python') {
    const hasSys = /import\s+sys/.test(code);
    const usesSys = /sys\.(stdin|setrecursionlimit|stdout)/.test(code);
    if (usesSys && !hasSys) {
      results.push({
        id: 'missing-sys',
        name: 'Thiếu import sys',
        severity: 'error',
        message: '⚠️ Dùng sys nhưng không có "import sys"!',
        suggestion: 'Thêm: import sys ở đầu file',
      });
    }

    // Check: recursion without setrecursionlimit
    const hasRecursion = /def\s+dfs|@lru_cache|@cache/.test(code);
    const hasRecursionLimit = /setrecursionlimit/.test(code);
    if (hasRecursion && !hasRecursionLimit) {
      results.push({
        id: 'recursion-limit',
        name: 'Thiếu setrecursionlimit',
        severity: 'error',
        message: '⚠️ Dùng đệ quy/cache nhưng chưa có sys.setrecursionlimit!',
        suggestion: 'Thêm: sys.setrecursionlimit(300000) ở đầu file',
      });
    }

    // Check: slow input in loop  
    const hasSlowInput = /for\s+\w+\s+in\s+range[\s\S]{0,200}input\(\)/.test(code);
    const hasFastInput = /input\s*=\s*sys\.stdin|sys\.stdin\.read/.test(code);
    if (hasSlowInput && !hasFastInput) {
      results.push({
        id: 'slow-input',
        name: 'Input chậm trong vòng lặp',
        severity: 'warning',
        message: '⚠️ Dùng input() trong vòng lặp – chậm với N > 10^4!',
        suggestion: 'Thêm: input = sys.stdin.readline ở đầu file',
      });
    }

    // Check: max initialized to 0
    const maxZeroPattern = /\b(ans|best|res|result|max_val)\s*=\s*0\b/.test(code);
    if (maxZeroPattern) {
      results.push({
        id: 'max-init-zero',
        name: 'Max khởi tạo bằng 0',
        severity: 'warning',
        message: '⚠️ Biến tìm max/best khởi tạo bằng 0 – sai khi đáp án âm!',
        suggestion: 'Dùng: ans = float("-inf") hoặc ans = -10**18',
      });
    }

    // Check: magic INF number
    if (/999999999|1e9|10\*\*9\b/.test(code)) {
      results.push({
        id: 'magic-inf',
        name: 'Magic number INF',
        severity: 'info',
        message: 'ℹ️ Dùng magic number cho INF – đảm bảo đủ lớn cho bài toán.',
        suggestion: 'Dùng float("inf") hoặc INF = 10**18 để an toàn hơn',
      });
    }

    // Check: print in loop (performance)
    if (/for\s+[\s\S]{0,100}print\(/.test(code)) {
      results.push({
        id: 'print-in-loop',
        name: 'Print trong vòng lặp',
        severity: 'info',
        message: 'ℹ️ print() trong vòng lặp lớn – có thể chậm.',
        suggestion: 'Gom output vào list rồi print("\\n".join(...))',
      });
    }

    // Check: subtask branching
    const hasN = /\bn\s*=/.test(code);
    const hasBranching = /if\s+n\s*<=\s*(20|1000|100|1e3)/.test(code);
    if (hasN && !hasBranching) {
      results.push({
        id: 'no-subtask-branch',
        name: 'Không có phân nhánh Subtask',
        severity: 'info',
        message: 'ℹ️ Không thấy phân nhánh theo kích thước N – cân nhắc thêm để bảo toàn Subtask 1.',
        suggestion: 'if n <= 1000:\\n    # brute force\\nelse:\\n    # efficient solution',
      });
    }
  }

  if (language === 'cpp') {
    // Check: int overflow
    const hasIntMultiply = /\bint\b[\s\S]{0,50}\*[\s\S]{0,50};/.test(code);
    if (hasIntMultiply) {
      results.push({
        id: 'int-overflow',
        name: 'Tràn số int trong C++',
        severity: 'error',
        message: '⚠️ Nhân int × int có thể tràn số khi giá trị > 2×10^9!',
        suggestion: 'Dùng (long long)a * b hoặc khai báo ll thay vì int',
      });
    }

    // Check: no sync_with_stdio
    if (!/sync_with_stdio/.test(code) && /cin|cout/.test(code)) {
      results.push({
        id: 'no-sync',
        name: 'Thiếu sync_with_stdio(false)',
        severity: 'warning',
        message: '⚠️ Dùng cin/cout nhưng chưa có ios::sync_with_stdio(false)!',
        suggestion: 'Thêm vào đầu main():\nios::sync_with_stdio(false);\ncin.tie(nullptr);',
      });
    }

    // Check: missing KACTL macros
    if (/\brep\(/.test(code) && !/#define\s+rep/.test(code)) {
      results.push({
        id: 'missing-macros',
        name: 'Thiếu macro KACTL',
        severity: 'error',
        message: '⚠️ Dùng macro rep() nhưng không có định nghĩa!',
        suggestion: '#define rep(i,a,b) for(int i=a;i<(b);++i)',
      });
    }

    // Check: endl vs \\n
    if (/endl/.test(code)) {
      results.push({
        id: 'endl-flush',
        name: 'Dùng endl (flush chậm)',
        severity: 'info',
        message: 'ℹ️ endl flush buffer mỗi lần – dùng "\\n" để nhanh hơn.',
        suggestion: 'Thay endl bằng "\\n" (ngoại trừ interactive problems)',
      });
    }
  }

  if (results.length === 0) {
    results.push({
      id: 'all-clear',
      name: 'Code sạch!',
      severity: 'info',
      message: '✅ Không phát hiện lỗi phổ biến. Code trông ổn!',
      suggestion: 'Vẫn cần kiểm tra thủ công edge cases bên dưới.',
    });
  }

  return results;
}

const SEVERITY_CONFIG = {
  error: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)' },
  warning: { icon: AlertTriangle, color: '#fb923c', bg: 'rgba(251,146,60,0.08)', border: 'rgba(251,146,60,0.25)' },
  info: { icon: Info, color: '#4f8ef7', bg: 'rgba(79,142,247,0.08)', border: 'rgba(79,142,247,0.25)' },
};

export default function Module6Auditor() {
  const { state, setState } = useApp();
  const [code, setCode] = useState(state.auditorCode || '');
  const [language, setLanguage] = useState<'python' | 'cpp'>(state.auditorLanguage || 'python');

  const auditResults = useMemo(() => {
    if (!code.trim()) return [];
    return runAudit(code, language);
  }, [code, language]);

  const errorCount = auditResults.filter(r => r.severity === 'error').length;
  const warningCount = auditResults.filter(r => r.severity === 'warning').length;

  const saveCode = (newCode: string) => {
    setCode(newCode);
    setState(s => ({ ...s, auditorCode: newCode }));
  };
  const saveLang = (lang: 'python' | 'cpp') => {
    setLanguage(lang);
    setState(s => ({ ...s, auditorLanguage: lang }));
  };

  const toggleCheck = (id: string) => {
    setState(s => ({
      ...s,
      checkedItems: { ...s.checkedItems, [id]: !s.checkedItems[id] }
    }));
  };

  const allChecked = edgeCaseChecklist.every(c => state.checkedItems[c.id]);
  const checkedCount = edgeCaseChecklist.filter(c => state.checkedItems[c.id]).length;

  const pasteFromClipboard = async () => {
    const text = await navigator.clipboard.readText();
    saveCode(text);
  };

  const groupedChecklist = edgeCaseChecklist.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof edgeCaseChecklist>);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span style={{
            background: 'linear-gradient(135deg, #fb923c, #f472b6)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            🔬 Trình Quét Lỗi Code
          </span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          "5 Phút Cuối Trước Khi Nộp" – Dán code vào, quét lỗi ngay!
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
        {/* Left: Code input */}
        <div>
          {/* Language & paste */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['python', 'cpp'] as const).map(lang => (
                <button
                  key={lang}
                  className={`tab-button ${language === lang ? 'active' : ''}`}
                  onClick={() => saveLang(lang)}
                  style={{ padding: '6px 14px' }}
                >
                  {lang === 'python' ? '🐍 Python' : '⚡ C++'}
                </button>
              ))}
            </div>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '5px', padding: '6px 12px' }}
              onClick={pasteFromClipboard}
            >
              <Clipboard size={13} /> Paste từ Clipboard
            </button>
            {code && (
              <button
                onClick={() => saveCode('')}
                style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                ✕ Xoá
              </button>
            )}
          </div>

          <textarea
            className="input-field"
            rows={20}
            value={code}
            onChange={e => saveCode(e.target.value)}
            placeholder={language === 'python'
              ? `Dán code Python vào đây...\n\nVí dụ:\nimport sys\ninput = sys.stdin.readline\n\ndef solve():\n    n = int(input())\n    ...`
              : `Dán code C++ vào đây...\n\nVí dụ:\n#include <bits/stdc++.h>\nusing namespace std;\ntypedef long long ll;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    ...`
            }
            style={{
              resize: 'vertical',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: '0.8rem',
              lineHeight: 1.65,
              minHeight: '400px',
            }}
          />

          {code && (
            <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {code.split('\n').length} dòng · {code.length} ký tự
            </div>
          )}
        </div>

        {/* Right: Audit results + checklist */}
        <div>
          {/* Results */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} color="#fbbf24" /> Kết Quả Phân Tích
              </h3>
              {auditResults.length > 0 && (
                <div style={{ display: 'flex', gap: '6px' }}>
                  {errorCount > 0 && <span className="tag tag-orange">{errorCount} lỗi nghiêm trọng</span>}
                  {warningCount > 0 && <span className="tag tag-yellow">{warningCount} cảnh báo</span>}
                  {errorCount === 0 && warningCount === 0 && <span className="tag tag-green">✓ Sạch</span>}
                </div>
              )}
            </div>

            {!code.trim() ? (
              <div style={{
                padding: '32px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                background: 'var(--bg-secondary)',
                borderRadius: '10px',
                border: '1px dashed var(--border)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🔍</div>
                <div style={{ fontSize: '0.85rem' }}>Dán code vào bên trái để bắt đầu phân tích</div>
              </div>
            ) : (
              <div>
                {auditResults.map(result => {
                  const cfg = SEVERITY_CONFIG[result.severity];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={result.id}
                      className="animate-fade-in"
                      style={{
                        background: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                        borderRadius: '8px',
                        padding: '12px 14px',
                        marginBottom: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <Icon size={16} color={cfg.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: cfg.color, marginBottom: '2px' }}>
                            {result.name}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '6px', lineHeight: 1.5 }}>
                            {result.message}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                            💡 {result.suggestion}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Edge case checklist */}
          <div className="card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 700 }}>
                ✅ Checklist Edge Cases
              </h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {checkedCount}/{edgeCaseChecklist.length}
                </span>
                {allChecked && <span className="tag tag-green">Hoàn thành!</span>}
              </div>
            </div>

            <div className="progress-bar" style={{ marginBottom: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${(checkedCount / edgeCaseChecklist.length) * 100}%` }} />
            </div>

            {Object.entries(groupedChecklist).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {category}
                </div>
                {items.map(item => {
                  const checked = !!state.checkedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      className="checkbox-item"
                      onClick={() => toggleCheck(item.id)}
                    >
                      {checked
                        ? <CheckCircle2 size={16} color="#34d399" />
                        : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid var(--text-muted)' }} />}
                      <span style={{
                        fontSize: '0.82rem',
                        color: checked ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: checked ? 'line-through' : 'none',
                      }}>
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}

            <button
              onClick={() => {
                const allDone = edgeCaseChecklist.reduce((acc, c) => ({ ...acc, [c.id]: true }), {});
                setState(s => ({ ...s, checkedItems: allDone }));
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', width: '100%', marginTop: '8px', padding: '7px' }}
            >
              ✓ Đánh dấu tất cả
            </button>
          </div>
        </div>
      </div>

      {/* Common patterns reference */}
      <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: '0.9rem', fontWeight: 700 }}>
          🚨 Top 5 Lỗi Chết Người Trong BioTuring Test
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {[
            { icon: '💀', title: 'Max/Min khởi tạo sai', bad: 'ans = 0', good: 'ans = float("-inf")' },
            { icon: '📚', title: 'Đệ quy không có limit', bad: 'def dfs(...):', good: 'sys.setrecursionlimit(300000)' },
            { icon: '🐌', title: 'Input chậm', bad: 'for i in range(n): a[i] = int(input())', good: 'input = sys.stdin.readline' },
            { icon: '💥', title: 'Tràn số C++', bad: 'int ans = a * b;', good: 'long long ans = (long long)a * b;' },
            { icon: '🔧', title: 'Sai trình biên dịch', bad: 'Python 3 (chậm)', good: 'PyPy 3 (3-5x nhanh hơn)' },
          ].map(({ icon, title, bad, good }) => (
            <div key={title} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: '1rem', marginBottom: '4px' }}>{icon} <strong style={{ fontSize: '0.82rem' }}>{title}</strong></div>
              <div style={{ fontSize: '0.75rem', color: '#ef4444', fontFamily: 'monospace', marginBottom: '2px' }}>✗ {bad}</div>
              <div style={{ fontSize: '0.75rem', color: '#34d399', fontFamily: 'monospace' }}>✓ {good}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
