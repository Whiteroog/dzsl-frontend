import {
	Button,
	Checkbox,
	FormElement,
	Grid,
	Image,
	Input,
	Modal,
	SortDescriptor,
	Table,
	Textarea,
	useModal
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, KeyboardEvent, SyntheticEvent, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { toastr } from 'react-redux-toastr'

import { ICategory } from '@/types/category.interface'
import { EnumLinks } from '@/types/links.enum'
import {
	IProduct,
	IProductItem,
	ISpecifications
} from '@/types/product.interface'

import stylesTable from '../../../ui/tables/Table.module.scss'

import CategoryFormCreate from './form-create/CategoryFormCreate'
import ProductItemsFormCreate from './form-create/ProductItemsFormCreate'
import SpecificationsFormCreate from './form-create/SpecificationsFormCreate'
import CategoryFormEdit from './form-edit/CategoryFormEdit'
import ProductItemsFormEdit from './form-edit/ProductItemsFormEdit'
import SpecificationsFormEdit from './form-edit/SpecificationsFormEdit'
import UploadImage from './upload-image/UploadImage'
import { CategoryService } from '@/services/category.service'
import {
	ICreateProduct,
	IEditProductItems,
	IEditSpecifications,
	IUpdateProduct,
	ProductService
} from '@/services/product.service'

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
	}

	const sortSpecificationsByIdAsc = (specifications: ISpecifications[]) => {
		if (!specifications) return

		return specifications.sort((a, b) => a.id! - b.id!) ?? []
	}

	const sortProductItemsByIdAsc = (productItems: IProductItem[]) => {
		if (!productItems) return

		return productItems.sort((a, b) => a.id! - b.id!) ?? []
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
			data.data.forEach(item => {
				item.specifications = sortSpecificationsByIdAsc(
					item.specifications ?? []
				)
			})
			data.data.forEach(item => {
				item.productItems = sortProductItemsByIdAsc(item.productItems ?? [])
			})

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
		control: controlCreate,
		setValue: setValueCreate
	} = useForm<ICreateProduct>()

	const onSubmitCreate: SubmitHandler<ICreateProduct> = data => {
		if (!data.category) {
			toastr.error('Ошибка отправки', 'Значения Категория нет')
			return
		}

		if (_products.some(item => item.name === data.name)) {
			toastr.error('Поле Название', 'Значение поля занято')
			return
		}
		if (_products.some(item => item.slug === data.slug)) {
			toastr.error('Поле Путь', 'Значение поля занято')
			return
		}
		const slug = data.slug
		if (
			slug.includes(' ') ||
			slug.includes('/') ||
			slug.includes('?') ||
			slug.includes('=') ||
			slug.includes('+') ||
			slug.includes(',') ||
			slug.includes('.') ||
			slug.includes('|') ||
			slug.includes('\\')
		) {
			toastr.error('Поле Путь', 'Поле введено не правильно')
			return
		}

		createProduct(data)
		resetFormCreate()
		setVisibleModalCreate(false)
	}

	/* modal edit */

	const { setVisible: setVisibleModalEdit, bindings: bindingsModalEdit } =
		useModal()

	bindingsModalEdit.onClose = () => {
		setVisibleModalEdit(false)
		resetFormEdit()
	}

	const { mutateAsync: updateProduct } = useMutation({
		mutationKey: ['update product'],
		mutationFn: (data: IUpdateProduct) => ProductService.update(data),
		onSuccess() {
			queryGetAllProducts.refetch()
		}
	})

	const {
		register: formEdit,
		handleSubmit: handleSubmitOnEdit,
		reset: resetFormEdit,
		control: controlEdit,
		setValue: setValueEdit,
		getValues: getValueEdit
	} = useForm<IUpdateProduct>()

	const onSubmitEdit: SubmitHandler<IUpdateProduct> = data => {
		if (!data.product.category) {
			toastr.error('Ошибка отправки', 'Значения Категория нет')
			return
		}

		if (
			_products.some(
				item => item.name === data.product.name && item.id !== data.product.id
			)
		) {
			toastr.error('Поле Название', 'Значение поля занято')
			return
		}
		if (
			_products.some(
				item => item.slug === data.product.slug && item.id !== data.product.id
			)
		) {
			toastr.error('Поле Путь', 'Значение поля занято')
			return
		}
		const slug = data.product.slug
		if (
			slug.includes(' ') ||
			slug.includes('/') ||
			slug.includes('?') ||
			slug.includes('=') ||
			slug.includes('+') ||
			slug.includes(',') ||
			slug.includes('.') ||
			slug.includes('|') ||
			slug.includes('\\')
		) {
			toastr.error('Поле Путь', 'Поле введено не правильно')
			return
		}

		if (!data.specifications) {
			data.specifications = {} as IEditSpecifications
		}

		if (!data.productItems) {
			data.productItems = {} as IEditProductItems
		}

		updateProduct(data)
		resetFormEdit()
		setVisibleModalEdit(false)
	}

	const getLastIdSpecifications = (specifications: ISpecifications[]) => {
		return specifications.length
			? Math.max(...(specifications.map(item => item.id) as number[]))
			: 0
	}

	const getLastIdProductItems = (productItems: IProductItem[]) => {
		return productItems.length
			? Math.max(...(productItems.map(item => item.id) as number[]))
			: 0
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
						if (categories.length) {
							setValueCreate('category', categories[0])
							setVisibleModalCreate(true)
						}
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
												onClick={() => {
													setSelectItem(item)
													setValueEdit('product', item)
													setVisibleModalEdit(true)
												}}
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

			<Modal className='p-6' closeButton width='800px' {...bindingsModalShow}>
				<Modal.Header>
					<h2 className='py-4 text-lg'>{`[${selectItem.id}] ${selectItem.name}`}</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-stretch'>
					<div className='flex flex-col items-stretch'>
						<span>Id: {selectItem.id}</span>
						<span>Название: {selectItem.name}</span>
						<span>Категория: {selectItem.category?.name}</span>
						<span>Путь: {selectItem.slug}</span>
						<span>Цена: {selectItem.price}</span>
						<div>
							<span>Изображение:</span>
							<div className='p-6'>
								<Image
									src={EnumLinks.PRODUCT_IMAGES + selectItem.image}
									autoResize
									width='200px'
									onError={(e: SyntheticEvent) => {
										console.log(EnumLinks.PRODUCT_IMAGES + selectItem.image)
										;(e.target as HTMLImageElement).src =
											EnumLinks.STATIC_IMAGES + 'no-image-placeholder.svg'
									}}
								/>
							</div>
						</div>
						<span>
							Описание:{' '}
							{selectItem.description === ''
								? 'Нет описания'
								: selectItem.description}
						</span>
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

			<Modal className='p-6' closeButton width='800px' {...bindingsModalCreate}>
				<form onSubmit={handleSubmitOnCreate(onSubmitCreate)}>
					<Modal.Header>
						<h2 className='py-4 text-lg'>Создание товара</h2>
					</Modal.Header>
					<Modal.Body className='flex flex-col items-stretch'>
						<div className='space-y-2'>
							<Input
								type='text'
								label='Название'
								width='100%'
								required
								{...formCreate('name')}
							/>

							{categories.length ? (
								<CategoryFormCreate
									control={controlCreate}
									categories={categories}
									defaultSelectCategory={categories[0]}
								/>
							) : (
								<></>
							)}

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
								{...formCreate('price', {
									onChange(event: SyntheticEvent<HTMLInputElement>) {
										const valueNumber = Number(event.currentTarget.value)
										const valueNumberValidated =
											valueNumber < 0 ? 0 : valueNumber
										setValueCreate('price', valueNumberValidated)
									}
								})}
							/>

							{/* load image */}
							<Controller
								control={controlCreate}
								name='image'
								render={({ field: { onChange } }) => (
									<UploadImage onChange={onChange} />
								)}
							/>

							<Textarea
								{...formCreate('description')}
								label='Описание'
								minRows={4}
								fullWidth
							/>
						</div>
						<SpecificationsFormCreate
							control={controlCreate}
							lastIdSpecifications={getLastIdSpecifications(
								_products
									.map(item => item.specifications as ISpecifications[])
									.flat()
							)}
						/>
						<ProductItemsFormCreate
							control={controlCreate}
							lastIdProductItem={getLastIdProductItems(
								_products
									.map(item => item.productItems as IProductItem[])
									.flat()
							)}
							setValueCreate={setValueCreate}
						/>
					</Modal.Body>
					<Modal.Footer className='flex flex-col items-center py-10'>
						<Button type='submit'>Создать</Button>
					</Modal.Footer>
				</form>
			</Modal>

			{/* model edit */}

			<Modal className='p-6' closeButton width='800px' {...bindingsModalEdit}>
				<form onSubmit={handleSubmitOnEdit(onSubmitEdit)}>
					<Modal.Header>
						<h2 className='py-4 text-lg'>{`[${selectItem.id}] ${selectItem.name}`}</h2>
					</Modal.Header>
					<Modal.Body className='flex flex-col items-stretch'>
						<div className='space-y-2'>
							<Input
								type='text'
								label='Название'
								width='100%'
								required
								{...formEdit('product.name')}
							/>

							{categories.length ? (
								<CategoryFormEdit
									control={controlEdit}
									categories={categories}
									defaultSelectCategory={selectItem.category}
								/>
							) : (
								<></>
							)}

							<Input
								type='text'
								label='Путь'
								width='100%'
								required
								{...formEdit('product.slug')}
							/>
							<Input
								type='number'
								label='Цена'
								width='100%'
								required
								{...formEdit('product.price', {
									onChange(event: SyntheticEvent<HTMLInputElement>) {
										const valueNumber = Number(event.currentTarget.value)
										const valueNumberValidated =
											valueNumber < 0 ? 0 : valueNumber
										setValueEdit('product.price', valueNumberValidated)
									}
								})}
							/>

							{/* load image */}
							<Controller
								control={controlEdit}
								name='product.image'
								render={({ field: { onChange } }) => (
									<UploadImage
										onChange={onChange}
										existsImageSrc={selectItem.image}
									/>
								)}
							/>

							<Textarea
								{...formEdit('product.description')}
								label='Описание'
								minRows={4}
								fullWidth
							/>
						</div>
						<SpecificationsFormEdit
							control={controlEdit}
							defaultSpecifications={
								getValueEdit('product.specifications') ?? []
							}
							lastIdSpecifications={getLastIdSpecifications(
								_products
									.map(item => item.specifications as ISpecifications[])
									.flat()
							)}
						/>
						<ProductItemsFormEdit
							control={controlEdit}
							defaultProductItems={getValueEdit('product.productItems') ?? []}
							lastIdProductItem={getLastIdProductItems(
								_products
									.map(item => item.productItems as IProductItem[])
									.flat()
							)}
							setValueEdit={setValueEdit}
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

export default Products
