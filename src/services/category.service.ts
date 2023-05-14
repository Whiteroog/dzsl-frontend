import { ICategory } from '@/types/category.interface'

import { axiosAuth, axiosClassic } from '@/api/api.interceptor'

export type TypeCategoryData = {
	name: string
	slug: string
}

const CATEGORIES_URL = 'categories'

export const CategoryService = {
	async getAll() {
		return axiosClassic.get<ICategory[]>(CATEGORIES_URL)
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<ICategory>(`${CATEGORIES_URL}/by-slug/${slug}`)
	},

	async getById(id: number) {
		return axiosAuth<ICategory>(`${CATEGORIES_URL}/${id}`)
	},

	async create() {
		return axiosAuth.post<ICategory>(CATEGORIES_URL)
	},

	async update(id: number, data: TypeCategoryData) {
		return axiosAuth.put<ICategory>(`${CATEGORIES_URL}/${id}`, data)
	},

	async delete(id: number) {
		return axiosAuth.delete<ICategory>(`${CATEGORIES_URL}/${id}`)
	}
}
