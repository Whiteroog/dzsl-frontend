import { IUser } from '@/types/user.interface'

import { instance } from '@/api/api.interceptor'

export type TypeUserData = {
	login: string
	password: string
}

const USERS = 'users'

export const UserService = {
	async getAll() {
		return instance<IUser[]>({
			url: USERS,
			method: 'GET'
		})
	},

	async create(data: TypeUserData) {
		return instance<IUser>({
			url: USERS,
			method: 'POST',
			data
		})
	},

	async setNewPassword(id: string, newPassword: string) {
		return instance<IUser>({
			url: `${USERS}/${id}`,
			method: 'PATCH',
			data: { newPassword }
		})
	},

	async delete(id: string) {
		return instance<IUser>({
			url: `${USERS}/${id}`,
			method: 'DELETE'
		})
	}
}
