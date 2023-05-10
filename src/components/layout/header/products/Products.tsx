import { Dropdown, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import { testCategory } from '@/types/category.interface'
import { EnumLinks } from '@/types/links.enum'

const Products: FC = () => {
	return (
		<Dropdown>
			<Navbar.Item>
				<Dropdown.Button light>Продукция</Dropdown.Button>
			</Navbar.Item>
			<Dropdown.Menu>
				{testCategory.map(category => (
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

export default Products
