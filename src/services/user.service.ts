import { ILoginPassword } from '@/store/user/user.interface'

import { INewPassword, IUser } from '@/types/user.interface'

import { axiosAuth } from '@/api/api.interceptor'

const USERS_URL = 'users'

export const UserService = {
	async getAll() {
		return axiosAuth.get<IUser[]>(USERS_URL)
	},

	async create(data: ILoginPassword) {
		return axiosAuth.post<IUser>(USERS_URL, data)
	},

	async setNewPassword(data: INewPassword) {
		return axiosAuth.patch<IUser>(`${USERS_URL}/${data.id}`, {
			newPassword: data.newPassword
		})
	},

	async delete(id: number) {
		return axiosAuth.delete<IUser>(`${USERS_URL}/${id}`)
	}
}
