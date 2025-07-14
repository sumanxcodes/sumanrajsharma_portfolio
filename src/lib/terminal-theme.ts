// Terminal theme system for unified styling
import { getTerminalColors, macOSColors, type TerminalColors } from './colors';

export interface TerminalTheme {
  colors: TerminalColors;
  macOSColors: typeof macOSColors;
  window: {
    borderRadius: number;
    headerHeight: number;
    headerBackground: {
      light: string;
      dark: string;
    };
    headerGradient: {
      light: string;
      dark: string;
    };
    shadow: {
      light: string;
      dark: string;
    };
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: number;
  };
  animation: {
    transition: string;
    duration: {
      fast: number;
      medium: number;
      slow: number;
    };
  };
}

export const createTerminalTheme = (mode: 'light' | 'dark'): TerminalTheme => {
  const colors = getTerminalColors(mode);
  const isDark = mode === 'dark';

  return {
    colors,
    macOSColors,
    window: {
      borderRadius: 12,
      headerHeight: 48,
      headerBackground: {
        light: '#E8E8E8',
        dark: '#2A2C2E',
      },
      headerGradient: {
        light: 'linear-gradient(180deg, #F0F0F0 0%, #E8E8E8 100%)',
        dark: 'linear-gradient(180deg, #2A2C2E 0%, #25272A 100%)',
      },
      shadow: {
        light: '0 12px 24px rgba(0, 0, 0, 0.1)',
        dark: '0 12px 24px rgba(0, 0, 0, 0.4)',
      },
    },
    typography: {
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '14px',
      lineHeight: 1.5,
    },
    animation: {
      transition: 'all 0.15s ease',
      duration: {
        fast: 80,
        medium: 150,
        slow: 300,
      },
    },
  };
};

// Terminal content styling utilities
export const getTerminalContentStyles = (mode: 'light' | 'dark') => {
  const colors = getTerminalColors(mode);
  
  return {
    command: {
      color: colors.accent,
      fontWeight: 'bold',
    },
    header: {
      color: colors.accent,
      fontWeight: 'bold',
      fontSize: '13px',
    },
    section: {
      color: colors.secondary,
      fontWeight: 'bold',
      fontSize: '14px',
      marginBottom: '4px',
    },
    emoji: {
      color: colors.foreground,
      fontWeight: 'bold',
      fontSize: '15px',
    },
    default: {
      color: colors.foreground,
      fontWeight: 'normal',
      fontSize: '14px',
    },
  };
};

// Terminal animation timing utilities
export const getTerminalAnimationTiming = (lineContent: string, isIntroSection: boolean) => {
  let delay = 150; // Default fast timing
  
  if (isIntroSection) {
    // Faster for intro box lines
    delay = lineContent.startsWith('╔') || lineContent.startsWith('╚') ? 100 : 80;
  } else if (lineContent.startsWith('$')) {
    // Slightly slower for commands
    delay = 300;
  }
  
  return delay;
};