import Cookies from 'js-cookie'

import { IAuthResponse, ILoginPassword } from '@/store/user/user.interface'

import { EnumAuth } from '@/types/auth.enum'

import { axiosClassic } from '@/api/api.interceptor'

import { saveToStorage } from './auth.helper'

const LOGIN_URL = '/auth/login'
const ACCESS_TOKEN_URL = '/auth/login/access-token'

export const AuthService = {
	async login(data: ILoginPassword) {
		const response = await axiosClassic.post<IAuthResponse>(LOGIN_URL, data)

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get(EnumAuth.REFRESH_TOKEN)

		const response = await axiosClassic.post<IAuthResponse>(ACCESS_TOKEN_URL, {
			refreshToken
		})

		if (response.data.accessToken) saveToStorage(response.data)

		return response
	}
}
