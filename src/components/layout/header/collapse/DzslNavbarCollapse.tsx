import { Collapse, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import { testCategory } from '@/interfaces/category.interface'
import { Links } from '@/links/Links'

const DzslNavbarCollapse: FC = () => {
	return (
		<Navbar.Collapse>
			<Navbar.CollapseItem>
				<Collapse title='Продукция' divider={false}>
					<ul className='pl-2'>
						{testCategory.map(category => (
							<li key={category.id}>
								<Link href={Links.PRODUCTS + category.slug}>
									{category.name}
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
	)
}

export default DzslNavbarCollapse