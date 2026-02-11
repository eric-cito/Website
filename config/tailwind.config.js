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
    },
  },
  plugins: [],
}
