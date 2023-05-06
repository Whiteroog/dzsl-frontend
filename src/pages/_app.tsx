import { NextUIProvider, useSSR } from '@nextui-org/react'
import type { AppProps } from 'next/app'

import '@/assets/styles/globals.scss'

export default function DzslApp({ Component, pageProps }: AppProps) {
	const { isBrowser } = useSSR()
	return (
		isBrowser && (
			<NextUIProvider>
				<Component {...pageProps} />
			</NextUIProvider>
		)
	)
}
