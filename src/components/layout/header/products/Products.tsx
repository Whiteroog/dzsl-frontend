import { Dropdown, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

import { testCategory } from '@/interfaces/category.interface'
import { Links } from '@/links/Links'

const Products: FC = () => {
	return (
		<Dropdown>
			<Navbar.Item>
				<Dropdown.Button light>Продукция</Dropdown.Button>
			</Navbar.Item>
			<Dropdown.Menu>
				{testCategory.map(category => (
					<Dropdown.Item key={category.id}>
						<Link href={Links.PRODUCTS + category.slug}>{category.name}</Link>
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default Products
