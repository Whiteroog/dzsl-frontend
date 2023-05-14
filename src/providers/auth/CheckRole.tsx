import { useRouter } from 'next/router'
import { FC, PropsWithChildren } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { TypeComponentAuthFields } from './auth-page.types'

const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
	Component: { isOnlyAdmin },
	children
}) => {
	const { user } = useAuth()
	const router = useRouter()

	if (user && isOnlyAdmin) return <>{children}</>

	router.pathname !== '/404' && router.replace('/404')
	return null
}

export default CheckRole
