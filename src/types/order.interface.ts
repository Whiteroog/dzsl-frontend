export enum EnumOrderStatus {
	NEW = 'NEW',
	MAKING = 'MAKING',
	WAITING = 'WAITING',
	DISPATCHED = 'DISPATCHED',
	RECEIVED = 'RECEIVED',
	CANCELED = 'CANCELED'
}

export interface IOrder {
	id: number
	createdAt: string
	fullName: string
	email: string
	phone: string
	totalPrice: number
	status: EnumOrderStatus
	orderProducts: IOrderProduct[]
}

export interface IOrderProduct {
	id: number
	name: string
	category: string
	quantity: number
	price: number

	orderProductItems: IOrderProductItem[]
}

export interface IOrderProductItem {
	id: number
	name: string
	quantity: number
	price: number
}

export const testOrders: IOrder[] = [
	{
		id: 1,
		createdAt: '09/05/23',
		fullName: 'Иванов Иван',
		email: 'ivan@mail.ru',
		phone: '7923423423',
		totalPrice: 56500,
		status: EnumOrderStatus.NEW,
		orderProducts: [
			{
				id: 1,
				name: 'ЛРСП-40',
				category: 'Строительные леса',
				quantity: 1,
				price: 10_000,
				orderProductItems: []
			}
		]
	}
]
