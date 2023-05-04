import { Container } from '@nextui-org/react'
import { FC, PropsWithChildren } from 'react'

import Header from './header/Header'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Container className='max-w-[1400px]'>
			<Header />
			<main className='min-h-screen'>{children}</main>
		</Container>
	)
}

export default Layout
