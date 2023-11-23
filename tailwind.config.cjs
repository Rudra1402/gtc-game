/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xxs': '400px',
      'xs': '456px',
      'sm': '576px',
      'md': '768px',
      'md2': '900px',
      'lg': '1024px',
      'xl': '1280px'
    },
  },
  plugins: [],
}

