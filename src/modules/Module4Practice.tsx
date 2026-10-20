import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, Copy, Check, Lightbulb, Trophy } from 'lucide-react';
import { bioturingProblems, type BioTuringProblem, type Subtask } from '../data/data';
import { useApp } from '../context/AppContext';

function CopyBtn({ text }: { text: string }) {
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
        display: 'flex', alignItems: 'center', gap: '4px',
        background: copied ? 'rgba(52,211,153,0.15)' : 'rgba(79,142,247,0.1)',
        border: `1px solid ${copied ? 'rgba(52,211,153,0.4)' : 'rgba(79,142,247,0.3)'}`,
        color: copied ? '#34d399' : '#4f8ef7',
        borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
        fontSize: '0.75rem', fontWeight: 600,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function SubtaskPanel({ subtask, problemId }: { subtask: Subtask; problemId: string }) {
  const { state, setState } = useApp();
  const hintKey = `${problemId}-${subtask.id}`;
  const hintLevel = state.revealedHints[hintKey] || 0;
  const [showSolution, setShowSolution] = useState(false);
  const [note, setNote] = useState(state.problemNotes[hintKey] || '');

  const revealHint = () => {
    if (hintLevel < 3) {
      setState(s => ({
        ...s,
        revealedHints: { ...s.revealedHints, [hintKey]: hintLevel + 1 }
      }));
    }
  };

  const saveNote = () => {
    setState(s => ({
      ...s,
      problemNotes: { ...s.problemNotes, [hintKey]: note }
    }));
  };

  const hints = [subtask.hint1, subtask.hint2, subtask.hint3];
  const subtaskColors: Record<string, string> = {
    'Subtask 1': '#34d399',
    'Subtask 2': '#fbbf24',
    'Subtask 3': '#fb923c',
    'Subtask Bonus': '#f472b6',
  };
  const color = subtaskColors[subtask.label] || '#4f8ef7';

  return (
    <div style={{
      border: `1px solid ${color}33`,
      borderRadius: '10px',
      overflow: 'hidden',
      marginBottom: '12px',
    }}>
      {/* Subtask header */}
      <div style={{
        padding: '12px 16px',
        background: `${color}10`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, color, fontSize: '0.9rem' }}>{subtask.label}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{subtask.constraint}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{
            background: color,
            color: '#000',
            borderRadius: '6px',
            padding: '3px 10px',
            fontSize: '0.78rem',
            fontWeight: 800,
          }}>
            {subtask.points} điểm
          </div>
        </div>
      </div>

      {/* Hints */}
      <div style={{ padding: '14px 16px' }}>
        {hintLevel === 0 ? (
          <div style={{ textAlign: 'center', padding: '8px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '10px' }}>
              💡 Gợi ý được ẩn để bạn tự suy nghĩ trước
            </p>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={revealHint}
            >
              <Lightbulb size={14} /> Xem Gợi ý 1
            </button>
          </div>
        ) : (
          <div>
            {hints.slice(0, hintLevel).map((hint, i) => (
              <div
                key={i}
                className="animate-fade-in"
                style={{
                  background: `rgba(251,191,36,${0.05 + i * 0.02})`,
                  border: `1px solid rgba(251,191,36,${0.2 + i * 0.05})`,
                  borderRadius: '8px',
                  padding: '10px 14px',
                  marginBottom: '8px',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: '#fbbf24', fontWeight: 700, marginRight: '6px' }}>Gợi ý {i + 1}:</span>
                {hint}
              </div>
            ))}
            {hintLevel < 3 && (
              <button
                className="btn-secondary"
                style={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}
                onClick={revealHint}
              >
                <Lightbulb size={13} /> Xem Gợi ý {hintLevel + 1}
              </button>
            )}
          </div>
        )}

        {/* Solution */}
        {hintLevel >= 3 && (
          <div style={{ marginTop: '12px' }}>
            <button
              onClick={() => setShowSolution(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: showSolution ? 'rgba(52,211,153,0.1)' : 'rgba(79,142,247,0.1)',
                border: `1px solid ${showSolution ? 'rgba(52,211,153,0.3)' : 'rgba(79,142,247,0.3)'}`,
                color: showSolution ? '#34d399' : '#4f8ef7',
                borderRadius: '8px', padding: '8px 14px',
                cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
              }}
            >
              {showSolution ? <EyeOff size={14} /> : <Eye size={14} />}
              {showSolution ? 'Ẩn Đáp Án' : '✨ Xem Đáp Án Hoàn Chỉnh'}
            </button>

            {showSolution && (
              <div className="animate-fade-in" style={{ marginTop: '10px' }}>
                <div className="success-box" style={{ marginBottom: '10px' }}>
                  <strong>📖 Đáp Án:</strong> {subtask.solution}
                </div>
                <div style={{
                  background: '#0d1117',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 12px', background: 'rgba(0,0,0,0.3)',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 700 }}>🐍 Python 3</span>
                    <CopyBtn text={subtask.sampleCode} />
                  </div>
                  <pre style={{
                    margin: 0, padding: '14px', overflow: 'auto',
                    fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--text-primary)',
                    fontFamily: "'JetBrains Mono', monospace", maxHeight: '400px',
                  }}>
                    {subtask.sampleCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Draft area */}
        <div style={{ marginTop: '12px' }}>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>📝 Ghi chú / Code nháp</label>
          <textarea
            className="input-field"
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
            onBlur={saveNote}
            placeholder="Nhập lời giải nháp, insight, hoặc code của bạn..."
            style={{ marginTop: '6px', resize: 'vertical', fontFamily: 'monospace', fontSize: '0.8rem' }}
          />
        </div>
      </div>
    </div>
  );
}

function ProblemCard({ problem }: { problem: BioTuringProblem }) {
  const [expanded, setExpanded] = useState(false);
  const totalPoints = problem.subtasks.reduce((a, s) => a + s.points, 0);

  return (
    <div
      className="card"
      style={{
        marginBottom: '16px',
        borderLeft: `3px solid ${problem.color}`,
      }}
    >
      {/* Header */}
      <div
        onClick={() => setExpanded(e => !e)}
        style={{ padding: '18px 20px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '12px' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', flexWrap: 'wrap' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {problem.title}
            </h2>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span className="tag tag-blue">{problem.category}</span>
              <div style={{
                background: problem.color,
                color: '#000',
                borderRadius: '6px',
                padding: '2px 10px',
                fontSize: '0.78rem',
                fontWeight: 800,
              }}>
                {totalPoints} pts
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
            {problem.subtasks.map(st => (
              <span key={st.id} style={{
                fontSize: '0.7rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '2px 8px',
                color: 'var(--text-muted)',
              }}>
                {st.label}: {st.points}pt
              </span>
            ))}
          </div>
        </div>
        {expanded ? <ChevronDown size={18} color="var(--text-muted)" /> : <ChevronRight size={18} color="var(--text-muted)" />}
      </div>

      {/* Expanded */}
      {expanded && (
        <div style={{ padding: '0 20px 20px', borderTop: '1px solid var(--border)' }}>
          {/* Statement */}
          <div style={{ marginTop: '16px', marginBottom: '16px' }}>
            <h4 style={{ margin: '0 0 8px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              📋 Đề Bài
            </h4>
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '14px 16px',
              fontSize: '0.85rem',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              whiteSpace: 'pre-wrap',
            }}>
              {problem.statement}
            </div>
          </div>

          {/* Strategy */}
          <div className="info-box" style={{ marginBottom: '16px', whiteSpace: 'pre-wrap', fontSize: '0.83rem', lineHeight: 1.7 }}>
            {problem.strategy}
          </div>

          {/* Subtasks */}
          <h4 style={{ margin: '0 0 10px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            🎯 Luyện Tập Theo Subtask
          </h4>
          {problem.subtasks.map(subtask => (
            <SubtaskPanel key={subtask.id} subtask={subtask} problemId={problem.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Module4Practice() {
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...Array.from(new Set(bioturingProblems.map(p => p.category)))];
  const filtered = filter === 'all' ? bioturingProblems : bioturingProblems.filter(p => p.category === filter);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span className="gradient-text-purple">🏋️ Phòng Luyện Đề BioTuring</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          Đề thực tế BioTuring 2024 – Luyện theo Subtask với gợi ý mở dần
        </p>
      </div>

      {/* Score target banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(52,211,153,0.1))',
        border: '1px solid rgba(79,142,247,0.3)',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Trophy size={20} color="#fbbf24" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              🎯 Mục Tiêu Chiến Lược: 60–75% = 240–300/400 điểm
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Ưu tiên ăn trọn Subtask 1 & 2 của cả 4 bài (≈ 160–200 điểm) trước khi tấn công Subtask 3
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 700, marginBottom: '4px' }}>VÙNG AN TOÀN (60%)</div>
            <div className="score-zone score-safe" style={{ minWidth: '80px' }}>240–300 pts</div>
          </div>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <div style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: 700, marginBottom: '4px' }}>MỤC TIÊU (75%)</div>
            <div className="score-zone score-target" style={{ minWidth: '80px' }}>300–360 pts</div>
          </div>
          <div style={{ flex: 1, minWidth: '80px' }}>
            <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 700, marginBottom: '4px' }}>BONUS (90%+)</div>
            <div className="score-zone score-bonus" style={{ minWidth: '80px' }}>360–400 pts</div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-button ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? '📋 Tất cả' : cat}
          </button>
        ))}
      </div>

      {/* Problems */}
      {filtered.map(problem => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
}
