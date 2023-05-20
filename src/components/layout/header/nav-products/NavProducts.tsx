import { Dropdown, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import { ICategory } from '@/types/category.interface'
import { EnumLinks } from '@/types/links.enum'

const NavProducts: FC<{ categories: ICategory[] }> = ({ categories }) => {
	return (
		<Dropdown>
			<Navbar.Item>
				<Dropdown.Button light>Продукция</Dropdown.Button>
			</Navbar.Item>
			<Dropdown.Menu>
				{categories.map(category => (
					<Dropdown.Item key={category.id}>
						<Link href={EnumLinks.PRODUCTS + category.slug}>
							{category.name}
						</Link>
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default NavProducts
