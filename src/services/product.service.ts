import { IProduct } from '@/types/product.interface'

import { axiosAuth, axiosClassic } from '@/api/api.interceptor'

export type TypeProductData = {
	name: string
	slug: string
	price: number
	image: string
	description: string
	category: TypeCategoryData
	specifications?: TypeSpecificationsData[]
	productItems?: TypeProductItemData[]
}

export type TypeSpecificationsData = {
	id?: number
	name: string
	value: number
}

export type TypeProductItemData = {
	id?: number
	name: string
	quantity: number
	price: number
}

export type TypeCategoryData = {
	id?: number
	name: string
	slug: string
}

export type TypeUpdateProductData = {
	product: TypeProductData

	createSpecifications?: TypeSpecificationsData[]
	updateSpecifications?: TypeSpecificationsData[]
	deleteSpecifications?: TypeSpecificationsData[]

	createProductItems?: TypeProductItemData[]
	updateProductItems?: TypeProductItemData[]
	deleteProductItems?: TypeProductItemData[]
}

const PRODUCTS_URL = 'products'

export const ProductService = {
	async getAll() {
		return axiosClassic.get<IProduct[]>(PRODUCTS_URL)
	},

	async getByCategory(categorySlug: string) {
		return axiosClassic.get<IProduct[]>(
			`${PRODUCTS_URL}/by-category/${categorySlug}`
		)
	},

	async getBySlug(slug: string) {
		return axiosAuth.get<IProduct>(`${PRODUCTS_URL}/by-slug/${slug}`)
	},

	async getById(id: number) {
		return axiosAuth.get<IProduct>(`${PRODUCTS_URL}/${id}`)
	},

	async create(data: TypeProductData) {
		return axiosAuth.post<IProduct>(PRODUCTS_URL, data)
	},

	async update(id: number, data: TypeUpdateProductData) {
		return axiosAuth.put<IProduct>(`${PRODUCTS_URL}/${id}`, data)
	},

	async delete(id: number) {
		return axiosAuth.delete<IProduct>(`${PRODUCTS_URL}/${id}`)
	}
}
