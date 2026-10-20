import { useState, useEffect, useRef } from 'react';
import { Search, Copy, Check, FileCode, X, ChevronDown } from 'lucide-react';
import { algorithmDict, type AlgorithmEntry } from '../data/data';

const ALL_TAGS = ['Data Structure', 'String / DNA', 'Linear Algebra & Recurrence', 'Graph & Matching', 'DP Optimization', 'Bitset / SIMD'];

const TAG_COLORS: Record<string, string> = {
  'Data Structure': 'tag-blue',
  'String / DNA': 'tag-green',
  'Linear Algebra & Recurrence': 'tag-orange',
  'Graph & Matching': 'tag-purple',
  'DP Optimization': 'tag-pink',
  'Bitset / SIMD': 'tag-cyan',
};

function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(79,142,247,0.15)',
        border: `1px solid ${copied ? 'rgba(52,211,153,0.4)' : 'rgba(79,142,247,0.4)'}`,
        color: copied ? '#34d399' : '#4f8ef7',
        borderRadius: '6px', padding: '5px 12px', cursor: 'pointer',
        fontSize: '0.78rem', fontWeight: 600, transition: 'all 0.2s',
      }}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : label}
    </button>
  );
}

function CodeDisplay({ code, lang }: { code: string; lang: 'Python' | 'C++' }) {
  const colors = lang === 'Python'
    ? { bg: 'rgba(52,211,153,0.04)', border: 'rgba(52,211,153,0.2)', label: '#34d399' }
    : { bg: 'rgba(79,142,247,0.04)', border: 'rgba(79,142,247,0.2)', label: '#4f8ef7' };

  return (
    <div style={{ background: colors.bg, border: `1px solid ${colors.border}`, borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 12px', background: 'rgba(0,0,0,0.2)',
        borderBottom: `1px solid ${colors.border}`
      }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: colors.label, fontFamily: 'monospace' }}>
          {lang === 'Python' ? '🐍 Python 3 / PyPy 3' : '⚡ C++17'}
        </span>
        <CopyButton text={code} label="Copy Code" />
      </div>
      <pre style={{
        margin: 0, padding: '14px', overflow: 'auto',
        fontSize: '0.79rem', lineHeight: 1.65, color: 'var(--text-primary)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        maxHeight: '400px',
      }}>
        {code}
      </pre>
    </div>
  );
}

function AlgorithmCard({ entry, isOpen, onToggle }: { entry: AlgorithmEntry; isOpen: boolean; onToggle: () => void }) {
  const [codeLang, setCodeLang] = useState<'python' | 'cpp'>('python');

  return (
    <div
      className="card card-glow-blue animate-fade-in"
      style={{ marginBottom: '12px', cursor: 'pointer' }}
    >
      {/* Header */}
      <div onClick={onToggle} style={{ padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <FileCode size={20} color="#4f8ef7" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {entry.name}
            </h3>
            <ChevronDown
              size={16}
              color="var(--text-muted)"
              style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
            />
          </div>
          <p style={{ margin: '4px 0 8px', fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            {entry.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
            {entry.tags.map(t => (
              <span key={t} className={`tag ${TAG_COLORS[t] || 'tag-blue'}`}>{t}</span>
            ))}
            {entry.kactlPage && (
              <span className="tag tag-yellow">📖 KACTL {entry.kactlPage} – {entry.kactlFile}</span>
            )}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {isOpen && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border)' }}>
          {/* Complexity table */}
          <div style={{ marginTop: '14px', marginBottom: '14px' }}>
            <h4 style={{ margin: '0 0 8px', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>⏱ Độ Phức Tạp Theo Subtask</h4>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '8px', padding: '8px 14px' }}>
                <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700 }}>Subtask 1 (N≤1000)</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>{entry.complexity.subtask1}</div>
              </div>
              <div style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '8px 14px' }}>
                <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700 }}>Subtask 2+ (N≤2×10⁵)</div>
                <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>{entry.complexity.subtask2}</div>
              </div>
              {entry.complexity.subtask3 && (
                <div style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: '8px', padding: '8px 14px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#fb923c', fontWeight: 700 }}>Subtask 3 (N≤10¹⁸)</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '2px' }}>{entry.complexity.subtask3}</div>
                </div>
              )}
            </div>
          </div>

          {/* References */}
          {(entry.kactlPage || entry.libraryCheckerPath) && (
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
              {entry.kactlPage && (
                <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 700 }}>📖 KACTL: </span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)' }}>{entry.kactlFile} – {entry.kactlPage}</span>
                </div>
              )}
              {entry.libraryCheckerPath && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(79,142,247,0.08)', border: '1px solid rgba(79,142,247,0.25)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem' }}>
                  <span style={{ color: '#4f8ef7', fontWeight: 700 }}>📁 Library Checker: </span>
                  <code style={{ color: 'var(--text-primary)', fontSize: '0.78rem' }}>{entry.libraryCheckerPath}</code>
                  <CopyButton text={`library-checker-problems/${entry.libraryCheckerPath}`} label="Copy Path" />
                </div>
              )}
            </div>
          )}

          {/* Code tabs */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <button className={`tab-button ${codeLang === 'python' ? 'active' : ''}`} onClick={() => setCodeLang('python')}>
              🐍 Python 3
            </button>
            <button className={`tab-button ${codeLang === 'cpp' ? 'active' : ''}`} onClick={() => setCodeLang('cpp')}>
              ⚡ C++17
            </button>
          </div>
          {codeLang === 'python' ? (
            <CodeDisplay code={entry.pythonCode} lang="Python" />
          ) : (
            <CodeDisplay code={entry.cppCode} lang="C++" />
          )}
        </div>
      )}
    </div>
  );
}

