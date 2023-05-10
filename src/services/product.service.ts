import {
	IProduct,
	IProductItem,
	ISpecifications
} from '@/types/product.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

export type TypeProductData = {
	name: string
	slug: string
	price: number
	image: string
	description: string
	categoryId: number
}

export type TypeSpecificationsData = {
	name: string
	value: number
}

export type TypeProductItemData = {
	name: string
	quantity: number
	price: number
}

const PRODUCTS = 'products'

const SPECIFICATIONS = `${PRODUCTS}/specifications`

const PRODUCT_ITEM = `${PRODUCTS}/product-item`

export const ProductService = {
	async getAll() {
		return axiosClassic<IProduct[]>({
			url: PRODUCTS,
			method: 'GET'
		})
	},

	async getProductsByCategory(categorySlug: string) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/${categorySlug}`,
			method: 'GET'
		})
	},

	async getProductsBySlug(slug: string) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${slug}`,
			method: 'GET'
		})
	},

	async getProductsById(id: string) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'GET'
		})
	},

	async createProduct() {
		return instance<IProduct>({
			url: PRODUCTS,
			method: 'POST'
		})
	},

	async updateProduct(id: string, data: TypeProductData) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data
		})
	},

	async deleteProduct(id: string) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'DELETE'
		})
	},

	async createSpecifications(productId: string) {
		return instance<ISpecifications>({
			url: `${SPECIFICATIONS}/${productId}`,
			method: 'POST'
		})
	},

	async updateSpecifications(id: string, data: TypeSpecificationsData) {
		return instance<ISpecifications>({
			url: `${SPECIFICATIONS}/${id}`,
			method: 'PUT',
			data
		})
	},

	async deleteSpecifications(id: string) {
		return instance<ISpecifications>({
			url: `${SPECIFICATIONS}/${id}`,
			method: 'DELETE'
		})
	},

	async createProductItem(productId: string) {
		return instance<IProductItem>({
			url: `${PRODUCT_ITEM}/${productId}`,
			method: 'POST'
		})
	},

	async updateProductItem(id: string, data: TypeProductItemData) {
		return instance<IProductItem>({
			url: `${PRODUCT_ITEM}/${id}`,
			method: 'PUT',
			data
		})
	},

	async deleteProductItem(id: string) {
		return instance<IProductItem>({
			url: `${PRODUCT_ITEM}/${id}`,
			method: 'DELETE'
		})
	}
}
