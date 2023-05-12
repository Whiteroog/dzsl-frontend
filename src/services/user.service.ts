import { ILoginPassword } from '@/store/user/user.interface'

import { IUser } from '@/types/user.interface'

import { axiosAuth } from '@/api/api.interceptor'

const USERS_URL = 'users'

export const UserService = {
	async getAll() {
		return axiosAuth.get<IUser[]>(USERS_URL)
	},

	async create(data: ILoginPassword) {
		return axiosAuth.post<IUser>(USERS_URL, data)
	},

	async setNewPassword(id: string, newPassword: string) {
		return axiosAuth.patch<IUser>(`${USERS_URL}/${id}`, { newPassword })
	},

	async delete(id: string) {
		return axiosAuth.delete<IUser>(`${USERS_URL}/${id}`)
	}
}