export default function Module2Dict() {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut /
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const filtered = algorithmDict.filter(entry => {
    const q = query.toLowerCase().trim();
    const matchQuery = !q || 
      entry.name.toLowerCase().includes(q) ||
      entry.keywords.some(k => k.toLowerCase().includes(q)) ||
      entry.description.toLowerCase().includes(q);
    const matchTags = selectedTags.length === 0 || selectedTags.some(t => entry.tags.includes(t));
    return matchQuery && matchTags;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span className="gradient-text-green">🔍 Từ Điển Tra Cứu Nhanh</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          Nhập triệu chứng đề bài → Tìm ngay thuật toán + code mẫu Python & C++ | Phím tắt: <kbd style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1px 6px', fontFamily: 'monospace', fontSize: '0.8rem' }}>/</kbd> hoặc <kbd style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1px 6px', fontFamily: 'monospace', fontSize: '0.8rem' }}>Ctrl+K</kbd>
        </p>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          ref={searchRef}
          className="input-field"
          style={{ paddingLeft: '44px', paddingRight: query ? '44px' : '14px', fontSize: '1rem' }}
          placeholder="Nhập dấu hiệu đề bài: cập nhật đoạn, chuỗi DNA, N ≤ 10¹⁸, ghép cặp, hệ phương trình XOR..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          id="dict-search"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Tag filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {ALL_TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`tag ${selectedTags.includes(tag) ? TAG_COLORS[tag] : 'tag-blue'}`}
            style={{
              cursor: 'pointer',
              opacity: selectedTags.length === 0 || selectedTags.includes(tag) ? 1 : 0.4,
              transition: 'all 0.2s',
              fontSize: '0.78rem',
            }}
          >
            {tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            style={{ background: 'none', border: '1px solid var(--border)', borderRadius: '999px', padding: '3px 10px', fontSize: '0.75rem', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Quick hint examples */}
      {!query && (
        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {['cập nhật đoạn', 'chuỗi DNA', 'N <= 10^18', 'ghép cặp', 'hệ phương trình', 'dp[i] = min'].map(hint => (
            <button
              key={hint}
              onClick={() => setQuery(hint)}
              style={{
                background: 'var(--bg-secondary)', border: '1px solid var(--border)',
                borderRadius: '999px', padding: '4px 12px', fontSize: '0.78rem',
                cursor: 'pointer', color: 'var(--text-secondary)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = '#4f8ef7';
                (e.currentTarget as HTMLButtonElement).style.color = '#4f8ef7';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
              }}
            >
              {hint}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <div style={{ marginBottom: '14px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
        {query || selectedTags.length > 0
          ? `${filtered.length} kết quả tìm thấy`
          : `${algorithmDict.length} thuật toán trong từ điển`}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</div>
          <div>Không tìm thấy kết quả. Thử từ khóa khác như "tổng đoạn", "chuỗi", "đồ thị"...</div>
        </div>
      ) : (
        filtered.map(entry => (
          <AlgorithmCard
            key={entry.id}
            entry={entry}
            isOpen={openId === entry.id}
            onToggle={() => setOpenId(openId === entry.id ? null : entry.id)}
          />
        ))
      )}
    </div>
  );
}
