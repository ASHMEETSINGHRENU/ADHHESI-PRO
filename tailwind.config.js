/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: 'var(--primary-blue, #29387D)',
          'navy-dark': '#1d285c',
          'navy-light': '#354799',
          yellow: 'var(--primary-yellow, #F4B11A)',
          'yellow-hover': '#e09f12',
          gray: 'var(--text-gray, #606060)',
          'gray-dark': '#333333',
          'gray-light': '#8a8a8a',
          light: 'var(--light-bg, #F7F8FC)',
          border: 'var(--border-light, #E5E7EF)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'corporate': '0 2px 10px rgba(41, 56, 125, 0.06)',
        'corporate-hover': '0 8px 24px rgba(41, 56, 125, 0.12)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};
