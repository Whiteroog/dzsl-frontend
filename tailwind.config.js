/** @type {import('tailwindcss').Config} */

const colors = {
	primary: '#F45050',
	'gray-white': '#F0F0F0',
	gray: '#3C486B',
	yellow: '#F9D949'
}

module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		colors: {
			primary: colors.primary,
			white: 'white',
			'gray-white': colors['gray-white'],
			gray: colors.gray,
			yellow: colors.yellow,
			transparent: 'transparent',
			error: 'red'
		},

		screens: {
			sm: '960px'
		},

		extend: {}
	},
	plugins: []
}
