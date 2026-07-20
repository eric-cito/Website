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
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#22d3ee',
          dim: '#0891b2',
        },
        surface: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        },
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
