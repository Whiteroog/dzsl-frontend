import { Button, Dropdown, Table } from '@nextui-org/react'
import { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import styles from './Table.module.scss'
import { testOrders } from '@/interfaces/order.interface'

const OrdersTable: FC = () => {
	return (
		<Table
			bordered={true}
			borderWeight='light'
			shadow={false}
			lined={true}
			lineWeight='light'
			className={styles.table}
		>
			<Table.Header>
				<Table.Column width={80}>Id</Table.Column>
				<Table.Column>ф и о</Table.Column>
				<Table.Column>Email</Table.Column>
				<Table.Column>Телефон</Table.Column>
				<Table.Column>Сумма</Table.Column>
				<Table.Column>Статус</Table.Column>
				<Table.Column hideHeader={true} width={100}>
					Действия
				</Table.Column>
			</Table.Header>
			<Table.Body>
				{testOrders.map(order => (
					<Table.Row>
						<Table.Cell>{order.id}</Table.Cell>
						<Table.Cell>{order.fullName}</Table.Cell>
						<Table.Cell>{order.email}</Table.Cell>
						<Table.Cell>{order.phone}</Table.Cell>
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
									<Dropdown.Item key='DISPATCHED'>Отправлен</Dropdown.Item>
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
	)
}

export default OrdersTable
