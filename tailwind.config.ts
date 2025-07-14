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
        // Material 3 Color Tokens
        primary: {
          DEFAULT: '#6750a4',
          light: '#9a82db',
          dark: '#4f378a',
          container: '#eaddff',
          'on-container': '#21005d',
        },
        secondary: {
          DEFAULT: '#625b71',
          light: '#8b83a1',
          dark: '#4a4458',
          container: '#e8def8',
          'on-container': '#332d41',
        },
        tertiary: {
          DEFAULT: '#7e5260',
          light: '#b17d8e',
          dark: '#633b48',
          container: '#ffd8e4',
          'on-container': '#31111d',
        },
        surface: {
          DEFAULT: '#fef7ff',
          variant: '#e7e0ec',
          container: '#f3edf7',
          'container-high': '#ece6f0',
          'container-highest': '#e6e0e9',
        },
        outline: {
          DEFAULT: '#79747e',
          variant: '#cac4d0',
        },
        // Custom additions
        background: "var(--background)",
        foreground: "var(--foreground)",
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