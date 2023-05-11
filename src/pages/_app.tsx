import { NextUIProvider, useSSR } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import AuthProvider from '@/providers/auth/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/auth/auth-page.types'

import '@/assets/styles/globals.scss'

import { store } from '@/store/store'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

export default function App({
	Component,
	pageProps
}: AppProps & TypeComponentAuthFields) {
	const { isBrowser } = useSSR()
	return (
		isBrowser && (
			<QueryClientProvider client={queryClient}>
				<Provider store={store}>
					<AuthProvider Component={{ isOnlyUser: Component.isOnlyUser }}>
						<NextUIProvider>
							<Component {...pageProps} />
						</NextUIProvider>
					</AuthProvider>
				</Provider>
			</QueryClientProvider>
		)
	)
}
