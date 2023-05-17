import {
	Button,
	Checkbox,
	FormElement,
	Grid,
	Input,
	Modal,
	SortDescriptor,
	Table,
	Textarea,
	useModal
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, KeyboardEvent, useState } from 'react'
import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { toastr } from 'react-redux-toastr'

import { ICategory } from '@/types/category.interface'
import { IProduct, ISpecifications } from '@/types/product.interface'

import stylesTable from '../tables/Table.module.scss'

import { CategoryService } from '@/services/category.service'
import { ICreateProduct, ProductService } from '@/services/product.service'

type ProductData = {
	items: IProduct[]
	sortDescriptor: SortDescriptor
}

const Products: FC = () => {
	/* sort */
	const defaultSortDescriptor: SortDescriptor = {
		column: 'id',
		direction: 'descending'
	}

	const setProductsWithParam = (
		items: IProduct[],
		sortDescriptor = products.sortDescriptor
	) => {
		setProducts({
			items,
			sortDescriptor
		})
	}

	const sortProducts = (descriptor: SortDescriptor) => {
		const { column, direction } = descriptor
		if (!products.items) return
		const sortedProducts = products.items.sort((a, b) => {
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
				case 'category':
					cmp = a.category.name.localeCompare(b.category.name)
					break
				case 'price':
					cmp = a.price - b.price
					break
				default:
					cmp = a.id - b.id
					break
			}
			if (direction === 'descending') cmp *= -1
			return cmp
		})

		setProductsWithParam(sortedProducts, descriptor)
		_setProducts(sortedProducts)
	}

	/* Search */
	const search = (term: string) => {
		term = term.toLowerCase()

		const searchedProducts = _products.filter(
			item =>
				String(item.id).includes(term) ||
				item.name.toLowerCase().includes(term) ||
				item.category.name.toLowerCase().includes(term) ||
				String(item.price).includes(term)
		)

		setProductsWithParam(searchedProducts)
	}

	const handleKeyDown = (e: KeyboardEvent<FormElement>) => {
		if (e.key === 'Enter') {
			if (e.currentTarget.value.length === 0) {
				setProductsWithParam(_products)
			} else {
				search(e.currentTarget.value)
			}
		}
	}

	/* initial */
	const [_products, _setProducts] = useState<IProduct[]>([])
	const [products, setProducts] = useState<ProductData>({
		items: [],
		sortDescriptor: defaultSortDescriptor
	})

	/* filter by categories */
	const [categories, setCategories] = useState<ICategory[]>([])
	const [checkCategories, setCheckCategories] = useState<string[]>([])

	const queryGetAllCategories = useQuery({
		queryKey: ['get all categories for products filter'],
		queryFn: CategoryService.getAll,
		onSuccess(data) {
			setCategories(data.data)
			setCheckCategories(data.data.map(item => item.name))
		}
	})

	const filterProductsByCategoriesHandler = (checkCategories: string[]) => {
		setCheckCategories(checkCategories)

		const filteredProducts = _products.filter(item =>
			checkCategories.includes(item.category.name)
		)

		setProductsWithParam(filteredProducts)
	}

	/* get all products */
	const queryGetAllProducts = useQuery({
		queryKey: ['get all products'],
		queryFn: ProductService.getAll,
		onSuccess(data) {
			_setProducts(data.data)
			setProductsWithParam(data.data)
		}
	})

	/* delete */
	const { mutateAsync: deleteProduct } = useMutation({
		mutationKey: ['delete product'],
		mutationFn: (id: number) => ProductService.delete(id),
		onSuccess() {
			queryGetAllProducts.refetch()
		}
	})

	/* modal show */
	const { setVisible: setVisibleModalShow, bindings: bindingsModalShow } =
		useModal()

	/* select item */
	const [selectItem, setSelectItem] = useState<IProduct>({} as IProduct)

	/* modal create */

	const { setVisible: setVisibleModalCreate, bindings: bindingsModalCreate } =
		useModal()

	bindingsModalCreate.onClose = () => {
		setVisibleModalCreate(false)
		resetFormCreate()
	}

	const { mutateAsync: createProduct } = useMutation({
		mutationKey: ['create product'],
		mutationFn: (data: ICreateProduct) => ProductService.create(data),
		onSuccess() {
			queryGetAllProducts.refetch()
		}
	})

	const {
		register: formCreate,
		handleSubmit: handleSubmitOnCreate,
		reset: resetFormCreate,
		setValue: setValueCrate,
		getValues: getValueCreate,
		control: controlCreate
	} = useForm<ICreateProduct>()

	const onSubmitCreate: SubmitHandler<ICreateProduct> = data => {
		console.log(data)

		if (_products.some(item => item.name === data.name)) {
			toastr.error('Поле Название', 'Значение поля занято')
			return
		}
		if (_products.some(item => item.slug === data.slug)) {
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

		createProduct(data)
		resetFormCreate()
		setVisibleModalCreate(false)
	}

	return (
		<>
			<h1 className='ml-[17%]'>Продукция</h1>
			<div className='flex items-end justify-between'>
				<Input
					size='sm'
					type='search'
					label='Поиск'
					width='250px'
					onKeyDown={handleKeyDown}
				/>
				<Button
					auto
					onClick={() => {
						setVisibleModalCreate(true)
					}}
				>
					Создать
				</Button>
			</div>
			<Grid.Container className='mt-2' gap={2}>
				<Grid xs={2} direction='column'>
					<h2 className='text-center'>Фильтр</h2>
					<div>
						<Checkbox.Group
							label='Категории'
							value={checkCategories}
							onChange={value => filterProductsByCategoriesHandler(value)}
						>
							{categories.map(item => (
								<Checkbox key={item.id} value={item.name}>
									{item.name}
								</Checkbox>
							))}
						</Checkbox.Group>
					</div>
				</Grid>

				<Grid xs={10} direction='column' className='w-full'>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						lined={true}
						lineWeight='light'
						sortDescriptor={products.sortDescriptor}
						onSortChange={sortProducts}
						className={stylesTable.table}
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
							<Table.Column key='category' allowsSorting>
								Категория
							</Table.Column>
							<Table.Column key='price' allowsSorting>
								Цена
							</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{products ? (
								products.items.map(item => (
									<Table.Row key={item.id}>
										<Table.Cell>{item.id}</Table.Cell>
										<Table.Cell>{item.name}</Table.Cell>
										<Table.Cell>{item.slug}</Table.Cell>
										<Table.Cell>{item.category.name}</Table.Cell>
										<Table.Cell>{item.price}</Table.Cell>
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
											></Button>
											<Button
												auto
												icon={<AiOutlineDelete color='red' />}
												className='button-icon'
												onClick={() => {
													deleteProduct(item.id)
												}}
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

			{/* model show */}

			<Modal className='p-6' closeButton width='50%' {...bindingsModalShow}>
				<Modal.Header>
					<h2 className='py-4 text-lg'>{`[${selectItem.id}] ${selectItem.name}`}</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-start'>
					<div className='flex flex-col'>
						<span>Id: {selectItem.id}</span>
						<span>Название: {selectItem.name}</span>
						<span>Категория: {selectItem.category?.name}</span>
						<span>Путь: {selectItem.slug}</span>
						<span>Цена: {selectItem.price}</span>
						<span>Изображение: {selectItem.image}</span>
						<span>Описание: {selectItem.description}</span>
					</div>
					<div className='w-full'>
						<span className='font-bold'>Технические характеристики</span>
						<Table
							bordered={true}
							borderWeight='light'
							shadow={false}
							headerLined={true}
							lineWeight='light'
							lined={true}
							className={stylesTable.tableWithoutActions}
						>
							<Table.Header>
								<Table.Column>Id</Table.Column>
								<Table.Column>Название</Table.Column>
								<Table.Column>Значение</Table.Column>
							</Table.Header>
							<Table.Body>
								{selectItem.specifications ? (
									selectItem.specifications.map(item => (
										<Table.Row key={item.id}>
											<Table.Cell>{item.id}</Table.Cell>
											<Table.Cell>{item.name}</Table.Cell>
											<Table.Cell>{item.value}</Table.Cell>
										</Table.Row>
									))
								) : (
									<></>
								)}
							</Table.Body>
						</Table>
					</div>
					<div className='w-full'>
						<span className='font-bold'>Элементы товара</span>
						<Table
							bordered={true}
							borderWeight='light'
							shadow={false}
							headerLined={true}
							lineWeight='light'
							lined={true}
							className={stylesTable.tableWithoutActions}
						>
							<Table.Header>
								<Table.Column>Id</Table.Column>
								<Table.Column>Название</Table.Column>
								<Table.Column>Количество</Table.Column>
								<Table.Column>Цена</Table.Column>
							</Table.Header>
							<Table.Body>
								{selectItem.productItems ? (
									selectItem.productItems.map(item => (
										<Table.Row key={item.id}>
											<Table.Cell>{item.id}</Table.Cell>
											<Table.Cell>{item.name}</Table.Cell>
											<Table.Cell>{item.quantity}</Table.Cell>
											<Table.Cell>{item.price}</Table.Cell>
										</Table.Row>
									))
								) : (
									<></>
								)}
							</Table.Body>
						</Table>
					</div>
				</Modal.Body>
				<Modal.Footer className='flex flex-col items-center py-10'>
					<Button type='button' onClick={() => setVisibleModalShow(false)}>
						Закрыть
					</Button>
				</Modal.Footer>
			</Modal>

			{/* model create */}

			<Modal className='p-6' closeButton width='50%' {...bindingsModalCreate}>
				<Modal.Header>
					<h2 className='py-4 text-lg'>Создание товара</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-start'>
					<div>
						<Input
							type='text'
							label='Название'
							width='100%'
							required
							{...formCreate('name')}
						/>

						{/* dropdown category */}
						<Input
							type='text'
							label='Путь'
							width='100%'
							required
							{...formCreate('slug')}
						/>
						<Input
							type='number'
							label='Цена'
							width='100%'
							required
							{...formCreate('price')}
						/>
						{/* load image */}
						<Input
							type='text'
							label='Изображение'
							width='100%'
							required
							{...formCreate('image')}
						/>
						<Textarea
							{...formCreate('description')}
							label='Описание'
							minRows={4}
							fullWidth
						/>
					</div>
					<SpecificationsForm control={controlCreate} />
				</Modal.Body>
				<Modal.Footer className='flex flex-col items-center py-10'>
					<Button type='button' onClick={() => setVisibleModalShow(false)}>
						создать
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

const SpecificationsForm = ({
	control
}: {
	control: Control<ICreateProduct>
}) => {
	const [lastId, setLastId] = useState(1)
	const [specifications, setSpecifications] = useState<ISpecifications[]>([])

	const getSpecifications = (id: number) =>
		specifications.find(item => item.id === id) as ISpecifications

	const setInputValueHandler = (id: number, newValue: string) => {
		const valueNumber = Number(newValue)
		const findSpecifications = getSpecifications(id)
		findSpecifications.value = valueNumber
		setSpecifications(specifications)
		return specifications
	}
	const setInputNameHandler = (id: number, newValue: string) => {
		const findSpecifications = getSpecifications(id)
		findSpecifications.name = newValue
		setSpecifications(specifications)
		return specifications
	}

	return (
		<Controller
			control={control}
			name='specifications'
			render={({ field: { value, onChange } }) => (
				<div className='w-full'>
					<div className='flex items-center'>
						<span className='font-bold'>Технические характеристики</span>
						<Button
							auto
							onClick={() => {
								specifications.push({ id: lastId, name: '', value: 0 })
								setSpecifications(specifications)
								setLastId(lastId + 1)
								onChange(specifications)

								console.log(value)
							}}
						>
							Добавить
						</Button>
					</div>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						headerLined={true}
						lineWeight='light'
						lined={true}
						className={stylesTable.tableWithoutActions}
					>
						<Table.Header>
							<Table.Column>Id</Table.Column>
							<Table.Column>Название</Table.Column>
							<Table.Column>Значение</Table.Column>
						</Table.Header>
						<Table.Body>
							{specifications ? (
								specifications.map(item => {
									return (
										<Table.Row key={item.id}>
											<Table.Cell>
												<Input type='number' required value={item.id} />
											</Table.Cell>
											<Table.Cell>
												<Input
													type='text'
													required
													value={item.name}
													onChange={newValue =>
														onChange(
															setInputNameHandler(
																item.id ?? -1,
																newValue.currentTarget.value
															)
														)
													}
												/>
											</Table.Cell>
											<Table.Cell>
												<Input
													type='number'
													required
													value={item.value}
													onChange={newValue =>
														onChange(
															setInputValueHandler(
																item.id ?? -1,
																newValue.currentTarget.value
															)
														)
													}
												/>
											</Table.Cell>
										</Table.Row>
									)
								})
							) : (
								<></>
							)}
						</Table.Body>
					</Table>
				</div>
			)}
		/>
	)
}

export default Products
