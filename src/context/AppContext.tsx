import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface AppState {
  theme: 'dark' | 'light';
  activeModule: number;
  // Roadmap progress
  taskProgress: Record<string, boolean>;
  taskNotes: Record<string, string>;
  sessionTimers: Record<string, number>; // seconds remaining
  // Algorithm search
  searchQuery: string;
  selectedTags: string[];
  // Practice
  problemNotes: Record<string, string>;
  revealedHints: Record<string, number>; // problemId -> hint level
  // Mock exam
  mockExamActive: boolean;
  mockTimeRemaining: number; // seconds
  mockDuration: number; // minutes
  mockScores: Record<string, boolean>; // subtaskId -> completed
  // BM Calculator
  bmSequence: string;
  bmMod: string;
  // Code auditor
  auditorCode: string;
  auditorLanguage: 'python' | 'cpp';
  checkedItems: Record<string, boolean>;
}

const defaultState: AppState = {
  theme: 'dark',
  activeModule: 0,
  taskProgress: {},
  taskNotes: {},
  sessionTimers: {},
  searchQuery: '',
  selectedTags: [],
  problemNotes: {},
  revealedHints: {},
  mockExamActive: false,
  mockTimeRemaining: 0,
  mockDuration: 120,
  mockScores: {},
  bmSequence: '',
  bmMod: '998244353',
  auditorCode: '',
  auditorLanguage: 'python',
  checkedItems: {},
};

interface AppContextType {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  toggleTheme: () => void;
  toggleTask: (taskId: string) => void;
  setTaskNote: (taskId: string, note: string) => void;
  setModule: (idx: number) => void;
  exportData: () => void;
  importData: (json: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('bioturing-prep-hub');
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem('bioturing-prep-hub', JSON.stringify(state));
    } catch {}
    // Apply theme
    if (state.theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [state]);

  const toggleTheme = () => setState(s => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }));
  const toggleTask = (taskId: string) => setState(s => ({
    ...s,
    taskProgress: { ...s.taskProgress, [taskId]: !s.taskProgress[taskId] }
  }));
  const setTaskNote = (taskId: string, note: string) => setState(s => ({
    ...s,
    taskNotes: { ...s.taskNotes, [taskId]: note }
  }));
  const setModule = (idx: number) => setState(s => ({ ...s, activeModule: idx }));

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bioturing-prep-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (json: string) => {
    try {
      const data = JSON.parse(json);
      setState({ ...defaultState, ...data });
    } catch {
      alert('Invalid JSON file');
    }
  };

  return (
    <AppContext.Provider value={{ state, setState, toggleTheme, toggleTask, setTaskNote, setModule, exportData, importData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
