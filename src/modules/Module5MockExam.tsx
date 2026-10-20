import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { mockExamProblems, type MockProblem } from '../data/data';
import { useApp } from '../context/AppContext';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function MockTimer({
  duration,
  active,
  onEnd,
}: {
  duration: number;
  active: boolean;
  onEnd: () => void;
}) {
  const { state, setState } = useApp();
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(state.mockTimeRemaining || duration * 60);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      setRunning(false);
      setTimeLeft(duration * 60);
    }
  }, [active, duration]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          const next = Math.max(0, t - 1);
          setState(s => ({ ...s, mockTimeRemaining: next }));
          if (next === 0) {
            setRunning(false);
            onEnd();
          }
          return next;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const pct = (timeLeft / (duration * 60)) * 100;
  const isLow = timeLeft < 600;
  const isCritical = timeLeft < 300;

  return (
    <div style={{ textAlign: 'center', padding: '24px' }}>
      <div style={{
        fontFamily: 'monospace',
        fontSize: '4rem',
        fontWeight: 800,
        letterSpacing: '0.05em',
        background: isCritical
          ? 'linear-gradient(135deg, #ef4444, #fb923c)'
          : isLow
          ? 'linear-gradient(135deg, #fb923c, #fbbf24)'
          : 'linear-gradient(135deg, #4f8ef7, #22d3ee)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: isCritical ? 'blink 1s step-end infinite' : 'none',
      }}>
        {formatTime(timeLeft)}
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ height: '8px', margin: '12px auto', maxWidth: '300px' }}>
        <div
          style={{
            height: '100%',
            borderRadius: '999px',
            width: `${pct}%`,
            background: isCritical
              ? 'linear-gradient(90deg, #ef4444, #fb923c)'
              : isLow
              ? 'linear-gradient(90deg, #fb923c, #fbbf24)'
              : 'linear-gradient(90deg, #4f8ef7, #34d399)',
            transition: 'width 1s linear',
          }}
        />
      </div>

      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        {isCritical ? '🚨 Khẩn cấp! Kiểm tra code và nộp bài!' : isLow ? '⚠️ Còn ít thời gian – ưu tiên Subtask 1 & 2!' : `${Math.ceil(timeLeft / 60)} phút còn lại`}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}
          onClick={() => setRunning(r => !r)}
        >
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? 'Tạm dừng' : 'Bắt đầu'}
        </button>
        <button
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem' }}
          onClick={() => { setRunning(false); setTimeLeft(duration * 60); }}
        >
          <RotateCcw size={15} /> Reset
        </button>
      </div>
    </div>
  );
}

