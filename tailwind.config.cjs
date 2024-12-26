
import defaultTheme from 'tailwindcss/defaultTheme'


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.astro',
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      screens: {
        // This hides divs on small screens. Use: "hidden tall:block"
        'tall': {'raw': '(min-height: 700px)'}
      }
    },
    scale: {
      '0': '0',
      '25': '.25',
      '40': '.4',
      '50': '.5',
      '60': '.6',
      '70': '.7',
      '75': '.75',
      '80': '.8',
      '90': '.9',
      '100': '1',
      '110': '1.1',
      '120': '1.2',
      '130': '1.3',
      '140': '1.4',
      '150': '1.5',
      '200': '2',
    }
  },
  plugins: [
    // require('@vueform/vueform/tailwind'),
    // require('@vueform/slider/tailwind'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('@designbycode/tailwindcss-text-shadow')
  ],
}
