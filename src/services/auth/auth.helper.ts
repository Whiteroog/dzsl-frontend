import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

import { EnumAuth } from '@/types/auth.enum'

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumAuth.ACCESS_TOKEN)
	return accessToken || null
}

export const getRefreshToken = () => {
	const refreshToken = Cookies.get(EnumAuth.REFRESH_TOKEN)
	return refreshToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem(EnumAuth.USER) || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(EnumAuth.ACCESS_TOKEN, data.accessToken)
	Cookies.set(EnumAuth.REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove(EnumAuth.ACCESS_TOKEN)
	Cookies.remove(EnumAuth.REFRESH_TOKEN)
	localStorage.removeItem(EnumAuth.USER)
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem(EnumAuth.USER, JSON.stringify(data.user))
}
