import {
	Button,
	FormElement,
	Grid,
	Input,
	Modal,
	SortDescriptor,
	Table,
	useModal
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, KeyboardEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { toastr } from 'react-redux-toastr'

import { ICategory } from '@/types/category.interface'

import styles from '../tables/Table.module.scss'

import { CategoryService, TypeCategoryData } from '@/services/category.service'

type CategoryData = {
	items: ICategory[]
	sortDescriptor: SortDescriptor
}

const Category: FC = () => {
	/* sort */
	const defaultSortDescriptor: SortDescriptor = {
		column: 'id',
		direction: 'descending'
	}

	const setCategoriesWithParam = (
		items: ICategory[],
		sortDescriptor = categories.sortDescriptor
	) => {
		setCategories({
			items,
			sortDescriptor
		})
	}

	const sortCategories = (descriptor: SortDescriptor) => {
		const { column, direction } = descriptor
		if (!categories.items) return
		const sortedCategories = categories.items.sort((a, b) => {
			let cmp = 1
			switch (column) {
				case 'id':
					cmp = a.id - b.id
					break
				case 'name':
					cmp = a.name.localeCompare(b.name)
					break
				case 'slug':
					cmp = a.slug.localeCompare(b.slug)
					break
				default:
					cmp = a.id - b.id
					break
			}
			if (direction === 'descending') cmp *= -1
			return cmp
		})
		setCategoriesWithParam(sortedCategories, descriptor)
	}

	/* Search */
	const search = (term: string) => {
		term = term.toLowerCase()

		const searchedCategories = categories.items.filter(
			cat =>
				String(cat.id).includes(term) ||
				cat.name.toLowerCase().includes(term) ||
				cat.slug.toLowerCase().includes(term)
		)

		setCategoriesWithParam(searchedCategories)
	}

	const handleKeyDown = (e: KeyboardEvent<FormElement>) => {
		if (e.key === 'Enter') {
			if (e.currentTarget.value.length === 0) {
				setCategoriesWithParam(_categories)
			} else {
				search(e.currentTarget.value)
			}
		}
	}

	/* initial */
	const [_categories, _setCategories] = useState<ICategory[]>([])
	const [categories, setCategories] = useState<CategoryData>({
		items: [],
		sortDescriptor: defaultSortDescriptor
	})

	/* select item */
	const [selectItem, setSelectItem] = useState<ICategory>({} as ICategory)

	/* Get all categories */
	const queryGetAllCategories = useQuery({
		queryKey: ['get all categories'],
		queryFn: CategoryService.getAll,
		onSuccess(data) {
			_setCategories(data.data)
			setCategoriesWithParam(data.data, defaultSortDescriptor)
		}
	})

	/* modal create */

	const { setVisible: setVisibleModalCreate, bindings: bindingsModalCreate } =
		useModal()

	bindingsModalCreate.onClose = () => {
		setVisibleModalCreate(false)
		resetFormCreate()
	}

	const { mutateAsync: createCategory } = useMutation({
		mutationKey: ['create category'],
		mutationFn: (data: TypeCategoryData) => CategoryService.create(data),
		onSuccess() {
			queryGetAllCategories.refetch()
		}
	})

	const {
		register: formCreate,
		handleSubmit: handleSubmitOnCreate,
		reset: resetFormCreate
	} = useForm<TypeCategoryData>()

	const onSubmitCreate: SubmitHandler<TypeCategoryData> = data => {
		console.log(data)

		if (_categories.some(item => item.name === data.name)) {
			toastr.error('Поле Название', 'Значение поля занято')
			return
		}
		if (_categories.some(item => item.slug === data.slug)) {
			toastr.error('Поле Путь', 'Значение поля занято')
			return
		}
		if (data.slug.split(' ').length > 1) {
			toastr.error(
				'Поле Путь',
				'Значение введено не правильно. Путь должен быть введен слитно'
			)
			return
		}

		createCategory(data)
		resetFormCreate()
		setVisibleModalCreate(false)
	}

	/* delete */
	const { mutateAsync: deleteCategory } = useMutation({
		mutationKey: ['delete category'],
		mutationFn: (id: number) => CategoryService.delete(id),
		onSuccess() {
			queryGetAllCategories.refetch()
		}
	})

	/* modal show */
	const { setVisible: setVisibleModalShow, bindings: bindingsModalShow } =
		useModal()

	/* modal edit */
	const { setVisible: setVisibleModalEdit, bindings: bindingsModalEdit } =
		useModal()

	bindingsModalEdit.onClose = () => {
		setVisibleModalEdit(false)
		resetFormEdit()
	}

	const { mutateAsync: editCategory } = useMutation({
		mutationKey: ['edit category'],
		mutationFn: (data: ICategory) => CategoryService.update(data),
		onSuccess() {
			queryGetAllCategories.refetch()
		}
	})

	const {
		register: formEdit,
		handleSubmit: handleSubmitOnEdit,
		reset: resetFormEdit,
		setValue: setValueEdit
	} = useForm<ICategory>()

	const onSubmitEdit: SubmitHandler<ICategory> = data => {
		console.log(data)

		if (_categories.some(item => item.name === data.name)) {
			toastr.error('Поле Название', 'Значение поля занято')
			return
		}
		if (_categories.some(item => item.slug === data.slug)) {
			toastr.error('Поле Путь', 'Значение поля занято')
			return
		}

		if (data.slug.split(' ').length > 1) {
			toastr.error(
				'Поле Путь',
				'Значение введено не правильно. Путь должен быть введен слитно'
			)
			return
		}

		editCategory(data)
		resetFormEdit()
		setVisibleModalEdit(false)
	}

	const editHandler = (item: ICategory) => {
		setValueEdit('id', item.id)
		setValueEdit('name', item.name)
		setValueEdit('slug', item.slug)

		setVisibleModalEdit(true)
	}

	return (
		<>
			<h1 className='ml-[17%]'>Категории</h1>
			<div className='flex items-end justify-between'>
				<Input
					size='sm'
					type='search'
					label='Поиск'
					width='250px'
					onKeyDown={handleKeyDown}
				/>
				<Button auto onClick={() => setVisibleModalCreate(true)}>
					Создать
				</Button>
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
						onSortChange={sortCategories}
					>
						<Table.Header>
							<Table.Column key='id' allowsSorting width={80}>
								Id
							</Table.Column>
							<Table.Column key='name' allowsSorting>
								Название
							</Table.Column>
							<Table.Column key='slug' allowsSorting>
								Путь
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
												onClick={() => {
													setSelectItem(item)
													setVisibleModalShow(true)
												}}
											></Button>
											<Button
												auto
												icon={<AiOutlineEdit />}
												className='button-icon'
												onClick={() => {
													editHandler(item)
												}}
											></Button>
											<Button
												auto
												icon={<AiOutlineDelete color='red' />}
												className='button-icon'
												onClick={() => deleteCategory(item.id)}
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

			{/* model create */}

			<Modal className='p-6' closeButton width='50%' {...bindingsModalCreate}>
				<form onSubmit={handleSubmitOnCreate(onSubmitCreate)}>
					<Modal.Header>
						<h2 className='py-4 text-lg'>Создание категории</h2>
					</Modal.Header>
					<Modal.Body className='flex flex-col items-start'>
						<Input
							type='text'
							label='Название'
							width='100%'
							required
							{...formCreate('name')}
						/>
						<Input
							type='text'
							label='Путь'
							width='100%'
							required
							{...formCreate('slug')}
						/>
					</Modal.Body>
					<Modal.Footer className='flex flex-col items-center py-10'>
						<Button type='submit'>Создать</Button>
					</Modal.Footer>
				</form>
			</Modal>

			{/* model show */}

			<Modal className='p-6' closeButton width='50%' {...bindingsModalShow}>
				<Modal.Header>
					<h2 className='py-4 text-lg'>{`[${selectItem.id}] ${selectItem.name}`}</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-start'>
					<span>Id: {selectItem.id}</span>
					<span>Название: {selectItem.name}</span>
					<span>Путь: {selectItem.slug}</span>
				</Modal.Body>
				<Modal.Footer className='flex flex-col items-center py-10'>
					<Button type='button' onClick={() => setVisibleModalShow(false)}>
						Закрыть
					</Button>
				</Modal.Footer>
			</Modal>

			{/* model edit */}

			<Modal className='p-6' closeButton width='50%' {...bindingsModalEdit}>
				<form onSubmit={handleSubmitOnEdit(onSubmitEdit)}>
					<Modal.Header>
						<h2 className='py-4 text-lg'>Создание категории</h2>
					</Modal.Header>
					<Modal.Body className='flex flex-col items-start'>
						<Input
							type='text'
							label='Название'
							width='100%'
							required
							{...formEdit('name')}
						/>
						<Input
							type='text'
							label='Путь'
							width='100%'
							required
							{...formEdit('slug')}
						/>
					</Modal.Body>
					<Modal.Footer className='flex flex-col items-center py-10'>
						<Button type='submit'>Изменить</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	)
}

export default Category
