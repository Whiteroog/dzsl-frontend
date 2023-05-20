import { Dropdown } from '@nextui-org/react'
import { FC, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import { ICategory } from '@/types/category.interface'

import stylesDropdown from '../../../../ui/dropdown/Dropdown.module.scss'

import { IUpdateProduct } from '@/services/product.service'

const CategoryFormEdit: FC<{
	control: Control<IUpdateProduct>
	categories: ICategory[]
	defaultSelectCategory: ICategory
}> = ({ control, categories, defaultSelectCategory }) => {
	const [selectCategory, setSelectCategory] = useState<ICategory>(
		defaultSelectCategory
	)

	const selectCategoryHandler = (selectKey: Set<String>) => {
		const idSelectCategory = Number(Array.from(selectKey)[0])

		const foundedCategory =
			categories.find(item => item.id === idSelectCategory) ?? ({} as ICategory)

		setSelectCategory(foundedCategory)

		return foundedCategory
	}

	return (
		<Controller
			control={control}
			name='product.category'
			render={({ field: { value, onChange } }) => (
				<div className='flex items-center justify-start space-x-4'>
					<span>Категория: </span>
					<Dropdown>
						<Dropdown.Button className={stylesDropdown.dropdownButtonFlat}>
							{selectCategory.name}
						</Dropdown.Button>
						<Dropdown.Menu
							disallowEmptySelection
							selectionMode='single'
							selectedKeys={categories.map(c => c.id)}
							onSelectionChange={keys => {
								onChange(
									selectCategoryHandler(new Set(keys.valueOf() as string))
								)
							}}
						>
							{categories ? (
								categories.map(item => (
									<Dropdown.Item key={item.id}>{item.name}</Dropdown.Item>
								))
							) : (
								<></>
							)}
						</Dropdown.Menu>
					</Dropdown>
				</div>
			)}
		/>
	)
}

export default CategoryFormEdit
