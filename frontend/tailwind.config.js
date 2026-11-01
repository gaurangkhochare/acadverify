/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F5FD',
          100: '#E1EDFB',
          200: '#C4DCF7',
          300: '#97C3F1',
          400: '#64A4E9',
          500: '#3D85DF',
          600: '#2669CF',
          700: '#0B3C88',
          800: '#0A2E68',
          900: '#071F47',
          dark: '#071830',
        },
        warning: {
          bg: '#FDE68A',
          border: '#F59E0B',
          text: '#78350F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
}

