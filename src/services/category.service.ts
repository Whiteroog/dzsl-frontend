import { ICategory } from '@/types/category.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

export type TypeCategoryData = {
	name: string
	slug: string
}

const CATEGORIES = 'categories'

export const CategoryService = {
	async getAll() {
		return axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async getById(id: string) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		})
	},

	async create() {
		return instance<ICategory>({
			url: CATEGORIES,
			method: 'POST'
		})
	},

	async update(id: string, data: TypeCategoryData) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data
		})
	},

	async delete(id: string) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})
	}
}
