/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verde: {
          50:  '#f0fdf4',
          100: '#dcfce7',
          400: '#4ade80',
          500: '#22c55e',
          600: '#009c3b',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        amarelo: {
          300: '#fde047',
          400: '#facc15',
          500: '#FFDF00',
          600: '#ca8a04',
        },
        azul: {
          600: '#002776',
          700: '#001f5e',
          800: '#001848',
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
