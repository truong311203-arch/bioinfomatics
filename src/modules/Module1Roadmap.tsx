import { useState, useEffect, useRef, useCallback } from 'react';
import {
  CheckCircle2, Circle, Clock, ChevronDown, ChevronRight,
  Play, Pause, RotateCcw, StickyNote, Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { roadmapData, type Session, type Task } from '../data/data';

// ── Timer Hook ──────────────────────────────────────────────────────────────
function useTimer(sessionId: string) {
  const { state, setState } = useApp();
  const initialSeconds = 3 * 60 * 60; // 3 hours default
  const saved = state.sessionTimers[sessionId] ?? initialSeconds;
  const [timeLeft, setTimeLeft] = useState(saved);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => {
          const next = Math.max(0, t - 1);
          setState(s => ({
            ...s,
            sessionTimers: { ...s.sessionTimers, [sessionId]: next }
          }));
          if (next === 0) setRunning(false);
          return next;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, sessionId]);

  const reset = useCallback(() => {
    setRunning(false);
    setTimeLeft(initialSeconds);
    setState(s => ({ ...s, sessionTimers: { ...s.sessionTimers, [sessionId]: initialSeconds } }));
  }, [sessionId]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return { timeLeft, running, setRunning, reset, fmt };
}

// ── Task Card ───────────────────────────────────────────────────────────────
function TaskCard({ task, sessionColor }: { task: Task; sessionColor: string }) {
  const { state, toggleTask, setTaskNote } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [note, setNote] = useState(state.taskNotes[task.id] || '');
  const completed = !!state.taskProgress[task.id];

  const saveNote = () => {
    setTaskNote(task.id, note);
    setEditingNote(false);
  };

  return (
    <div
      className="card animate-fade-in"
      style={{
        borderLeft: `3px solid ${completed ? '#34d399' : sessionColor}`,
        opacity: completed ? 0.75 : 1,
        marginBottom: '10px',
      }}
    >
      <div
        style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '12px' }}
        onClick={() => setExpanded(e => !e)}
      >
        <button
          onClick={e => { e.stopPropagation(); toggleTask(task.id); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: '2px', flexShrink: 0 }}
        >
          {completed
            ? <CheckCircle2 size={20} color="#34d399" />
            : <Circle size={20} color="var(--text-muted)" />}
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontWeight: 600,
              fontSize: '0.9rem',
              color: completed ? 'var(--text-muted)' : 'var(--text-primary)',
              textDecoration: completed ? 'line-through' : 'none',
            }}>
              {task.title}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {task.duration}
              </span>
              {expanded ? <ChevronDown size={14} color="var(--text-muted)" /> : <ChevronRight size={14} color="var(--text-muted)" />}
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
            {task.topics.map(t => (
              <span key={t} className="tag tag-blue" style={{ fontSize: '0.65rem' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {expanded && (
        <div style={{ padding: '0 16px 16px 48px', borderTop: '1px solid var(--border)' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: '12px 0 8px' }}>
            {task.description}
          </p>
          {task.problems.length > 0 && (
            <div style={{ marginBottom: '10px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>📁 Problems:</span>
              {task.problems.map(p => (
                <div key={p} style={{ fontSize: '0.8rem', color: '#4f8ef7', fontFamily: 'monospace', marginTop: '2px' }}>
                  {p}
                </div>
              ))}
            </div>
          )}
          {/* Notes */}
          <div>
            {editingNote ? (
              <div>
                <textarea
                  className="input-field"
                  rows={3}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Ghi chú của bạn..."
                  style={{ resize: 'vertical', fontSize: '0.82rem' }}
                />
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '5px 12px' }} onClick={saveNote}>Lưu</button>
                  <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '5px 12px' }} onClick={() => setEditingNote(false)}>Huỷ</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditingNote(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.8rem', padding: 0 }}
              >
                <StickyNote size={14} />
                {state.taskNotes[task.id] ? <span style={{ color: '#fbbf24' }}>{state.taskNotes[task.id].slice(0, 60)}{state.taskNotes[task.id].length > 60 ? '…' : ''}</span> : 'Thêm ghi chú...'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Session Card ─────────────────────────────────────────────────────────────
function SessionCard({ session }: { session: Session }) {
  const { state } = useApp();
  const [expanded, setExpanded] = useState(session.day === 1 && session.type === 'morning');
  const { timeLeft, running, setRunning, reset, fmt } = useTimer(session.id);

  const totalTasks = session.tasks.length;
  const doneTasks = session.tasks.filter(t => state.taskProgress[t.id]).length;
  const progress = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;
  const isComplete = progress === 100;

  const dayColors: Record<number, string> = {
    0: '#22d3ee', 1: '#4f8ef7', 2: '#fb923c', 3: '#f472b6'
  };
  const color = dayColors[session.day] || session.color;

  return (
    <div
      className="card card-glow-blue"
      style={{
        marginBottom: '16px',
        border: `1px solid ${isComplete ? '#34d399' : 'var(--border)'}`,
      }}
    >
      {/* Header */}
      <div
        style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
        onClick={() => setExpanded(e => !e)}
      >
        <span style={{ fontSize: '1.5rem' }}>{session.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
              {session.title}
            </span>
            {isComplete && <span className="tag tag-green">✓ Hoàn thành</span>}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '4px', fontSize: '0.78rem', color: 'var(--text-muted)', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>🕐 {session.timeSlot}</span>
            <span>⏱ {session.duration}</span>
            <span>{doneTasks}/{totalTasks} tasks</span>
          </div>
          {/* Progress bar */}
          <div className="progress-bar" style={{ marginTop: '8px', height: '4px' }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${color}88)` }}
            />
          </div>
        </div>
        {/* Timer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '1.1rem',
            fontWeight: 700,
            color: timeLeft < 600 ? '#fb923c' : color,
          }}>
            {fmt(timeLeft)}
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={e => { e.stopPropagation(); setRunning(r => !r); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: color, padding: '2px' }}
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={e => { e.stopPropagation(); reset(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
        {expanded ? <ChevronDown size={18} color="var(--text-muted)" /> : <ChevronRight size={18} color="var(--text-muted)" />}
      </div>

      {expanded && (
        <div style={{ padding: '0 20px 20px' }}>
          <hr className="divider" />
          {session.tasks.map(task => (
            <TaskCard key={task.id} task={task} sessionColor={color} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Overall Progress Stats ───────────────────────────────────────────────────
function OverallStats() {
  const { state, exportData, importData } = useApp();
  const allTasks = roadmapData.flatMap(s => s.tasks);
  const doneTasks = allTasks.filter(t => state.taskProgress[t.id]);
  const progress = allTasks.length > 0 ? (doneTasks.length / allTasks.length) * 100 : 0;

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => importData(ev.target?.result as string);
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Tiến Độ Tổng Thể
          </h2>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #4f8ef7, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {Math.round(progress)}%
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {doneTasks.length}/{allTasks.length} tasks hoàn thành
            </span>
          </div>
          <div className="progress-bar" style={{ width: '300px', maxWidth: '100%', marginTop: '8px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={exportData}>
            📤 Export
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }} onClick={handleImport}>
            📥 Import
          </button>
        </div>
      </div>

      {/* Day summary */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
        {[
          { day: 0, label: 'Prep', color: '#22d3ee' },
          { day: 1, label: 'Ngày 1', color: '#4f8ef7' },
          { day: 2, label: 'Ngày 2', color: '#fb923c' },
          { day: 3, label: 'Ngày 3', color: '#f472b6' },
        ].map(({ day, label, color }) => {
          const daySessions = roadmapData.filter(s => s.day === day);
          const dayTasks = daySessions.flatMap(s => s.tasks);
          const dayDone = dayTasks.filter(t => state.taskProgress[t.id]).length;
          const dayPct = dayTasks.length > 0 ? Math.round((dayDone / dayTasks.length) * 100) : 0;
          return (
            <div key={day} style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px 14px', minWidth: '100px' }}>
              <div style={{ fontSize: '0.75rem', color, fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{dayPct}%</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{dayDone}/{dayTasks.length}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main Module ──────────────────────────────────────────────────────────────
export default function Module1Roadmap() {
  const [activeDay, setActiveDay] = useState<'all' | 0 | 1 | 2 | 3>('all');
  const filteredSessions = activeDay === 'all'
    ? roadmapData
    : roadmapData.filter(s => s.day === activeDay);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>
          <span className="gradient-text-blue">📅 Lộ Trình 3 Ngày</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '0.9rem' }}>
          Bảng điều khiển học tập tương tác – Theo dõi tiến độ & đồng hồ bấm giờ từng ca
        </p>
      </div>

      <OverallStats />

      {/* Day filter */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: '🗓️ Tất cả' },
          { key: 0, label: '🚀 Prep' },
          { key: 1, label: '📘 Ngày 1' },
          { key: 2, label: '📗 Ngày 2' },
          { key: 3, label: '📕 Ngày 3' },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`tab-button ${activeDay === key ? 'active' : ''}`}
            onClick={() => setActiveDay(key as any)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Strategy reminder */}
      <div className="info-box" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Zap size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.82rem', lineHeight: 1.7 }}>
          <strong>🎯 Chiến thuật mục tiêu:</strong> Ăn trọn 100% Subtask 1 & 2 của mỗi bài (≈ 40-50% điểm) trước khi tấn công Subtask 3.
          Mục tiêu <strong>60–75% = 240–300/400 điểm</strong> là đủ để pass BioTuring Test.
          Ưu tiên: <span style={{ color: '#34d399' }}>Python PyPy 3</span> sạch, xử lý edge cases N=0, N=1.
        </div>
      </div>

      {/* Sessions */}
      {filteredSessions.map(session => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );
}
