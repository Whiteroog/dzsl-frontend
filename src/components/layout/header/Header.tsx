import { Navbar } from '@nextui-org/react'
import { FC } from 'react'

import DzslNavbarCollapse from './collapse/DzslNavbarCollapse'
import Logo from './logo/Logo'
import Products from './products/Products'
import { Links } from '@/links/Links'

const Header: FC = () => {
	return (
		<header className='mb-10'>
			<Navbar
				disableBlur={true}
				disableShadow={true}
				height={100}
				containerCss={{ justifyContent: 'start' }}
			>
				<Navbar.Toggle showIn='sm' className='px-6' />
				<Logo />
				<Navbar.Content hideIn='sm' className='ml-10 pt-10'>
					<Products />
					<Navbar.Link href={Links.ABOUT_US}>О Нас</Navbar.Link>
					<Navbar.Link href={Links.DELIVERY}>Доставка</Navbar.Link>
					<Navbar.Link href={Links.CONTACTS}>Контакты</Navbar.Link>
				</Navbar.Content>
				<DzslNavbarCollapse />
			</Navbar>
		</header>
	)
}

export default Header
