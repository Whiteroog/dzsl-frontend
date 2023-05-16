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
	useCollator,
	useInput,
	useModal
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import { ICategory } from '@/types/category.interface'
import { IProduct, ISpecifications } from '@/types/product.interface'

import specificationsStyles from '../../../ui/specifications/Specifications.module.scss'
import tableStyles from '../tables/Table.module.scss'

import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product.service'

type ProductData = {
	items: IProduct[]
	sortDescriptor: SortDescriptor
}

const Products: FC = () => {
	/* sort */
	const setProductsWithParam = (
		items: IProduct[],
		sortDescriptor = products.sortDescriptor
	): ProductData => ({
		items,
		sortDescriptor
	})

	const collator = useCollator()

	const sortProduct = (descriptor: SortDescriptor) => {
		const { column, direction } = descriptor
		let sortProducts = _products

		if (!sortProducts) return

		sortProducts = _products.sort((a, b) => {
			let cmp = 1

			switch (column) {
				case 'id':
					cmp = collator.compare(String(a.id), String(b.id))
					break
				case 'name':
					cmp = collator.compare(a.name, b.name)
					break
				case 'category':
					cmp = collator.compare(a.category.name, b.category.name)
					break
				case 'price':
					cmp = collator.compare(String(a.price), String(b.price))
					break
				default:
					cmp = collator.compare(String(a.id), String(b.id))
					break
			}

			if (direction === 'descending') cmp *= -1
			return cmp
		})
		setProducts(setProductsWithParam(sortProducts, descriptor))
	}

	const [_products, _setProducts] = useState<IProduct[]>([])
	const [products, setProducts] = useState<ProductData>({
		items: [],
		sortDescriptor: {
			column: 'id',
			direction: 'ascending'
		}
	})

	const [selectedProduct, setSelectedProduct] = useState<IProduct>(
		{} as IProduct
	)

	const selectProductHandler = (id: number) => {
		setSelectedProduct(
			products.items.find(item => item.id === id) ?? ({} as IProduct)
		)
	}

	/* Get all */
	const queryGetAllProducts = useQuery({
		queryKey: ['get all users'],
		queryFn: ProductService.getAll,
		onSuccess(data) {
			_setProducts(data.data)
			setProducts(setProductsWithParam(data.data))
		}
	})

	/* Get categories */
	const queryGetAllCategories = useQuery({
		queryKey: ['get all categories for products'],
		queryFn: CategoryService.getAll,
		onSuccess(data) {
			setCategories(data.data)
			setCheckCategories(data.data.map(item => String(item.id)))
		}
	})

	const [categories, setCategories] = useState<ICategory[]>([])
	const [checkCategories, setCheckCategories] = useState<string[]>([])

	/* filter */
	const categoryFilterHandler = (checks: string[]) => {
		const filteredProducts = _products.filter(product =>
			checks.includes(String(product.category.id))
		)

		setProducts(setProductsWithParam(filteredProducts))
		setCheckCategories(checks)
	}

	/* search */
	const search = (term: string) => {
		term = term.toLowerCase()

		const searchedProducts = _products.filter(
			product =>
				product.name.toLowerCase().includes(term) ||
				product.category.name.toLowerCase().includes(term) ||
				String(product.price).includes(term)
		)

		setProducts(setProductsWithParam(searchedProducts))
	}

	const handleKeyDown = (e: KeyboardEvent<FormElement>) => {
		if (e.key === 'Enter') {
			if (e.currentTarget.value.length === 0) {
				setProducts(setProductsWithParam(_products))
			} else {
				search(e.currentTarget.value)
			}
		}
	}

	/* Delete  */
	const { mutateAsync: deleteProduct } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => ProductService.delete(id),
		onSuccess() {
			queryGetAllProducts.refetch()
		}
	})

	/* Show product */
	const { setVisible: setShowModel, bindings: bindingsShowModel } = useModal()

	/* Create product */
	const { setVisible: setCreateModel, bindings: bindingsCreateModel } =
		useModal()

	const {
		value: name,
		setValue: setName,
		reset: resetName,
		bindings: bindingsName
	} = useInput('')

	const [specifications, setSpecifications] = useState<ISpecifications[]>([])

	const inputSpecificationsHandler = (
		e: ChangeEvent<FormElement>,
		field: string,
		index: number
	) => {
		const inputValue = e.currentTarget.value
		const newSpecifications = specifications

		if (field === 'name') {
			newSpecifications[index].name = inputValue
		} else if (field === 'value') {
			newSpecifications[index].value = Number(inputValue)
		}

		setSpecifications(newSpecifications)
		console.log(specifications)
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
						setCreateModel(true)
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
							onChange={categoryFilterHandler}
						>
							{categories.map(item => (
								<Checkbox key={item.id} value={String(item.id)}>
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
						onSortChange={sortProduct}
						className={tableStyles.table}
					>
						<Table.Header>
							<Table.Column key='id' allowsSorting width={80}>
								Id
							</Table.Column>
							<Table.Column key='name' allowsSorting>
								Название
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
										<Table.Cell>{item.category.name}</Table.Cell>
										<Table.Cell>{item.price}</Table.Cell>
										<Table.Cell>
											<Button
												auto
												icon={<AiOutlineEye />}
												className='button-icon'
												onClick={() => {
													setShowModel(true)
													selectProductHandler(item.id)
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
												onClick={() => deleteProduct(item.id)}
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

			<Modal className='p-6' closeButton width='50%' {...bindingsCreateModel}>
				<Modal.Header>
					<h2 className='py-4 text-lg'>Создание продукта</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-start'>
					<Input type='text' label='Название' width='100%' />
					<Input type='text' label='Путь' width='100%' />
					<Input type='text' label='Цена' width='100%' />
					<Input
						size='sm'
						type='text'
						label='Название изображения'
						width='100%'
					/>
					<Textarea fullWidth maxRows={10} {...bindingsName} />

					<div className='flex items-center justify-between self-stretch'>
						<span className='mr-6'>Технические характеристики:</span>
						<Button
							auto
							onClick={() =>
								setSpecifications([...specifications, { name: '', value: 0 }])
							}
						>
							Добавить
						</Button>
					</div>

					<div className='self-stretch'>
						<Table
							bordered={true}
							borderWeight='light'
							shadow={false}
							headerLined={true}
							lineWeight='light'
							lined={true}
							className={specificationsStyles.specifications}
						>
							<Table.Header>
								<Table.Column>Название</Table.Column>
								<Table.Column>Значение</Table.Column>
							</Table.Header>
							<Table.Body>
								{specifications.map((item, index) => (
									<Table.Row key={index}>
										<Table.Cell>
											<Input
												type='text'
												width='100%'
												onChange={e =>
													inputSpecificationsHandler(e, 'name', index)
												}
											/>
										</Table.Cell>
										<Table.Cell>
											<Input
												type='text'
												width='100%'
												onChange={e =>
													inputSpecificationsHandler(e, 'value', index)
												}
											/>
										</Table.Cell>
									</Table.Row>
								))}
							</Table.Body>
						</Table>
					</div>

					<Button
						className='mt-6 self-center'
						auto
						onClick={() => {
							setCreateModel(false)
						}}
					>
						Создать
					</Button>
				</Modal.Body>
			</Modal>

			<Modal className='p-6' closeButton width='50%' {...bindingsShowModel}>
				<Modal.Header>
					<h2 className='py-4 text-lg'>Данные продукта</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-start'>
					<span>{'id: ' + selectedProduct.id}</span>
					<span>{'Название: ' + selectedProduct.name}</span>
					<span>{'Путь: ' + selectedProduct.slug}</span>
					<span>{'Цена: ' + selectedProduct.price}</span>
					<span>{'Изображение: ' + selectedProduct.image}</span>
					<span>{'Описание: ' + selectedProduct.description}</span>
					<span>{'Категория: ' + selectedProduct.category?.name}</span>
					<span>Технические характеристики:</span>
					<div className='self-stretch'>
						<Table
							bordered={true}
							borderWeight='light'
							shadow={false}
							headerLined={true}
							lineWeight='light'
							lined={true}
							className={tableStyles.specifications}
						>
							<Table.Header>
								<Table.Column>Название</Table.Column>
								<Table.Column>Значение</Table.Column>
							</Table.Header>
							<Table.Body>
								{selectedProduct.specifications ? (
									selectedProduct.specifications.map(item => (
										<Table.Row key={item.id}>
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

					<Button
						className='mt-6 self-center'
						auto
						onClick={() => {
							setShowModel(false)
						}}
					>
						Закрыть
					</Button>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Products
