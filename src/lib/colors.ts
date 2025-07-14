// Unified color system for the portfolio
// Extracted from theme.ts for better modularity

export interface ColorPalette {
  primary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  secondary: {
    main: string;
    light: string;
    dark: string;
    contrastText: string;
  };
  background: {
    default: string;
    paper: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
  };
  surface: {
    main: string;
    variant: string;
    container: string;
    containerHigh: string;
    containerHighest: string;
  };
  outline: {
    main: string;
    variant: string;
  };
}

// Terminal-specific color schemes
export interface TerminalColors {
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  border: string;
}

export const terminalColors = {
  light: {
    background: '#F8F9FA',
    foreground: '#2C3E50',
    accent: '#27AE60',
    secondary: '#34495E',
    border: '#BDC3C7',
  },
  dark: {
    background: '#1D1F21',
    foreground: '#A8E6CF',
    accent: '#50fa7b',
    secondary: '#f1fa8c',
    border: '#373B41',
  },
} as const;

// macOS window control colors
export const macOSColors = {
  red: '#FF5F57',
  yellow: '#FFBD2E',
  green: '#28CA42',
  redHover: '#FF4A47',
  yellowHover: '#FFB01E',
  greenHover: '#1FB832',
} as const;

// Material 3 Color System - extracted from theme.ts
export const materialColors = {
  light: {
    primary: {
      main: '#27AE60',
      light: '#4CD080',
      dark: '#1E8449',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4A6B5C',
      light: '#6D8F7D',
      dark: '#2F5244',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7FEF8',
      paper: '#F7FEF8',
    },
    text: {
      primary: '#1A1D1B',
      secondary: '#454A46',
      tertiary: '#747A75',
      disabled: '#C4CCC5',
    },
    surface: {
      main: '#F7FEF8',
      variant: '#E1ECE2',
      container: '#F2F9F3',
      containerHigh: '#ECF6ED',
      containerHighest: '#E6F3E7',
    },
    outline: {
      main: '#747A75',
      variant: '#C4CCC5',
    },
  },
  dark: {
    primary: {
      main: '#50fa7b',
      light: '#7FFFA3',
      dark: '#27AE60',
      contrastText: '#003D1A',
    },
    secondary: {
      main: '#7D9E8F',
      light: '#A0C1B2',
      dark: '#5A7B6C',
      contrastText: '#1A2D20',
    },
    background: {
      default: '#151A16',
      paper: '#1F241F',
    },
    text: {
      primary: '#E1E9E2',
      secondary: '#C4CCC5',
      tertiary: '#959D96',
      disabled: '#4A524B',
    },
    surface: {
      main: '#151A16',
      variant: '#4A524B',
      container: '#242A25',
      containerHigh: '#2E352F',
      containerHighest: '#384039',
    },
    outline: {
      main: '#959D96',
      variant: '#4A524B',
    },
  },
} as const;

// Helper function to get colors by theme mode
export const getColors = (mode: 'light' | 'dark'): ColorPalette => materialColors[mode];

// Helper function to get terminal colors by theme mode
export const getTerminalColors = (mode: 'light' | 'dark'): TerminalColors => terminalColors[mode];