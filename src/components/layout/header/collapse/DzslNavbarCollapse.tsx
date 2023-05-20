import { Collapse, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import { ICategory } from '@/types/category.interface'
import { EnumLinks } from '@/types/links.enum'

const DzslNavbarCollapse: FC<{ categories: ICategory[] }> = ({
	categories
}) => {
	return (
		<Navbar.Collapse>
			<Navbar.CollapseItem>
				<Collapse title='Продукция' divider={false}>
					<ul className='pl-2'>
						{categories.map(category => (
							<li key={category.id}>
								<Link href={EnumLinks.PRODUCTS + category.slug}>
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
