import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material';

// Material 3 Green-Based Color System - Terminal-Inspired Theme
// Complete color system generated from terminal green colors using HCT principles
const optimalMonochromeColors = {
  light: {
    // Primary color palette - generated from terminal green #27AE60
    primary: {
      main: '#27AE60',      // HCT: H141° C48 T40 - Base terminal green
      light: '#4CD080',     // HCT: H141° C48 T60 - Lighter variation
      dark: '#1E8449',      // HCT: H141° C48 T30 - Darker variation
      contrastText: '#FFFFFF',
    },
    // Secondary color palette - green-harmonious with reduced chroma
    secondary: {
      main: '#4A6B5C',      // HCT: H141° C16 T40 - Muted green-gray
      light: '#6D8F7D',     // HCT: H141° C16 T60 - Lighter muted green
      dark: '#2F5244',      // HCT: H141° C16 T30 - Darker muted green
      contrastText: '#FFFFFF',
    },
    // Tertiary color palette - complementary teal accent (H141° + 60°)
    tertiary: {
      main: '#4A6B8C',      // HCT: H201° C24 T40 - Teal accent
      light: '#6D8FAF',     // HCT: H201° C24 T60 - Lighter teal
      dark: '#2F5269',      // HCT: H201° C24 T30 - Darker teal
      contrastText: '#FFFFFF',
    },
    // Green-tinted neutral palette - subtle green influence throughout
    neutral: {
      0: '#FFFFFF',         // Pure white (reserved for highlights)
      10: '#1A1D1B',        // Primary text with green tint
      20: '#2F332F',        // High emphasis text with green tint
      30: '#454A46',        // Medium emphasis text with green tint
      40: '#5C615D',        // Lower emphasis text with green tint
      50: '#747A75',        // Disabled text/icons with green tint
      60: '#8F958F',        // Subtle elements with green tint
      70: '#A9B0AA',        // Borders and dividers with green tint
      80: '#C4CCC5',        // Light borders with green tint
      90: '#E0E9E1',        // Light surfaces with green tint
      95: '#F0F8F1',        // Surface variants with green tint
      99: '#F7FEF8',        // Background/surface with subtle green tint
    },
    // Surface system with green influence
    surface: {
      main: '#F7FEF8',      // Primary surface (green-tinted white)
      variant: '#E1ECE2',   // Surface variants with green tint
      container: '#F2F9F3', // Container backgrounds with green tint
      containerHigh: '#ECF6ED',    // Elevated containers with green tint
      containerHighest: '#E6F3E7', // Highest elevation with green tint
      dim: '#D8E3D9',       // Dimmed surfaces with green tint
      bright: '#F7FEF8',    // Bright surfaces with green tint
    },
    background: {
      default: '#F7FEF8',   // Green-tinted background
      paper: '#F7FEF8',     // Green-tinted paper
    },
    text: {
      primary: '#1A1D1B',    // High contrast on green-tinted background
      secondary: '#454A46',  // Medium contrast on green-tinted background
      tertiary: '#747A75',   // Lower contrast for subtle elements
      disabled: '#C4CCC5',   // Disabled state with green tint
    },
    outline: {
      main: '#747A75',       // Standard borders with green tint
      variant: '#C4CCC5',    // Subtle borders with green tint
    },
    // Status colors harmonized with green theme
    error: {
      main: '#E53E3E',
      light: '#FED7D7',
      dark: '#C53030',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#F6AD55',
      light: '#FEEBC8',
      dark: '#ED8936',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#27AE60',      // Use our primary green for success
      light: '#C6F6D5',
      dark: '#1E8449',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#4A6B8C',      // Use our tertiary teal for info
      light: '#BEE3F8',
      dark: '#2F5269',
      contrastText: '#FFFFFF',
    },
  },
  dark: {
    // Primary color palette - generated from terminal green #50fa7b
    primary: {
      main: '#50fa7b',      // HCT: H141° C48 T70 - Base terminal green for dark mode
      light: '#7FFFA3',     // HCT: H141° C48 T80 - Lighter variation
      dark: '#27AE60',      // HCT: H141° C48 T40 - Darker variation
      contrastText: '#003D1A',
    },
    // Secondary color palette - green-harmonious with reduced chroma for dark mode
    secondary: {
      main: '#7D9E8F',      // HCT: H141° C16 T60 - Muted green-gray for dark
      light: '#A0C1B2',     // HCT: H141° C16 T70 - Lighter muted green
      dark: '#5A7B6C',      // HCT: H141° C16 T50 - Darker muted green
      contrastText: '#1A2D20',
    },
    // Tertiary color palette - complementary teal accent for dark mode
    tertiary: {
      main: '#7D9EBF',      // HCT: H201° C24 T60 - Teal accent for dark
      light: '#A0C1E2',     // HCT: H201° C24 T70 - Lighter teal
      dark: '#5A7B9C',      // HCT: H201° C24 T50 - Darker teal
      contrastText: '#1A2D33',
    },
    // Green-tinted neutral palette - dark mode with subtle green influence
    neutral: {
      0: '#000000',         // Pure black (reserved for deepest shadows)
      10: '#E1E9E2',        // Primary text with green tint
      20: '#D0D8D1',        // High emphasis text with green tint
      30: '#C4CCC5',        // Medium emphasis text with green tint
      40: '#B4BDB5',        // Lower emphasis text with green tint
      50: '#959D96',        // Disabled text/icons with green tint
      60: '#7A827B',        // Subtle elements with green tint
      70: '#616962',        // Borders and dividers with green tint
      80: '#4A524B',        // Light borders with green tint
      90: '#333A34',        // Dark surfaces with green tint
      95: '#242A25',        // Surface variants with green tint
      99: '#151A16',        // Background/surface with subtle green tint
    },
    // Surface system with green influence for dark mode
    surface: {
      main: '#151A16',      // Primary surface (green-tinted dark)
      variant: '#4A524B',   // Surface variants with green tint
      container: '#242A25', // Container backgrounds with green tint
      containerHigh: '#2E352F',    // Elevated containers with green tint
      containerHighest: '#384039', // Highest elevation with green tint
      dim: '#0F1410',       // Dimmed surfaces with green tint
      bright: '#2E352F',    // Bright surfaces with green tint
    },
    background: {
      default: '#151A16',   // Green-tinted dark background
      paper: '#1F241F',     // Green-tinted dark paper
    },
    text: {
      primary: '#E1E9E2',    // High contrast on green-tinted dark background
      secondary: '#C4CCC5',  // Medium contrast on green-tinted dark background
      tertiary: '#959D96',   // Lower contrast for subtle elements
      disabled: '#4A524B',   // Disabled state with green tint
    },
    outline: {
      main: '#959D96',       // Standard borders with green tint
      variant: '#4A524B',    // Subtle borders with green tint
    },
    // Status colors harmonized with green theme for dark mode
    error: {
      main: '#FEB2B2',
      light: '#C53030',
      dark: '#FED7D7',
      contrastText: '#742A2A',
    },
    warning: {
      main: '#F6AD55',
      light: '#C05621',
      dark: '#FEEBC8',
      contrastText: '#7B341E',
    },
    success: {
      main: '#50fa7b',      // Use our primary green for success in dark mode
      light: '#1E8449',
      dark: '#C6F6D5',
      contrastText: '#0F5132',
    },
    info: {
      main: '#7D9EBF',      // Use our tertiary teal for info in dark mode
      light: '#2F5269',
      dark: '#BEE3F8',
      contrastText: '#0A202C',
    },
  },
};

