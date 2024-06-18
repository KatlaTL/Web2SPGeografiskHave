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
      'xsm': '100px',

      'sm':'430px',

      'mdsm':'768px',

      'md': '900px',

      'lg': '1150px',

      'lgxl': '1300px',

      'xl': '1440px',

      '2xl': '1536px',
    },
    fontFamily:{
      'headersFont':'"Stag", "Open Sans", sans-serif',
      'bodyTextFont':'"Open Sans", sans-serif'
    },
    extend: {},
  },
  plugins: [require('tailwind-hamburgers')],
}