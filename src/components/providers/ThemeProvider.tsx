'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { PaletteMode } from '@mui/material';
import { createPortfolioTheme } from '@/lib/theme';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
  setTheme: (mode: PaletteMode) => void;
  isLoading: boolean;
  systemPreference: PaletteMode;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook with different name to avoid MUI conflict
export const usePortfolioTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePortfolioTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Theme loading skeleton component
const ThemeLoadingSkeleton = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'var(--background)',
      color: 'var(--foreground)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}
  >
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--outline-variant)',
          borderTop: '3px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }}
      />
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
        Loading theme...
      </p>
    </div>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Error boundary for theme provider
class ThemeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Theme Provider Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Theme loading failed</h2>
          <p>Using default theme...</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [systemPreference, setSystemPreference] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // System preference detection with listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const initialPreference = mediaQuery.matches ? 'dark' : 'light';
    setSystemPreference(initialPreference);

    const handleChange = (e: MediaQueryListEvent) => {
      const newPreference = e.matches ? 'dark' : 'light';
      setSystemPreference(newPreference);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load theme from localStorage with validation and error recovery
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem('portfolio-theme-mode');
      
      if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
        setMode(savedMode as PaletteMode);
      } else {
        // Use system preference if no valid saved mode
        setMode(systemPreference);
      }
    } catch (error) {
      console.warn('Error loading theme from localStorage:', error);
      setMode(systemPreference);
    } finally {
      setMounted(true);
      // Simulate loading delay for smooth transition
      setTimeout(() => setIsLoading(false), 300);
    }
  }, [systemPreference]);

  // Save theme to localStorage with error handling
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem('portfolio-theme-mode', mode);
      } catch (error) {
        console.warn('Error saving theme to localStorage:', error);
      }
    }
  }, [mode, mounted]);

  // Update CSS variables in real-time
  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.style.colorScheme = mode;
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content',
          mode === 'light' ? '#FEF7FF' : '#141218'
        );
      }
    }
  }, [mode, mounted]);

  // Theme toggle with smooth transition
  const toggleTheme = useCallback(() => {
    setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' : 'light');
  }, []);

  // Direct theme setter
  const setTheme = useCallback((newMode: PaletteMode) => {
    setMode(newMode);
  }, []);

  // Memoize theme creation for performance
  const theme = useMemo(() => createPortfolioTheme(mode), [mode]);

  // Context value with memoization
  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      setTheme,
      isLoading,
      systemPreference,
    }),
    [mode, toggleTheme, setTheme, isLoading, systemPreference]
  );

  // Show loading skeleton during initial load
  if (!mounted || isLoading) {
    return <ThemeLoadingSkeleton />;
  }

  return (
    <ThemeErrorBoundary>
      <ThemeContext.Provider value={contextValue}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </ThemeErrorBoundary>
  );
}