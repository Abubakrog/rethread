/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rethread: {
          50: '#f4f7f4',
          100: '#e5ece5',
          200: '#cbdacb',
          300: '#a3c0a4',
          400: '#759f77',
          500: '#528254',
          600: '#3e6740',
          700: '#325234',
          800: '#2a422c',
          900: '#233725',
          950: '#111e13',
        },
        vintage: {
          cream: '#FAF7F2',
          sand: '#F2EDE4',
          terracotta: '#C86446',
          rust: '#9E3D23',
          mustard: '#D99B26',
          denim: '#34526f',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
