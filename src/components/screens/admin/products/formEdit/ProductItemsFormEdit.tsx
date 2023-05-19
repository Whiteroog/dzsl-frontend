import { Button, Input, Table } from '@nextui-org/react'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai'

import { IProductItem } from '@/types/product.interface'

import stylesTable from '../../tables/Table.module.scss'

import { IEditProductItems, IUpdateProduct } from '@/services/product.service'

const ProductItemsForm = ({
	control,
	defaultProductItems
}: {
	control: Control<IUpdateProduct>
	defaultProductItems: IProductItem[]
}) => {
	const [lastId, setLastId] = useState(
		Math.max(...(defaultProductItems.map(item => item.id) as number[])) + 1
	)

	const [existsProductItems, setExistsProductItems] =
		useState(defaultProductItems)

	const [editProductItems, setEditProductItems] = useState<IEditProductItems>({
		createProductItems: [],
		updateProductItems: [],
		deleteProductItems: []
	} as IEditProductItems)

	const addFieldHandler = () => {
		editProductItems.createProductItems.push({
			id: lastId,
			name: '',
			quantity: 0,
			price: 0
		})

		setEditProductItems(editProductItems)
		setLastId(lastId + 1)

		console.log(editProductItems)

		return editProductItems
	}

	const removeExistsFieldHandler = (field: IProductItem) => {
		editProductItems.deleteProductItems.push(field)

		const filteredProductItems = existsProductItems.filter(
			item => item.id !== field.id
		)
		setExistsProductItems(filteredProductItems)

		editProductItems.updateProductItems =
			editProductItems.updateProductItems.filter(item => item.id !== field.id)

		setEditProductItems(editProductItems)

		return editProductItems
	}

	const removeCreateFieldHandler = (id: number) => {
		editProductItems.createProductItems =
			editProductItems.createProductItems.filter(item => item.id !== id)
		setEditProductItems(editProductItems)

		return editProductItems
	}

	const updateExistsProductItems = (editedProductItems: IProductItem) => {
		let foundedExistsDataProductItems =
			editProductItems.updateProductItems.find(
				item => item.id === editedProductItems.id
			)

		if (foundedExistsDataProductItems) {
			foundedExistsDataProductItems = editedProductItems
			return editProductItems
		} else {
			editProductItems.updateProductItems.push(editedProductItems)
			return editProductItems
		}
	}

	const setInputNameExistsHandler = (item: IProductItem, newValue: string) => {
		item.name = newValue
		setExistsProductItems(existsProductItems)

		return updateExistsProductItems(item)
	}

	const setInputQuantityExistsHandler = (
		item: IProductItem,
		newValue: string
	) => {
		const valueNumber = Number(newValue)

		const valueNumberValidated = valueNumber < 0 ? 0 : valueNumber

		item.quantity = valueNumberValidated
		setExistsProductItems(existsProductItems)

		return updateExistsProductItems(item)
	}

	const setInputPriceExistsHandler = (item: IProductItem, newValue: string) => {
		const valueNumber = Number(newValue)

		const valueNumberValidated = valueNumber < 0 ? 0 : valueNumber

		item.price = valueNumberValidated
		setExistsProductItems(existsProductItems)

		return updateExistsProductItems(item)
	}

	const setInputNameCreatedHandler = (item: IProductItem, newValue: string) => {
		item.name = newValue

		return editProductItems
	}

	const setInputQuantityCreatedHandler = (
		item: IProductItem,
		newValue: string
	) => {
		const valueNumber = Number(newValue)

		const valueNumberValidated = valueNumber < 0 ? 0 : valueNumber

		item.quantity = valueNumberValidated

		return editProductItems
	}

	const setInputPriceCreatedHandler = (
		item: IProductItem,
		newValue: string
	) => {
		const valueNumber = Number(newValue)

		const valueNumberValidated = valueNumber < 0 ? 0 : valueNumber

		item.price = valueNumberValidated

		return editProductItems
	}

	return (
		<Controller
			control={control}
			name='product.productItems'
			render={({ field: { value, onChange } }) => (
				<div className='w-full'>
					<div className='flex items-center justify-between py-4'>
						<span className='font-bold'>Элементы товара</span>
						<Button
							auto
							size='sm'
							onClick={() => {
								onChange(addFieldHandler())
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
							<Table.Column>Название</Table.Column>
							<Table.Column>Количество</Table.Column>
							<Table.Column>Цена</Table.Column>
							<Table.Column hideHeader={true}>Удалить</Table.Column>
						</Table.Header>
						<Table.Body>
							{[
								...existsProductItems.map(item => {
									return (
										<Table.Row key={item.id}>
											<Table.Cell>
												<Input
													type='text'
													required
													value={item.name}
													onChange={newValue =>
														onChange(
															setInputNameExistsHandler(
																item,
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
													value={item.quantity}
													onChange={newValue =>
														onChange(
															setInputQuantityExistsHandler(
																item,
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
													value={item.price}
													onChange={newValue =>
														onChange(
															setInputPriceExistsHandler(
																item,
																newValue.currentTarget.value
															)
														)
													}
												/>
											</Table.Cell>
											<Table.Cell>
												<Button
													auto
													icon={<AiOutlineDelete color='red' />}
													className='button-icon'
													onClick={() => {
														onChange(removeExistsFieldHandler(item))
													}}
												></Button>
											</Table.Cell>
										</Table.Row>
									)
								}),

								...editProductItems.createProductItems.map(item => {
									return (
										<Table.Row key={item.id}>
											<Table.Cell>
												<Input
													type='text'
													required
													value={item.name}
													onChange={newValue =>
														onChange(
															setInputNameCreatedHandler(
																item,
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
													value={item.quantity}
													onChange={newValue =>
														onChange(
															setInputQuantityCreatedHandler(
																item,
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
													value={item.price}
													onChange={newValue =>
														onChange(
															setInputPriceCreatedHandler(
																item,
																newValue.currentTarget.value
															)
														)
													}
												/>
											</Table.Cell>
											<Table.Cell>
												<Button
													auto
													icon={<AiOutlineDelete color='red' />}
													className='button-icon'
													onClick={() => {
														onChange(removeExistsFieldHandler(item))
													}}
												></Button>
											</Table.Cell>
										</Table.Row>
									)
								})
							]}
						</Table.Body>
					</Table>
				</div>
			)}
		/>
	)
}

export default ProductItemsForm
