/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yadvi: {
          dark: '#082c21',
          primary: '#0b3b2c',
          sidebar: '#0a3528',
          hover: '#0e4a38',
          accent: '#16a34a',
          emerald: '#10b981',
          sprout: '#22c55e',
          light: '#f0fdf4',
          subtle: '#e8f5ed',
          border: '#e2e8f0',
          amber: '#f59e0b',
          gold: '#eab308'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
