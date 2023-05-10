import Cookies from 'js-cookie'

import { IAuthResponse, ILoginPassword } from '@/store/user/user.interface'

import { EnumAuth } from '@/types/auth.enum'

import { axiosClassic } from '@/api/api.interceptor'

import { saveToStorage } from './auth.helper'

export const AuthService = {
	async main(type: 'login' | 'register', data: ILoginPassword) {
		const response = await axiosClassic<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(EnumAuth.REFRESH_TOKEN)

		const response = await axiosClassic.post<string, { data: IAuthResponse }>(
			'/auth/login/access-token',
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}
