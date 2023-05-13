import { Button, Dropdown, Grid, Input, Table } from '@nextui-org/react'
import { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import { testOrders } from '@/types/order.interface'

import styles from '../tables/Table.module.scss'

const Orders: FC = () => {
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
							<Table.Column>Кол-во</Table.Column>
							<Table.Column>Сумма</Table.Column>
							<Table.Column>Статус</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{testOrders.map(order => (
								<Table.Row key={order.id}>
									<Table.Cell>{order.id}</Table.Cell>
									<Table.Cell>{order.createdAt}</Table.Cell>
									<Table.Cell>{order.fullName}</Table.Cell>
									<Table.Cell>{order.email}</Table.Cell>
									<Table.Cell>{order.phone}</Table.Cell>
									<Table.Cell>{order.orderProduct.name}</Table.Cell>
									<Table.Cell>{order.orderProduct.quantity}</Table.Cell>
									<Table.Cell>{order.totalPrice}</Table.Cell>
									<Table.Cell>
										<Dropdown>
											<Dropdown.Button className={styles.dropdownButtonFlat}>
												Новый
											</Dropdown.Button>
											<Dropdown.Menu
												disallowEmptySelection
												selectionMode='single'
												selectedKeys='NEW'
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
