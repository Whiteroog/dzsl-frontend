import { IProduct, IProductItem } from './product.interface'

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

	status: EnumOrderStatus

	totalPrice: number

	orderProducts: IOrderProduct[]
}

export interface IOrderProduct {
	id: number

	quantity: number
	price: number

	product: IProduct

	orderProductItems: IOrderProductItem[]
}

export interface IOrderProductItem {
	id: number

	productItem: IProductItem

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
		status: EnumOrderStatus.NEW,
		totalPrice: 56500,
		orderProducts: []
	}
]
