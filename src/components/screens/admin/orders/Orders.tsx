import {
	Button,
	Checkbox,
	Dropdown,
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
import { AiOutlineEye } from 'react-icons/ai'

import { EnumOrderStatus, IOrder } from '@/types/order.interface'

import { getTranslatedStatus } from '@/utils/status-translate'

import stylesDropdown from '../../../ui/dropdown/Dropdown.module.scss'
import stylesTable from '../../../ui/tables/Table.module.scss'

import styles from './Orders.module.scss'
import { OrderService } from '@/services/order.service'

type OrderData = {
	items: IOrder[]
	sortDescriptor: SortDescriptor
}

const Orders: FC = () => {
	/* sort */
	const defaultSortDescriptor: SortDescriptor = {
		column: 'id',
		direction: 'descending'
	}

	const setOrdersWithParam = (
		items: IOrder[],
		sortDescriptor = orders.sortDescriptor
	) => {
		setOrders({
			items,
			sortDescriptor
		})
	}

	const sortOrders = (descriptor: SortDescriptor) => {
		const { column, direction } = descriptor
		if (!orders.items) return
		const sortedOrders = orders.items.sort((a, b) => {
			let cmp = 1
			switch (column) {
				case 'id':
					cmp = a.id - b.id
					break
				case 'date':
					const dateTimeA = new Date(a.createdAt).getTime()
					const dateTimeB = new Date(b.createdAt).getTime()
					cmp = dateTimeA - dateTimeB
					break
				case 'fullName':
					cmp = a.fullName.localeCompare(b.fullName)
					break
				case 'email':
					cmp = a.email.localeCompare(b.email)
					break
				case 'phone':
					cmp = a.phone.localeCompare(b.phone)
					break
				case 'product':
					cmp = a.orderProduct.name.localeCompare(b.orderProduct.name)
					break
				default:
					cmp = a.id - b.id
					break
			}
			if (direction === 'descending') cmp *= -1
			return cmp
		})

		setOrdersWithParam(sortedOrders, descriptor)
	}

	/* Search */
	const search = (term: string) => {
		term = term.toLowerCase()

		const searchedOrders = _orders.filter(
			item =>
				String(item.id).includes(term) ||
				new Date(item.createdAt).toLocaleDateString().includes(term) ||
				item.fullName.toLowerCase().includes(term) ||
				item.email.toLowerCase().includes(term) ||
				item.phone.includes(term) ||
				item.orderProduct.name.includes(term) ||
				getTranslatedStatus(item.status).toLowerCase().includes(term)
		)

		setOrdersWithParam(searchedOrders)
	}

	const handleKeyDown = (e: KeyboardEvent<FormElement>) => {
		if (e.key === 'Enter') {
			if (e.currentTarget.value.length === 0) {
				setOrdersWithParam(_orders)
			} else {
				search(e.currentTarget.value)
			}
		}
	}

	/* initial */
	const [_orders, _setOrders] = useState<IOrder[]>([])
	const [orders, setOrders] = useState<OrderData>({
		items: [],
		sortDescriptor: defaultSortDescriptor
	})

	/* filter by status */
	const [filterStatuses, setFilterStatuses] = useState<EnumOrderStatus[]>(
		Object.keys(EnumOrderStatus) as EnumOrderStatus[]
	)

	const filterStatusHandler = (statuses: EnumOrderStatus[]) => {
		setFilterStatuses(statuses)

		const filteredOrdersByStatus = _orders.filter(item =>
			statuses.includes(item.status)
		)

		setOrdersWithParam(filteredOrdersByStatus)
	}

	/* select status */
	const [orderStatuses, setOrderStatuses] = useState<
		Map<number, EnumOrderStatus>
	>(new Map())

	const selectionChangeHandler = (id: number, status: Set<string>) => {
		const getStatus = Array.from(status)[0] as EnumOrderStatus
		orderStatuses.set(id, getStatus)

		setOrderStatuses(new Map(orderStatuses))

		updateStatus({
			id,
			status: getStatus
		})

		_orders.find(item => item.id === id)!.status = getStatus
		_setOrders(_orders)

		orders.items.find(item => item.id === id)!.status = getStatus
		setOrdersWithParam(orders.items)
	}

	/* get all orders */
	const queryGetAllOrders = useQuery({
		queryKey: ['get all orders'],
		queryFn: OrderService.getAll,
		onSuccess(data) {
			_setOrders(data.data)
			setOrdersWithParam(data.data)

			const orderStatusMap = new Map<number, EnumOrderStatus>()

			data.data.forEach(item => {
				orderStatusMap.set(item.id, item.status)
			})

			setOrderStatuses(orderStatusMap)
		}
	})

	/* update status */
	const { mutateAsync: updateStatus } = useMutation({
		mutationKey: ['update order status'],
		mutationFn: (data: { id: number; status: EnumOrderStatus }) =>
			OrderService.updateStatus(data)
	})

	/* modal show */
	const { setVisible: setVisibleModalShow, bindings: bindingsModalShow } =
		useModal()

	/* select item */
	const [selectItem, setSelectItem] = useState<IOrder>({} as IOrder)

	return (
		<>
			<h1 className='ml-[17%]'>Заказы</h1>
			<div className='flex items-end justify-between'>
				<Input
					size='sm'
					type='search'
					label='Поиск'
					width='250px'
					onKeyDown={handleKeyDown}
				/>
				<div>
					<Checkbox.Group
						className={styles.checkboxGrouped}
						label='Статус'
						orientation='horizontal'
						value={filterStatuses}
						onChange={value => filterStatusHandler(value as EnumOrderStatus[])}
					>
						{(Object.keys(EnumOrderStatus) as EnumOrderStatus[]).map(item => (
							<Checkbox key={item} value={item}>
								{getTranslatedStatus(item)}
							</Checkbox>
						))}
					</Checkbox.Group>
				</div>
			</div>

			<Grid.Container className='mt-2' gap={2}>
				<Grid xs={12} direction='column' className='w-full'>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						lined={true}
						lineWeight='light'
						className={stylesTable.table}
						sortDescriptor={orders.sortDescriptor}
						onSortChange={sortOrders}
					>
						<Table.Header>
							<Table.Column key='id' allowsSorting>
								Id
							</Table.Column>
							<Table.Column key='date' allowsSorting>
								Дата
							</Table.Column>
							<Table.Column key='fullName' allowsSorting>
								ф и о
							</Table.Column>
							<Table.Column key='email' allowsSorting>
								Email
							</Table.Column>
							<Table.Column key='phone' allowsSorting>
								Телефон
							</Table.Column>
							<Table.Column key='product' allowsSorting>
								Товар
							</Table.Column>
							<Table.Column>Статус</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{orders ? (
								orders.items.map(item => (
									<Table.Row key={item.id}>
										<Table.Cell>{item.id}</Table.Cell>
										<Table.Cell>
											{new Date(item.createdAt).toLocaleDateString()}
										</Table.Cell>
										<Table.Cell>{item.fullName}</Table.Cell>
										<Table.Cell>{item.email}</Table.Cell>
										<Table.Cell>{item.phone}</Table.Cell>
										<Table.Cell>{item.orderProduct?.name}</Table.Cell>
										<Table.Cell>
											<Dropdown>
												<Dropdown.Button
													className={stylesDropdown.dropdownButtonFlat}
												>
													{getTranslatedStatus(
														orderStatuses.get(item.id) ?? EnumOrderStatus.NEW
													)}
												</Dropdown.Button>
												<Dropdown.Menu
													disallowEmptySelection
													selectionMode='single'
													selectedKeys={
														orderStatuses.get(item.id) ?? EnumOrderStatus.NEW
													}
													onSelectionChange={keys => {
														selectionChangeHandler(
															item.id,
															new Set(keys.valueOf() as string)
														)
													}}
												>
													<Dropdown.Item key={EnumOrderStatus.NEW}>
														Новый
													</Dropdown.Item>
													<Dropdown.Item key={EnumOrderStatus.MAKING}>
														Готовится
													</Dropdown.Item>
													<Dropdown.Item key={EnumOrderStatus.WAITING}>
														Ожидает
													</Dropdown.Item>
													<Dropdown.Item key={EnumOrderStatus.DISPATCHED}>
														Отправлен
													</Dropdown.Item>
													<Dropdown.Item key={EnumOrderStatus.RECEIVED}>
														Получен
													</Dropdown.Item>
													<Dropdown.Item key={EnumOrderStatus.CANCELED}>
														Отменен
													</Dropdown.Item>
												</Dropdown.Menu>
											</Dropdown>
										</Table.Cell>
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
					<h2 className='py-4 text-lg'>{`[${selectItem.id}] ${new Date(
						selectItem.createdAt
					).toLocaleDateString()}`}</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-stretch'>
					<div className='flex flex-col border-b border-gray border-opacity-30 pb-3'>
						<span>Id: {selectItem.id}</span>
						<span>
							Дата: {new Date(selectItem.createdAt).toLocaleDateString()}
						</span>
						<span>ф и о: {selectItem.fullName}</span>
						<span>Email: {selectItem.email}</span>
						<span>Телефон: {selectItem.phone}</span>
						<span>Статус: {getTranslatedStatus(selectItem.status)}</span>
						<span>Итоговая цена: {selectItem.totalPrice}</span>
					</div>
					<div className='flex flex-col'>
						<span className='font-bold'>Заказываемый товар</span>
						<span>Название: {selectItem.orderProduct?.name}</span>
						<span>Количество: {selectItem.orderProduct?.quantity}</span>
						<span>Цена товара: {selectItem.orderProduct?.price}</span>
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
								<Table.Column>Название</Table.Column>
								<Table.Column>Количество</Table.Column>
								<Table.Column>Цена</Table.Column>
							</Table.Header>
							<Table.Body>
								{selectItem.orderProduct?.orderProductItems ? (
									selectItem.orderProduct?.orderProductItems.map(item => (
										<Table.Row key={item.id}>
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
		</>
	)
}

export default Orders
