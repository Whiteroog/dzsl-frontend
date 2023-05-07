import { Grid, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import styles from './Header.module.scss'
import DzslNavbarCollapse from './collapse/DzslNavbarCollapse'
import Logo from './logo/Logo'
import Products from './products/Products'
import { Links } from '@/links/Links'

const Header: FC = () => {
	return (
		<header className='pb-10 pt-4'>
			<Grid.Container gap={2} className={styles.businessCard}>
				<Grid xs={12} sm={3}>
					<Logo />
				</Grid>
				<Grid xs={4} sm={3}>
					<span>8 (800) 555-88-11*</span>
					<span>*Звонок по России бесплатный</span>
				</Grid>
				<Grid xs={4} sm={3}>
					<span>пн-пт с 8:00 до 18:00</span>
					<span>сб с 10:00 до 15:00</span>
				</Grid>
				<Grid xs={4} sm={3}>
					<span>info@dzsl.ru</span>
					<span>г.Яхрома, ул.Ленина, д.42</span>
				</Grid>
			</Grid.Container>
			<Navbar disableBlur={true} disableShadow={true} className='z-40'>
				<Navbar.Toggle showIn='sm' className='px-6' />
				<Navbar.Content hideIn='sm' className=''>
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
