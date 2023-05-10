import { Checkbox } from '@nextui-org/react'
import { FC } from 'react'

import { testCategory } from '@/types/category.interface'

interface IProductFilter {}

const ProductFilter: FC<IProductFilter> = ({}) => {
	return (
		<div>
			<Checkbox.Group label='Категории'>
				{testCategory.map(category => (
					<Checkbox value={String(category.id)}>{category.name}</Checkbox>
				))}
			</Checkbox.Group>
		</div>
	)
}

export default ProductFilter
