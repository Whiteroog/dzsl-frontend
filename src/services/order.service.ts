import { EnumOrderStatus, IOrder } from '@/types/order.interface'

import { axiosAuth } from '@/api/api.interceptor'

export type TypeOrderData = {
	fullName: string
	email: string
	phone: string
	totalPrice: number
	orderProduct: TypeOrderProduct
}

export type TypeOrderProduct = {
	name: string
	category: string
	quantity: number
	price: number
	orderProductItems: TypeOrderProductItem[]
}

export type TypeOrderProductItem = {
	name: string
	quantity: number
	price: number
}

const ORDERS_URL = 'orders'

export const OrderService = {
	async getAll() {
		return axiosAuth.get<IOrder[]>(ORDERS_URL)
	},

	async getById(id: number) {
		return axiosAuth.get<IOrder>(`${ORDERS_URL}/${id}`)
	},

	async updateStatus(id: number, status: EnumOrderStatus) {
		return axiosAuth.patch<IOrder>(`${ORDERS_URL}/${id}`, { status })
	},

	async create(data: TypeOrderData) {
		return axiosAuth.post<IOrder>(ORDERS_URL, data)
	}
}