// Common typography settings for both themes
const getTypography = (mode: PaletteMode) => {
  const colors = optimalMonochromeColors[mode as keyof typeof optimalMonochromeColors];
  const primaryColor = colors.text.primary;
  const secondaryColor = colors.text.secondary;
  const tertiaryColor = colors.text.tertiary;

  return {
    fontFamily: '"Inter", "Crimson Pro", "Plus Jakarta Sans", system-ui, sans-serif',
    // Large, impactful typography
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: primaryColor,
    },
    h2: {
      fontWeight: 600,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      color: primaryColor,
    },
    h3: {
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
      lineHeight: 1.3,
      color: primaryColor,
    },
    h4: {
      fontWeight: 500,
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      lineHeight: 1.4,
      color: primaryColor,
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
      color: primaryColor,
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
      color: primaryColor,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      color: secondaryColor,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: secondaryColor,
      fontFamily: '"Plus Jakarta Sans", sans-serif',
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: tertiaryColor,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: secondaryColor,
      textTransform: 'uppercase' as const,
      letterSpacing: '0.1em',
    },
  };
};

// Theme creation function that accepts mode
export const createPortfolioTheme = (mode: PaletteMode) => {
  const colors = optimalMonochromeColors[mode as keyof typeof optimalMonochromeColors];

  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: colors.secondary,
      background: colors.background,
      text: colors.text,
      error: colors.error,
      warning: colors.warning,
      success: colors.success,
      info: colors.info,
      divider: colors.outline.variant,
      // Map neutral colors to MUI grey system
      grey: {
        50: colors.neutral[95],   // Light surface variants
        100: colors.neutral[90],  // Light surfaces
        200: colors.neutral[80],  // Light borders
        300: colors.neutral[70],  // Borders and dividers
        400: colors.neutral[60],  // Subtle elements
        500: colors.neutral[50],  // Disabled text/icons
        600: colors.neutral[40],  // Lower emphasis text
        700: colors.neutral[30],  // Medium emphasis text
        800: colors.neutral[20],  // High emphasis text
        900: colors.neutral[10],  // Primary text
      },
      // Enhanced action colors with proper contrast
      action: {
        hover: mode === 'light' ? 'rgba(39, 174, 96, 0.04)' : 'rgba(80, 250, 123, 0.08)',
        selected: mode === 'light' ? 'rgba(39, 174, 96, 0.08)' : 'rgba(80, 250, 123, 0.12)',
        disabled: colors.text.disabled,
        disabledBackground: mode === 'light' ? colors.neutral[95] : colors.neutral[90],
        focus: mode === 'light' ? 'rgba(39, 174, 96, 0.12)' : 'rgba(80, 250, 123, 0.16)',
      },
    },
    typography: getTypography(mode),
    shape: {
      borderRadius: 0, // Sharp corners for modern look
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*': {
            transition: 'background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.15s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          body: {
            backgroundColor: colors.background.default,
            color: colors.text.primary,
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          },
          html: {
            colorScheme: mode,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 100,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '0.875rem',
            padding: '10px 24px',
            letterSpacing: '0.1px',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            height: 40,
            '&:focus-visible': {
              outline: `2px solid ${colors.primary.main}`,
              outlineOffset: '2px',
            },
          },
          contained: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            boxShadow: mode === 'light' ? '0 1px 2px rgba(0, 0, 0, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.4)',
            '&:hover': {
              backgroundColor: colors.primary.dark,
              boxShadow: mode === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.5)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          outlined: {
            borderColor: colors.outline.main,
            color: colors.primary.main,
            backgroundColor: 'transparent',
            borderWidth: '1px',
            '&:hover': {
              borderColor: colors.primary.main,
              backgroundColor: colors.surface.containerHigh,
            },
          },
          text: {
            color: colors.primary.main,
            '&:hover': {
              backgroundColor: colors.surface.containerHigh,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' 
              ? `${colors.surface.container}CC` 
              : `${colors.surface.main}CC`, // Use proper dark surface for dark mode
            backdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: `1px solid ${colors.outline.variant}`,
            color: colors.text.primary,
            boxShadow: 'none',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)', // Safari support
            // Force consistent colors regardless of scroll position
            '&.MuiAppBar-colorPrimary': {
              backgroundColor: mode === 'light' 
                ? `${colors.surface.container}CC` 
                : `${colors.surface.main}CC`,
              color: colors.text.primary,
            },
            '&.MuiAppBar-colorDefault': {
              backgroundColor: mode === 'light' 
                ? `${colors.surface.container}CC` 
                : `${colors.surface.main}CC`,
              color: colors.text.primary,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface.container,
            border: `1px solid ${colors.outline.variant}`,
            borderRadius: 12,
            boxShadow: 'none',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: mode === 'light' 
                ? '0 4px 12px rgba(29, 27, 32, 0.1)' 
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
              borderColor: colors.outline.main,
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: colors.surface.main,
            transition: 'background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          elevation1: {
            backgroundColor: colors.surface.container,
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(29, 27, 32, 0.12)' 
              : '0 1px 3px rgba(0, 0, 0, 0.4)',
          },
          elevation2: {
            backgroundColor: colors.surface.containerHigh,
            boxShadow: mode === 'light' 
              ? '0 3px 6px rgba(29, 27, 32, 0.16)' 
              : '0 3px 6px rgba(0, 0, 0, 0.5)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            transition: 'color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&.MuiTypography-body1': {
              fontFamily: '"Inter", "Roboto", sans-serif',
            },
            '&.MuiTypography-body2': {
              fontFamily: '"Inter", "Roboto", sans-serif',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: colors.outline.variant,
            transition: 'border-color 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            backgroundColor: colors.surface.containerHigh,
            color: colors.text.primary,
            borderColor: colors.outline.variant,
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: colors.surface.containerHighest,
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
          },
          outlined: {
            borderColor: colors.outline.main,
            color: colors.text.primary,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: colors.surface.containerHigh,
              borderColor: colors.primary.main,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 4,
              backgroundColor: colors.surface.container,
              color: colors.text.primary,
              transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
              '& fieldset': {
                borderColor: colors.outline.variant,
              },
              '&:hover fieldset': {
                borderColor: colors.outline.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: colors.primary.main,
                borderWidth: '2px',
              },
              '& input': {
                color: colors.text.primary,
              },
              '& textarea': {
                color: colors.text.primary,
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.text.secondary,
              '&.Mui-focused': {
                color: colors.primary.main,
              },
            },
            '& .MuiFormHelperText-root': {
              color: colors.text.tertiary,
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: colors.text.primary,
            borderRadius: 8,
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: colors.surface.containerHigh,
              transform: 'scale(1.05)',
            },
            '&:active': {
              transform: 'scale(0.95)',
            },
            '&:focus-visible': {
              outline: `2px solid ${colors.primary.main}`,
              outlineOffset: '2px',
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: colors.surface.main,
            color: colors.text.primary,
            borderColor: colors.outline.variant,
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: '2px 8px',
            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              backgroundColor: colors.surface.containerHigh,
            },
            '&.Mui-selected': {
              backgroundColor: colors.surface.containerHighest,
              color: colors.primary.main,
              '&:hover': {
                backgroundColor: colors.surface.containerHighest,
              },
            },
          },
        },
      },
    },
  });
};

// Default theme (light mode)
const theme = createPortfolioTheme('light');

export default theme;