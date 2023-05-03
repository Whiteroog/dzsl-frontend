import { Collapse, Dropdown, Image, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import { ICategory, testDataCategory } from '@/types/category.interface'

const Header: FC = () => {
	return (
		<header className='mb-10'>
			<Navbar
				containerCss={{
					justifyContent: 'start'
				}}
				disableBlur={true}
				disableShadow={true}
				height={100}
			>
				<Navbar.Toggle showIn='sm' className='px-6' />
				<Navbar.Brand className='mx-auto dzsl-sm:mx-0'>
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
					hideIn='sm'
					variant='underline-rounded'
					className='ml-10 pt-10'
				>
					<Dropdown>
						<Navbar.Item>
							<Dropdown.Button auto light>
								Продукция
							</Dropdown.Button>
						</Navbar.Item>
						<Dropdown.Menu>
							{testDataCategory.map((item: ICategory) => (
								<Dropdown.Item key={item.slug}>
									<Link href={'/products/category/' + item.slug}>
										{item.name}
									</Link>
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>

					<Navbar.Link href='/about-us'>О Нас</Navbar.Link>
					<Navbar.Link href='/delivery'>Доставка</Navbar.Link>
					<Navbar.Link href='/contacts'>Контакты</Navbar.Link>
				</Navbar.Content>
				<Navbar.Collapse>
					<Navbar.CollapseItem>
						<Collapse title='Продукция' divider={false}>
							<ul>
								{testDataCategory.map((item: ICategory) => (
									<li>
										<Link href={'/products/category/' + item.slug}>
											{item.name}
										</Link>
									</li>
								))}
							</ul>
						</Collapse>
					</Navbar.CollapseItem>
					<Navbar.CollapseItem>
						<Link href='/about-us'>О Нас</Link>
					</Navbar.CollapseItem>
					<Navbar.CollapseItem>
						<Link href='/delivery'>Доставка</Link>
					</Navbar.CollapseItem>
					<Navbar.CollapseItem>
						<Link href='/contacts'>Контакты</Link>
					</Navbar.CollapseItem>
				</Navbar.Collapse>
			</Navbar>
		</header>
	)
}

export default Header
