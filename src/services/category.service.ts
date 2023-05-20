import { ICategory } from '@/types/category.interface'

import { axiosAuth, axiosClassic } from '@/api/api.interceptor'

export interface ICreateCategory {
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
		return axiosAuth.get<ICategory>(`${CATEGORIES_URL}/${id}`)
	},

	async create(data: ICreateCategory) {
		return axiosAuth.post<ICategory>(CATEGORIES_URL, data)
	},

	async update(data: ICategory) {
		return axiosAuth.put<ICategory>(`${CATEGORIES_URL}/${data.id}`, data)
	},

	async delete(id: number) {
		return axiosAuth.delete<ICategory>(`${CATEGORIES_URL}/${id}`)
	}
}
