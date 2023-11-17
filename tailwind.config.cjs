/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		// './vueform.config.js', // or where `vueform.config.js` is located. Change `.js` to `.ts` if required.
		// './node_modules/@vueform/vueform/themes/tailwind/**/*.vue',
		// './node_modules/@vueform/vueform/themes/tailwind/**/*.js',
	],
	theme: {
		extend: {},
	},
	plugins: [
		// require('@vueform/vueform/tailwind'),
		// require('@vueform/slider/tailwind'),
		require('@tailwindcss/forms'),
	],
}
