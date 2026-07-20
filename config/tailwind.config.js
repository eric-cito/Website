/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        surface: {
          DEFAULT: '#f8fafc',
          light: '#f1f5f9',
        },
        paper: '#F7F9F9',
        ink: {
          DEFAULT: '#0B1220',
          soft: '#3D4A5C',
          faint: '#7A8699',
        },
        signal: {
          DEFAULT: '#0E9AA7',
          dim: '#0A6E78',
        },
        spike: '#FF6A3D',
        line: '#D8DEE2',
      },
      keyframes: {
        'stim-ping': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        'pulse-travel': {
          from: { strokeDashoffset: '100' },
          to: { strokeDashoffset: '0' },
        },
        'fade-bob': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '50%': { transform: 'translateY(6px)', opacity: '0.9' },
        },
      },
      animation: {
        'stim-ping': 'stim-ping 1.2s ease-out infinite',
        'pulse-travel': 'pulse-travel 4s linear infinite',
        'fade-bob': 'fade-bob 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
