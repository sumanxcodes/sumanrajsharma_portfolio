import { createTheme } from '@mui/material/styles';

// Material 3 Color Tokens
const colorTokens = {
  primary: {
    main: '#6750a4',
    light: '#9a82db',
    dark: '#4f378a',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#625b71',
    light: '#8b83a1',
    dark: '#4a4458',
    contrastText: '#ffffff',
  },
  tertiary: {
    main: '#7e5260',
    light: '#b17d8e',
    dark: '#633b48',
    contrastText: '#ffffff',
  },
  surface: {
    main: '#fef7ff',
    variant: '#e7e0ec',
    container: '#f3edf7',
    containerHigh: '#ece6f0',
    containerHighest: '#e6e0e9',
  },
  outline: {
    main: '#79747e',
    variant: '#cac4d0',
  },
  error: {
    main: '#ba1a1a',
    light: '#ff5449',
    dark: '#93000a',
    contrastText: '#ffffff',
  },
};

// Create Material 3 Theme
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: colorTokens.primary,
    secondary: colorTokens.secondary,
    error: colorTokens.error,
    background: {
      default: colorTokens.surface.main,
      paper: colorTokens.surface.container,
    },
    text: {
      primary: '#1d1b20',
      secondary: '#49454f',
    },
    divider: colorTokens.outline.variant,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '-0.00833em',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontSize: '2.25rem',
      fontWeight: 400,
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 400,
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 400,
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12, // Material 3 uses larger border radius
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 32,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

// Dark theme for future implementation
export const darkTheme = createTheme({
  ...theme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#d0bcff',
      light: '#eaddff',
      dark: '#9a82db',
      contrastText: '#21005d',
    },
    secondary: {
      main: '#ccc2dc',
      light: '#e8def8',
      dark: '#958da5',
      contrastText: '#332d41',
    },
    background: {
      default: '#141218',
      paper: '#211f26',
    },
    text: {
      primary: '#e6e0e9',
      secondary: '#cac4d0',
    },
  },
});