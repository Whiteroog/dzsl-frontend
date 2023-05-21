import { Button, Card, Input, Table } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { cloneDeep } from 'lodash'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toastr } from 'react-redux-toastr'

import { IProduct } from '@/types/product.interface'

import stylesTable from '../../../ui/tables/Table.module.scss'

import { ICreateOrder, OrderService } from '@/services/order.service'

interface IFormOrderProps {
	product: IProduct
}

const FormOrder: FC<{ product: IProduct }> = ({ product }) => {
	useEffect(() => {
		resetValues()
	}, [product])

	const resetValues = () => {
		_setOrderProduct(cloneDeep(product))
		setOrderProduct(cloneDeep(product))
		setValueOrderProduct(cloneDeep(product), 1)
	}

	const setValueOrderProduct = (newOrderProduct: IProduct, newQuan: number) => {
		setValue('orderProduct', {
			name: newOrderProduct.name,
			category: newOrderProduct.category?.name ?? ' Нет категории',
			quantity: newQuan,
			price: newOrderProduct.price,
			orderProductItems: newOrderProduct.productItems
				? newOrderProduct.productItems.map(item => ({
						name: item.name,
						quantity: item.quantity,
						price: item.price
				  }))
				: []
		})
		setValue('totalPrice', newOrderProduct.price)
	}

	const [_orderProduct, _setOrderProduct] = useState<IProduct>({} as IProduct)
	const [orderProduct, setOrderProduct] = useState<IProduct>({} as IProduct)

	const [quantity, setQuantity] = useState<number>(1)

	const changeQuantityHandler = (newQuan: number) => {
		setQuantity(newQuan < 1 ? 1 : newQuan)

		if (orderProduct.productItems && _orderProduct.productItems) {
			for (let i = 0; i < orderProduct.productItems.length; i++) {
				orderProduct.productItems[i].quantity =
					_orderProduct.productItems[i].quantity * newQuan
				orderProduct.productItems[i].price =
					_orderProduct.productItems[i].price * newQuan
			}
		}

		orderProduct.price = _orderProduct.price * newQuan

		setOrderProduct(orderProduct)
		setValueOrderProduct(orderProduct, newQuan)
	}

	const { register, handleSubmit, reset, setValue } = useForm<ICreateOrder>()

	const { mutateAsync: createOrder } = useMutation({
		mutationKey: ['create order'],
		mutationFn: (data: ICreateOrder) => OrderService.create(data),
		onSuccess(data, variables, context) {
			toastr.success(
				'Форма отправлена',
				'Форма заказа успешно получена компанией'
			)
		},
		onError(error, variables, context) {
			toastr.error(
				'Ошибка на сервере',
				'Произошли внутренние проблемы на сервере'
			)
		}
	})

	const onSubmit: SubmitHandler<ICreateOrder> = data => {
		createOrder(data)
		reset()
		resetValues()
	}

	return (
		<Card variant='bordered'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Card.Header className='justify-center'>
					<h2 className='text-lg font-bold'>Форма составления заказа</h2>
				</Card.Header>
				<Card.Body className='flex flex-col items-center space-y-10'>
					{orderProduct.productItems?.length ? (
						<div className='w-full max-w-[480px]'>
							<h3 className='py-2 text-center text-lg font-medium'>
								Элементы товара
							</h3>
							<Table
								bordered={true}
								borderWeight='light'
								shadow={false}
								headerLined={true}
								lineWeight='light'
								lined={true}
								className={stylesTable.tableFontBs}
							>
								<Table.Header>
									<Table.Column>Название</Table.Column>
									<Table.Column>Количество</Table.Column>
									<Table.Column>Цена</Table.Column>
								</Table.Header>
								<Table.Body>
									{orderProduct.productItems.map(item => (
										<Table.Row key={item.id}>
											<Table.Cell>{item.name}</Table.Cell>
											<Table.Cell>{item.quantity}</Table.Cell>
											<Table.Cell>{item.price}</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							</Table>
						</div>
					) : (
						<></>
					)}
					<div className='flex justify-center space-x-[200px]'>
						<div>
							<Input
								type='number'
								label='Количество заказываемого товара'
								value={quantity}
								onChange={e =>
									changeQuantityHandler(Number(e.currentTarget.value))
								}
							/>
						</div>
						<div>
							<div>Итоговая цена</div>
							<div className='text-lg'>
								<strong>{orderProduct.price}</strong> р.
							</div>
						</div>
					</div>
				</Card.Body>
				<Card.Footer className='mt-8 flex-col pb-[200px]'>
					<div className='flex flex-col space-y-4'>
						<Input
							type='text'
							label='ф и о'
							clearable
							placeholder='Фамилия Имя Отчество'
							width='400px'
							required
							{...register('fullName')}
						/>
						<Input
							type='tel'
							label='телефон'
							clearable
							placeholder='+7 (123) 456-78-90'
							required
							{...register('phone')}
						/>

						<Input
							type='email'
							label='почта'
							clearable
							placeholder='example@mail.ru'
							required
							{...register('email')}
						/>
					</div>
					<Button className='mt-10' type='submit'>
						Отправить
					</Button>
				</Card.Footer>
			</form>
		</Card>
	)
}

export default FormOrder
