/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/home.ejs`, `./views/about.ejs`, `./views/404.ejs`],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

