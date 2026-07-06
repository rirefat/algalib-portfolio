import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, ViewMode, Project } from '../types';

interface PortfolioContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
  quickViewProject: Project | null;
  setQuickViewProject: (project: Project | null) => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  customCursorText: string;
  setCustomCursorText: (text: string) => void;
  cursorMode: 'default' | 'hover' | 'magnetic' | 'text' | 'drag' | 'view';
  setCursorMode: (mode: 'default' | 'hover' | 'magnetic' | 'text' | 'drag' | 'view') => void;
  isTransitioning: boolean;
  setIsTransitioning: (val: boolean) => void;
  pendingView: ViewMode | null;
  setPendingView: (view: ViewMode | null) => void;
  setActualView: (view: ViewMode) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setThemeState] = useState<Theme>('dark');


  // Preference state
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algalib-reduced-motion');
      if (saved) return saved === 'true';
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // Navigation state
  const [currentView, setActualView] = useState<ViewMode>('home');
  const [pendingView, setPendingView] = useState<ViewMode | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [quickViewProject, setQuickViewProject] = useState<Project | null>(null);

  const setCurrentView = (view: ViewMode) => {
    if (view === currentView) return;
    if (reducedMotion) {
      setActualView(view);
      return;
    }
    setPendingView(view);
    setIsTransitioning(true);
  };

  // Favorites state (future ready)
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('algalib-favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Custom Cursor details
  const [customCursorText, setCustomCursorText] = useState<string>('');
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'magnetic' | 'text' | 'drag' | 'view'>('default');

  // Sync theme to document class list
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
      localStorage.setItem('algalib-theme', theme);
    }
  }, [theme]);

  // Sync reduced motion
  useEffect(() => {
    localStorage.setItem('algalib-reduced-motion', String(reducedMotion));
  }, [reducedMotion]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('algalib-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <PortfolioContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        currentView,
        setCurrentView,
        activeProject,
        setActiveProject,
        quickViewProject,
        setQuickViewProject,
        reducedMotion,
        toggleReducedMotion,
        favorites,
        toggleFavorite,
        customCursorText,
        setCustomCursorText,
        cursorMode,
        setCursorMode,
        isTransitioning,
        setIsTransitioning,
        pendingView,
        setPendingView,
        setActualView,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolioStore = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolioStore must be used within a PortfolioProvider');
  }
  return context;
};
