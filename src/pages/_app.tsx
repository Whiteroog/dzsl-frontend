import { NextUIProvider, createTheme } from '@nextui-org/react'
import type { AppProps } from 'next/app'

import '@/assets/styles/globals.css'

const theme = createTheme({
	type: 'light', // it could be "light" or "dark"
	theme: {
		colors: {
			background: '#F0F0F0',
			text: '#3C486B'
		}
	}
})

function App({ Component, pageProps }: AppProps) {
	return (
		<NextUIProvider theme={theme}>
			<Component {...pageProps} />
		</NextUIProvider>
	)
}

export default App
