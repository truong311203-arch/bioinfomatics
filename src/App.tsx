import { useState, useEffect } from 'react';
import {
  Calendar, Search, Code2, Brain, Timer, Shield, Sun, Moon,
  X, ChevronRight, Zap, Calculator
} from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import Module1Roadmap from './modules/Module1Roadmap';
import Module2Dict from './modules/Module2Dict';
import Module3Vault from './modules/Module3Vault';
import Module4Practice from './modules/Module4Practice';
import Module5MockExam from './modules/Module5MockExam';
import Module6Auditor from './modules/Module6Auditor';
import BerlekampMasseyCalc from './modules/BerlekampMasseyCalc';

const MODULES = [
  {
    id: 0,
    icon: Calendar,
    label: 'Lộ Trình 3 Ngày',
    shortLabel: 'Roadmap',
    color: '#4f8ef7',
    description: 'Lịch học + Timer + Ghi chú',
    component: Module1Roadmap,
  },
  {
    id: 1,
    icon: Search,
    label: 'Tra Cứu Nhanh',
    shortLabel: 'Từ Điển',
    color: '#34d399',
    description: 'Dấu hiệu đề → Thuật toán',
    component: Module2Dict,
  },
  {
    id: 2,
    icon: Code2,
    label: 'Kho Code Mẫu',
    shortLabel: 'Snippets',
    color: '#a78bfa',
    description: 'Python 3 / C++17 ready-to-copy',
    component: Module3Vault,
  },
  {
    id: 3,
    icon: Brain,
    label: 'Luyện Đề BioTuring',
    shortLabel: 'Practice',
    color: '#fb923c',
    description: 'Đề thực tế theo Subtask IOI',
    component: Module4Practice,
  },
  {
    id: 4,
    icon: Timer,
    label: 'Thi Thử Offline',
    shortLabel: 'Mock Exam',
    color: '#fbbf24',
    description: '120/150 phút + Bảng tính điểm',
    component: Module5MockExam,
  },
  {
    id: 5,
    icon: Shield,
    label: 'Quét Lỗi Code',
    shortLabel: 'Auditor',
    color: '#f472b6',
    description: '5 phút cuối trước khi nộp',
    component: Module6Auditor,
  },
  {
    id: 6,
    icon: Calculator,
    label: 'BM Calculator',
    shortLabel: 'BM Calc',
    color: '#a78bfa',
    description: 'Berlekamp-Massey + a[N] 10¹⁸',
    component: BerlekampMasseyCalc,
  },
];

function Sidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (v: boolean) => void }) {
  const { state, setModule, toggleTheme } = useApp();
  const active = state.activeModule;

  return (
    <div style={{
      width: collapsed ? '64px' : '240px',
      minWidth: collapsed ? '64px' : '240px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.25s ease, min-width 0.25s ease',
      overflow: 'hidden',
      position: 'sticky',
      top: 0,
      height: '100vh',
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '16px 12px' : '20px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
      }}>
        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', lineHeight: 1.2 }}>
              <span style={{
                background: 'linear-gradient(135deg, #4f8ef7, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                BioTuring
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1px' }}>
              IOI-Subtask Prep Hub
            </div>
          </div>
        )}
        {collapsed && (
          <span style={{ fontSize: '1.3rem' }}>🧬</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', flexShrink: 0 }}
        >
          {collapsed ? <ChevronRight size={16} /> : <X size={16} />}
        </button>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
        {MODULES.map(mod => {
          const Icon = mod.icon;
          const isActive = active === mod.id;
          return (
            <button
              key={mod.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              style={{
                width: '100%',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderColor: isActive ? `${mod.color}44` : 'transparent',
                background: isActive ? `${mod.color}14` : 'transparent',
                color: isActive ? mod.color : 'var(--text-secondary)',
                marginBottom: '2px',
                padding: collapsed ? '10px' : '10px 14px',
              }}
              onClick={() => setModule(mod.id)}
              title={collapsed ? mod.label : undefined}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {!collapsed && (
                <div style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {mod.label}
                  </div>
                  {!isActive && (
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {mod.description}
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button
          onClick={toggleTheme}
          className="nav-item"
          style={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '10px' : '10px 14px' }}
          title={collapsed ? 'Toggle theme' : undefined}
        >
          {state.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {!collapsed && <span style={{ fontSize: '0.82rem' }}>{state.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        {!collapsed && (
          <div style={{ padding: '8px 6px', fontSize: '0.68rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            💾 Dữ liệu lưu tự động vào localStorage<br />
            📤 Export/Import trong Module 1
          </div>
        )}
      </div>
    </div>
  );
}

function QuickNav() {
  const { state, setModule } = useApp();
  const active = state.activeModule;

  return (
    <div style={{
      display: 'flex',
      gap: '6px',
      padding: '10px 24px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border)',
      overflowX: 'auto',
      flexShrink: 0,
    }}>
      {MODULES.map(mod => {
        const Icon = mod.icon;
        const isActive = active === mod.id;
        return (
          <button
            key={mod.id}
            onClick={() => setModule(mod.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1px solid ${isActive ? `${mod.color}44` : 'var(--border)'}`,
              background: isActive ? `${mod.color}14` : 'transparent',
              color: isActive ? mod.color : 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: isActive ? 700 : 400,
              whiteSpace: 'nowrap',
              transition: 'all 0.15s',
            }}
          >
            <Icon size={14} />
            {mod.shortLabel}
          </button>
        );
      })}
    </div>
  );
}

function AppInner() {
  const { state, setModule } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const activeModule = MODULES.find(m => m.id === state.activeModule) || MODULES[0];
  const ActiveComponent = activeModule.component;
  const ActiveIcon = activeModule.icon;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isEditing = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setModule(1); // Mod 2: Tra cứu nhanh
        return;
      }

      if (!isEditing && !e.ctrlKey && !e.altKey && !e.metaKey) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= 7) {
          setModule(num - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setModule]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Desktop Sidebar */}
      <div style={{ display: 'flex', flexShrink: 0 }} className="desktop-sidebar">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top bar */}
        <div style={{
          padding: '12px 16px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexShrink: 0,
        }}>
          <span style={{ fontSize: '1.1rem' }}><ActiveIcon size={18} color={activeModule.color} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{activeModule.label}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{activeModule.description}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <Zap size={12} color="#fbbf24" />
            <span>100% Offline · localStorage</span>
          </div>
        </div>

        {/* Quick nav tabs */}
        <QuickNav />

        {/* Module content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
