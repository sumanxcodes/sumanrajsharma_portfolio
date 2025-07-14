import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Optimal Monochrome Color Palette
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: {
          DEFAULT: "var(--surface)",
          variant: "var(--surface-variant)",
          container: "var(--surface-container)",
          'container-high': "var(--surface-container-high)",
          'container-highest': "var(--surface-container-highest)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          light: '#8B7ACC',
          dark: '#533A7C',
          container: '#EADDFF',
          'on-container': '#21005D',
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: '#8B839A',
          dark: '#493F55',
          container: '#E8DEF8',
          'on-container': '#332D41',
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        outline: {
          DEFAULT: "var(--outline)",
          variant: "var(--outline-variant)",
        },
        // Neutral Scale
        neutral: {
          0: "var(--neutral-0)",
          10: "var(--neutral-10)",
          20: "var(--neutral-20)",
          30: "var(--neutral-30)",
          40: "var(--neutral-40)",
          50: "var(--neutral-50)",
          60: "var(--neutral-60)",
          70: "var(--neutral-70)",
          80: "var(--neutral-80)",
          90: "var(--neutral-90)",
          95: "var(--neutral-95)",
          99: "var(--neutral-99)",
        },
        // System Colors
        error: "var(--error)",
        success: "var(--success)",
        warning: "var(--warning)",
        info: "var(--info)",
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'sans': ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        'material': '12px',
        'material-lg': '16px',
        'material-xl': '20px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's preflight to avoid conflicts with MUI
  },
}
export default config