function ScoreTracker({ problems }: { problems: MockProblem[] }) {
  const { state, setState } = useApp();

  const toggleSubtask = (subtaskId: string) => {
    setState(s => ({
      ...s,
      mockScores: { ...s.mockScores, [subtaskId]: !s.mockScores[subtaskId] }
    }));
  };

  const totalScore = problems.flatMap(p => p.subtasks)
    .filter(st => state.mockScores[st.id])
    .reduce((a, st) => a + st.points, 0);
  const maxScore = problems.reduce((a, p) => a + p.totalPoints, 0);
  const pct = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  const getZone = () => {
    if (pct >= 90) return { label: 'EXCELLENT', color: '#a78bfa' };
    if (pct >= 75) return { label: 'MỤC TIÊU ĐẠT', color: '#fbbf24' };
    if (pct >= 60) return { label: 'AN TOÀN ✓', color: '#34d399' };
    return { label: 'CẦN CỐ GẮNG THÊM', color: '#fb923c' };
  };
  const zone = getZone();

  return (
    <div>
      {/* Score display */}
      <div className="card" style={{ padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Điểm hiện tại</div>
        <div style={{
          fontSize: '3rem', fontWeight: 800,
          background: 'linear-gradient(135deg, #4f8ef7, #34d399)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>
          {totalScore} <span style={{ fontSize: '1.5rem', opacity: 0.6 }}>/ {maxScore}</span>
        </div>
        <div style={{
          display: 'inline-block',
          background: `${zone.color}20`,
          border: `1px solid ${zone.color}50`,
          color: zone.color,
          borderRadius: '6px',
          padding: '4px 14px',
          fontSize: '0.8rem',
          fontWeight: 700,
          marginTop: '6px',
        }}>
          {zone.label} ({Math.round(pct)}%)
        </div>

        {/* Visual zones */}
        <div style={{ marginTop: '16px' }}>
          <div style={{ position: 'relative', height: '32px', background: 'var(--bg-secondary)', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Zones */}
            <div style={{ position: 'absolute', left: 0, width: '60%', height: '100%', background: 'rgba(52,211,153,0.2)' }} />
            <div style={{ position: 'absolute', left: '60%', width: '15%', height: '100%', background: 'rgba(251,191,36,0.2)' }} />
            <div style={{ position: 'absolute', left: '75%', width: '15%', height: '100%', background: 'rgba(167,139,250,0.2)' }} />
            <div style={{ position: 'absolute', left: '90%', width: '10%', height: '100%', background: 'rgba(244,114,182,0.2)' }} />
            {/* Progress fill */}
            <div style={{
              position: 'absolute', left: 0, width: `${pct}%`, height: '100%',
              background: 'linear-gradient(90deg, #4f8ef7, #34d399)',
              transition: 'width 0.5s ease',
              borderRadius: '8px',
            }} />
            {/* Labels */}
            <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around', pointerEvents: 'none' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>60%</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>75%</span>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>90%</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            <span style={{ color: '#34d399' }}>■ An toàn (60%)</span>
            <span style={{ color: '#fbbf24' }}>■ Mục tiêu (75%)</span>
            <span style={{ color: '#a78bfa' }}>■ Xuất sắc (90%)</span>
          </div>
        </div>
      </div>

      {/* Problem scoring checkboxes */}
      {problems.map(problem => (
        <div key={problem.id} className="card" style={{ padding: '16px 20px', marginBottom: '12px' }}>
          <h3 style={{ margin: '0 0 12px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {problem.title}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {problem.subtasks.map(st => {
              const done = !!state.mockScores[st.id];
              const stColors: Record<string, string> = {
                'Subtask 1': '#34d399', 'Subtask 2': '#fbbf24', 'Subtask 3': '#fb923c', 'Subtask 4': '#f472b6'
              };
              const stColor = stColors[st.label] || '#4f8ef7';
              return (
                <div
                  key={st.id}
                  className="checkbox-item"
                  onClick={() => toggleSubtask(st.id)}
                  style={{ background: done ? `${stColor}10` : 'transparent' }}
                >
                  {done
                    ? <CheckCircle2 size={18} color={stColor} />
                    : <Circle size={18} color="var(--text-muted)" />}
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: done ? 600 : 400, color: done ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                      {st.label}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                      {st.constraint}
                    </span>
                  </div>
                  <span style={{ fontWeight: 700, color: done ? stColor : 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {done ? '+' : ''}{st.points}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Module5MockExam() {
  const { state, setState } = useApp();
  const [examActive, setExamActive] = useState(state.mockExamActive);
  const [duration, setDuration] = useState(state.mockDuration || 120);
  const [showResults, setShowResults] = useState(false);

  const startExam = () => {
    setState(s => ({ ...s, mockExamActive: true, mockDuration: duration, mockTimeRemaining: duration * 60, mockScores: {} }));
    setExamActive(true);
    setShowResults(false);
  };

  const endExam = () => {
    setState(s => ({ ...s, mockExamActive: false }));
    setExamActive(false);
    setShowResults(true);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span style={{
            background: 'linear-gradient(135deg, #fb923c, #fbbf24)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
          }}>
            ⏱️ Thi Thử Offline Bấm Giờ
          </span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          Mô phỏng kỳ thi BioTuring – 4 bài × 100 điểm theo cấu trúc Subtask IOI
        </p>
      </div>

      {!examActive && !showResults && (
        <div className="card" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🚀</div>
          <h2 style={{ margin: '0 0 8px', fontSize: '1.2rem', fontWeight: 700 }}>Bắt Đầu Thi Thử</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.9rem' }}>
            Chọn thời gian thi và bắt đầu. Đừng xem Module 4 trong khi thi!
          </p>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
            {[90, 120, 150].map(d => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  border: `2px solid ${duration === d ? '#4f8ef7' : 'var(--border)'}`,
                  background: duration === d ? 'rgba(79,142,247,0.15)' : 'var(--bg-secondary)',
                  color: duration === d ? '#4f8ef7' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                }}
              >
                {d} phút
              </button>
            ))}
          </div>

          <div className="warning-box" style={{ marginBottom: '20px', textAlign: 'left' }}>
            <AlertCircle size={14} style={{ display: 'inline', marginRight: '6px' }} />
            <strong>Chiến thuật thi:</strong> Ăn trọn Subtask 1 (N≤1000) của TẤT CẢ 4 bài trước (60-70 phút đầu), rồi quay lại Subtask 2+.
          </div>

          <button
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '12px 32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            onClick={startExam}
          >
            <Play size={18} /> Bắt Đầu Thi {duration} Phút
          </button>
        </div>
      )}

      {examActive && (
        <div>
          <div className="card" style={{ marginBottom: '20px', overflow: 'hidden' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(251,146,60,0.1))',
              padding: '16px',
              textAlign: 'center',
              borderBottom: '1px solid var(--border)',
              fontSize: '0.85rem',
              color: '#fbbf24',
              fontWeight: 700,
            }}>
              🔴 ĐANG THI – Không truy cập Internet | BioTuring Test Simulation
            </div>
            <MockTimer duration={duration} active={examActive} onEnd={endExam} />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div className="hint-box" style={{ flex: 1 }}>
              <strong>📋 Chiến lược:</strong> 30ph đầu → đọc đề & code Subtask 1 tất cả bài. 60ph tiếp → Subtask 2. 30ph cuối → Subtask 3 bài dễ nhất.
            </div>
            <button
              onClick={endExam}
              style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', borderRadius: '8px', padding: '10px 16px',
                cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', alignSelf: 'flex-start',
              }}
            >
              🏁 Kết thúc thi
            </button>
          </div>

          <ScoreTracker problems={mockExamProblems} />
        </div>
      )}

      {showResults && (
        <div>
          <div className="card" style={{ padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
            <h2 style={{ margin: '0 0 6px', fontSize: '1.3rem', fontWeight: 800 }}>Kết Quả Thi Thử</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '0.9rem' }}>
              Phân tích kết quả của bạn và lên kế hoạch ôn tập
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn-primary" onClick={startExam} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <RotateCcw size={15} /> Thi Lại
              </button>
              <button className="btn-secondary" onClick={() => setShowResults(false)}>
                Xem Điểm Chi Tiết
              </button>
            </div>
          </div>
          <ScoreTracker problems={mockExamProblems} />
        </div>
      )}

      {/* Strategy guide */}
      {!examActive && (
        <div className="card" style={{ padding: '20px', marginTop: '20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: '0.95rem', fontWeight: 700 }}>
            📊 Phân Tích Điểm Số Chiến Lược
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)' }}>
                  {['Bài', 'Subtask 1', 'Subtask 2', 'Subtask 3', 'Total', 'Độ khó'].map(h => (
                    <th key={h} style={{ padding: '8px 12px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mockExamProblems.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.title.split(' – ')[0]}</td>
                    {p.subtasks.map(st => (
                      <td key={st.id} style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>
                        <span style={{
                          color: st.label === 'Subtask 1' ? '#34d399' : st.label === 'Subtask 2' ? '#fbbf24' : '#fb923c',
                          fontWeight: 600,
                        }}>
                          {st.points}pt
                        </span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: '4px' }}>
                          ({st.constraint.split(',')[0].trim()})
                        </span>
                      </td>
                    ))}
                    <td style={{ padding: '8px 12px', fontWeight: 700, color: 'var(--text-primary)' }}>{p.totalPoints}</td>
                    <td style={{ padding: '8px 12px' }}>
                      <span className={`tag ${p.difficulty === 'easy' ? 'tag-green' : p.difficulty === 'medium' ? 'tag-yellow' : 'tag-orange'}`}>
                        {p.difficulty}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
