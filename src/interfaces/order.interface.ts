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

	total: number

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
