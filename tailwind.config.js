/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    colors: {
      'headerColor': '#125F31',
      'whiteColor': '#ffffff',
      'blackColor': '#000000',
      'activeGreen': '#7FA761',
      'yellowColor': '#FFE174',
      'orangeColor': '#F4A25A',
      'errorColor': '#FF0000',
      'backgroundColor': '#FFF9EB',
      'hoverGreedColor': '#7FA761',
      'footerBackgroundColor': '#492A14',
    },
    screens: {
      'sm': '100px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    },
    fontFamily:{
      'headersFont':'"Stag", "Open Sans", sans-serif',
      'bodyTextFont':'"Open Sans", sans-serif'
    },
    extend: {},
  },
  plugins: [],
}