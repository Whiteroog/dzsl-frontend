import { ICategory } from '@/types/category.interface'
import {
	IProduct,
	IProductItem,
	ISpecifications
} from '@/types/product.interface'

import { axiosAuth, axiosClassic } from '@/api/api.interceptor'

export interface ICreateProduct {
	name: string
	slug: string
	price: number
	image: string
	description: string
	category: ICategory
	specifications?: ISpecifications[]
	productItems?: IProductItem[]
}

export interface IUpdateProduct {
	product: ICreateProduct

	createSpecifications?: ISpecifications[]
	updateSpecifications?: ISpecifications[]
	deleteSpecifications?: ISpecifications[]

	createProductItems?: IProductItem[]
	updateProductItems?: IProductItem[]
	deleteProductItems?: IProductItem[]
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
		return axiosClassic.get<IProduct>(`${PRODUCTS_URL}/by-slug/${slug}`)
	},

	async getById(id: number) {
		return axiosAuth.get<IProduct>(`${PRODUCTS_URL}/${id}`)
	},

	async create(data: ICreateProduct) {
		return axiosAuth.post<IProduct>(PRODUCTS_URL, data)
	},

	async update(id: number, data: IUpdateProduct) {
		return axiosAuth.put<IProduct>(`${PRODUCTS_URL}/${id}`, data)
	},

	async delete(id: number) {
		return axiosAuth.delete<IProduct>(`${PRODUCTS_URL}/${id}`)
	}
}
