import { EnumOrderStatus, IOrder } from '@/types/order.interface'

import { instance } from '@/api/api.interceptor'

export type TypeOrderData = {
	fullName: string
	email: string
	phone: string

	totalPrice: number
}

export type TypeOrderProductData = {
	name: string
	category: string
	quantity: number
	price: number
}

export type TypeOrderProductItemData = {
	name: string

	quantity: number
	price: number
}

const ORDERS = 'products'

const ORDERS_PRODUCT = `${ORDERS}/product`

const ORDERS_PRODUCT_ITEM = `${ORDERS_PRODUCT}/item`

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		})
	},

	async getOrdersById(id: string) {
		return instance<IOrder>({
			url: `${ORDERS}/${id}`,
			method: 'GET'
		})
	},

	async updateOrderStatus(id: string, status: EnumOrderStatus) {
		return instance<IOrder>({
			url: `${ORDERS}/${id}`,
			method: 'PATCH',
			data: { status }
		})
	},

	async createOrder(data: TypeOrderData) {
		return instance<IOrder>({
			url: ORDERS,
			method: 'POST',
			data
		})
	},

	async createOrderProduct(orderId: string, data: TypeOrderProductData) {
		return instance<IOrder>({
			url: `${ORDERS_PRODUCT}/${orderId}`,
			method: 'POST',
			data
		})
	},

	async createOrderProductItem(
		orderProductId: string,
		data: TypeOrderProductItemData
	) {
		return instance<IOrder>({
			url: `${ORDERS_PRODUCT_ITEM}/${orderProductId}`,
			method: 'POST',
			data
		})
	}
}
