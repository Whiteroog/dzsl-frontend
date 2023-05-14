import { Dropdown, Link, Navbar } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import { ICategory } from '@/types/category.interface'
import { EnumLinks } from '@/types/links.enum'

import { CategoryService } from '@/services/category.service'

const NavProducts: FC = () => {
	const queryGetAllCategories = useQuery({
		queryKey: ['get all categories'],
		queryFn: CategoryService.getAll
	})

	const categories = queryGetAllCategories.data?.data ?? ([] as ICategory[])

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
