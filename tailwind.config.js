/** @type {import('tailwindcss').Config} */

const colors = {
	primary: '#F45050',
	white: '#F0F0F0',
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
		extend: {
			colors: {
				'dzsl-primary': colors.primary,
				'dzsl-white': colors.white,
				'dzsl-gray': colors.gray,
				'dzsl-yellow': colors.yellow
			}
		}
	},
	plugins: [
		({ addComponents }) => {
			addComponents({
				'.btn-base': {
					backgroundColor: colors.primary,
					color: colors.secondary
				}
			})
		}
	]
}
