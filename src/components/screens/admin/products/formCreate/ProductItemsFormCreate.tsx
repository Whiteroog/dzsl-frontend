import { Button, Input, Table } from '@nextui-org/react'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai'

import { IProductItem } from '@/types/product.interface'

import stylesTable from '../../tables/Table.module.scss'

import { ICreateProduct } from '@/services/product.service'

const ProductItemsFormCreate = ({
	control
}: {
	control: Control<ICreateProduct>
}) => {
	const [lastId, setLastId] = useState(1)
	const [productItems, setProductItems] = useState<IProductItem[]>([])

	const getProductItem = (id: number) =>
		productItems.find(item => item.id === id) as IProductItem

	const setInputNameHandler = (item: IProductItem, newValue: string) => {
		item.name = newValue
		setProductItems(productItems)
		return productItems
	}

	const setInputQuantityHandler = (item: IProductItem, newValue: string) => {
		const valueNumber = Number(newValue)

		const valueNumberValidated =
			valueNumber < 0 ? 0 : valueNumber > 999 ? 999 : valueNumber

		item.quantity = valueNumberValidated
		setProductItems(productItems)
		return productItems
	}

	const setInputPriceHandler = (item: IProductItem, newValue: string) => {
		const valueNumber = Number(newValue)

		const valueNumberValidated =
			valueNumber < 0 ? 0 : valueNumber > 999 ? 999 : valueNumber

		item.price = valueNumberValidated
		setProductItems(productItems)
		return productItems
	}

	const addFieldHandler = () => {
		productItems.push({ id: lastId, name: '', quantity: 0, price: 0 })
		setProductItems(productItems)
		setLastId(lastId + 1)

		return productItems
	}

	const removeFieldHandler = (id: number) => {
		const filteredProductItems = productItems.filter(item => item.id !== id)
		setProductItems(filteredProductItems)

		return productItems
	}

	return (
		<Controller
			control={control}
			name='productItems'
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
							{productItems ? (
								productItems.map(item => {
									return (
										<Table.Row key={item.id}>
											<Table.Cell>
												<Input
													type='text'
													required
													value={item.name}
													onChange={newValue =>
														onChange(
															setInputNameHandler(
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
															setInputQuantityHandler(
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
															setInputPriceHandler(
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
														onChange(removeFieldHandler(item.id ?? -1))
													}}
												></Button>
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

export default ProductItemsFormCreate
