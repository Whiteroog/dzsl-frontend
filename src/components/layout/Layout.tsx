import { Dropdown, Image, Link, Navbar } from '@nextui-org/react'
import { FC, PropsWithChildren } from 'react'

import { TypeCategory, testDataCategory } from '@/service/category.data'

type TypeMenuItem = {
	key: string
	name: string
	slug?: string
}

interface INavPage {
	slug: string | null
}

const Layout: FC<PropsWithChildren<INavPage>> = ({ children, slug }) => {
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
						className='ml-10 pt-10'
					>
						<Dropdown>
							<Navbar.Item isActive={'products' === slug}>
								<Dropdown.Button auto light>
									Продукция
								</Dropdown.Button>
							</Navbar.Item>
							<Dropdown.Menu>
								{testDataCategory.map((item: TypeCategory) => (
									<Dropdown.Item key={item.slug}>
										<Link href={'/products/category/' + item.slug}>
											{item.name}
										</Link>
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>

						<Navbar.Link isActive={'about-us' === slug} href='/about-us'>
							О Нас
						</Navbar.Link>
						<Navbar.Link isActive={'delivery' === slug} href='/delivery'>
							Доставка
						</Navbar.Link>
						<Navbar.Link isActive={'contacts' === slug} href='/contacts'>
							Контакты
						</Navbar.Link>
					</Navbar.Content>
				</Navbar>
			</header>

			<main className='min-h-screen'>{children}</main>
		</>
	)
}

export default Layout
