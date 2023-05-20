import { EnumOrderStatus, IOrder, IOrderProduct } from '@/types/order.interface'

import { axiosAuth, axiosClassic } from '@/api/api.interceptor'

export interface ICreateOrder {
	fullName: string
	email: string
	phone: string
	totalPrice: number
	orderProduct: IOrderProduct
}

const ORDERS_URL = 'orders'

export const OrderService = {
	async getAll() {
		return axiosAuth.get<IOrder[]>(ORDERS_URL)
	},

	async getById(id: number) {
		return axiosAuth.get<IOrder>(`${ORDERS_URL}/${id}`)
	},

	async updateStatus(data: { id: number; status: EnumOrderStatus }) {
		return axiosAuth.patch<IOrder>(`${ORDERS_URL}/${data.id}`, {
			status: data.status
		})
	},

	async create(data: ICreateOrder) {
		return axiosClassic.post<IOrder>(ORDERS_URL, data)
	}
}
