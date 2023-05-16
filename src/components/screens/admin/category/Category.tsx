import {
	Button,
	Grid,
	Input,
	SortDescriptor,
	Table,
	useCollator
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import { ICategory } from '@/types/category.interface'

import styles from '../tables/Table.module.scss'

import { CategoryService } from '@/services/category.service'

type CategoryData = {
	items: ICategory[]
	sortDescriptor: SortDescriptor
}

const Category: FC = () => {
	/* sort */
	const setCategoriesWithParam = (
		items: ICategory[],
		sortDescriptor = categories.sortDescriptor
	): CategoryData => ({
		items,
		sortDescriptor
	})

	const collator = useCollator()

	const sortCategory = (descriptor: SortDescriptor) => {
		const { column, direction } = descriptor
		let sortCategories = _categories

		if (!sortCategories) return

		sortCategories = _categories.sort((a, b) => {
			let cmp = 1

			switch (column) {
				case 'id':
					cmp = collator.compare(String(a.id), String(b.id))
					break
				case 'name':
					cmp = collator.compare(a.name, b.name)
					break
				case 'slug':
					cmp = collator.compare(a.slug, b.slug)
					break
				default:
					cmp = collator.compare(String(a.id), String(b.id))
					break
			}

			if (direction === 'descending') cmp *= -1
			return cmp
		})

		setCategories(setCategoriesWithParam(sortCategories, descriptor))
	}

	const [_categories, _setCategories] = useState<ICategory[]>([])
	const [categories, setCategories] = useState<CategoryData>({
		items: [],
		sortDescriptor: {
			column: 'id',
			direction: 'ascending'
		}
	})

	/* Get categories */
	const queryGetAllCategories = useQuery({
		queryKey: ['get all categories'],
		queryFn: CategoryService.getAll,
		onSuccess(data) {
			_setCategories(data.data)
			setCategories(setCategoriesWithParam(data.data))
		}
	})

	return (
		<>
			<h1 className='ml-[17%]'>Категории</h1>
			<div className='flex items-end justify-between'>
				<Input size='sm' type='search' label='Поиск' width='250px' />
				<Button auto>Создать</Button>
			</div>
			<Grid.Container className='mt-2' gap={2}>
				<Grid xs={12} direction='column' className='w-full'>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						lined={true}
						lineWeight='light'
						className={styles.table}
						sortDescriptor={categories.sortDescriptor}
						onSortChange={sortCategory}
					>
						<Table.Header>
							<Table.Column key='id' allowsSorting width={80}>
								Id
							</Table.Column>
							<Table.Column key='name' allowsSorting>
								Название
							</Table.Column>
							<Table.Column key='slug' allowsSorting>
								Slug
							</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{categories ? (
								categories.items.map(item => (
									<Table.Row key={item.id}>
										<Table.Cell>{item.id}</Table.Cell>
										<Table.Cell>{item.name}</Table.Cell>
										<Table.Cell>{item.slug}</Table.Cell>
										<Table.Cell>
											<Button
												auto
												icon={<AiOutlineEye />}
												className='button-icon'
											></Button>
											<Button
												auto
												icon={<AiOutlineEdit />}
												className='button-icon'
											></Button>
											<Button
												auto
												icon={<AiOutlineDelete color='red' />}
												className='button-icon'
											></Button>
										</Table.Cell>
									</Table.Row>
								))
							) : (
								<></>
							)}
						</Table.Body>
					</Table>
				</Grid>
			</Grid.Container>
		</>
	)
}

export default Category
