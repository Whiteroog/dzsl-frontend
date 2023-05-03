import { NextUIProvider, createTheme } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { Roboto } from 'next/font/google'

import '@/assets/styles/globals.css'

const roboto = Roboto({
	subsets: ['cyrillic', 'latin'],
	weight: ['400', '700']
})

const theme = createTheme({
	type: 'light',
	theme: {
		colors: {
			primary: '#F45050',
			// background: '#F0F0F0',
			text: '#3C486B',
			link: '#3C486B',
			foreground: '#3C486B',
			linkLight: 'rgba(244, 80, 80, 0.8)'
		}
	}
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider theme={theme}>
			<Component {...pageProps} className={roboto.className} />
		</NextUIProvider>
	)
}
