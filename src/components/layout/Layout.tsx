import { Dropdown, Image, Link, Navbar } from '@nextui-org/react'
import { FC, PropsWithChildren } from 'react'

type TypeMenuItem = {
	key: string
	name: string
	slug?: string
}

const menuItems: TypeMenuItem[] = [
	{ key: '1', name: 'Строительные леса', slug: '/products/category/1' },
	{ key: '2', name: 'Вышки-туры', slug: '/products/category/2' },
	{ key: '3', name: 'Стойки опалубки', slug: '/products/category/3' },
	{ key: '4', name: 'Щитовая опалубка', slug: '/products/category/4' }
]

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
	return (
		<>
			<header className='mb-10'>
				<Navbar
					containerCss={{
						justifyContent: 'start'
					}}
					disableBlur={true}
					disableShadow={true}
					height={100}
				>
					<Navbar.Brand>
						<Link href='/'>
							<Image
								src='http://localhost:3000/images/logo.png'
								alt='Логотип компании'
								width={209}
								height={100}
							/>
						</Link>
					</Navbar.Brand>
					<Navbar.Content
						activeColor={'primary'}
						variant='underline-rounded'
						className='ml-4'
					>
						<Dropdown>
							<Navbar.Item>
								<Dropdown.Button auto light>
									Продукция
								</Dropdown.Button>
							</Navbar.Item>
							<Dropdown.Menu>
								{menuItems.map((item: TypeMenuItem) => (
									<Dropdown.Item key={item.key}>
										<Link href={item.slug}>{item.name}</Link>
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>

						<Navbar.Link isActive href='/about-us'>
							О Нас
						</Navbar.Link>
						<Navbar.Link href='/delivery'>Доставка</Navbar.Link>
						<Navbar.Link href='/contacts'>Контакты</Navbar.Link>
					</Navbar.Content>
				</Navbar>
			</header>

			<main className='min-h-screen'>{children}</main>
		</>
	)
}

export default Layout
