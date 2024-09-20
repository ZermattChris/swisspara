
import defaultTheme from 'tailwindcss/defaultTheme'


/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './public/**/*.astro',       
    'node_modules/preline/dist/*.js',  
	],
	theme: {
		extend: {},
	},
	plugins: [
		// require('@vueform/vueform/tailwind'),
		// require('@vueform/slider/tailwind'),
    require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
    require('preline/plugin'),
	],
}
