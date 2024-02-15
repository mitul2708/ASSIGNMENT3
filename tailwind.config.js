/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/home.html`, `./views/about.html`, `./views/404.html`],
  theme: {
    container: {
      padding: '2rem',
      center: true,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

