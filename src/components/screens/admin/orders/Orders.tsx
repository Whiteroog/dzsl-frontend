import { Button, Dropdown, Grid, Input, Table } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import { IOrder } from '@/types/order.interface'

import styles from '../tables/Table.module.scss'

import { OrderService } from '@/services/order.service'

const Orders: FC = () => {
	const [_orders, _setOrders] = useState<IOrder[]>([])

	const queryGetAllOrders = useQuery({
		queryKey: ['get all orders'],
		queryFn: OrderService.getAll,
		onSuccess(data) {
			_setOrders(data.data)
			console.log(data.data)
		}
	})

	return (
		<>
			<h1 className='ml-[17%]'>Заказы</h1>
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
					>
						<Table.Header>
							<Table.Column>Id</Table.Column>
							<Table.Column>Время</Table.Column>
							<Table.Column>ф и о</Table.Column>
							<Table.Column>Email</Table.Column>
							<Table.Column>Телефон</Table.Column>
							<Table.Column>Товар</Table.Column>
							<Table.Column>Статус</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{_orders.map(item => (
								<Table.Row key={item.id}>
									<Table.Cell>{item.id}</Table.Cell>
									<Table.Cell>{item.createdAt}</Table.Cell>
									<Table.Cell>{item.fullName}</Table.Cell>
									<Table.Cell>{item.email}</Table.Cell>
									<Table.Cell>{item.phone}</Table.Cell>
									<Table.Cell>{item.orderProduct?.name}</Table.Cell>
									<Table.Cell>
										<Dropdown>
											<Dropdown.Button className={styles.dropdownButtonFlat}>
												{item.status}
											</Dropdown.Button>
											<Dropdown.Menu
												disallowEmptySelection
												selectionMode='single'
												selectedKeys={item.status}
											>
												<Dropdown.Item key='NEW'>Новый</Dropdown.Item>
												<Dropdown.Item key='MAKING'>Готовится</Dropdown.Item>
												<Dropdown.Item key='WAITING'>Ожидает</Dropdown.Item>
												<Dropdown.Item key='DISPATCHED'>
													Отправлен
												</Dropdown.Item>
												<Dropdown.Item key='RECEIVED'>Получен</Dropdown.Item>
												<Dropdown.Item key='CANCELED'>Отменен</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</Table.Cell>
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
							))}
						</Table.Body>
					</Table>
				</Grid>
			</Grid.Container>
		</>
	)
}

export default Orders
