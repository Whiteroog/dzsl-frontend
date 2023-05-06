import Cookies from 'js-cookie'

import { IAuthResponse, ITokens } from '@/store/user/user.interface'

import { Auth } from '@/types/Types'

export const getAccessToken = () => {
	const accessToken = Cookies.get(Auth.ACCESS_TOKEN)
	return accessToken || null
}

export const getUserFromStorage = () => {
	return JSON.parse(localStorage.getItem(Auth.USER) || '{}')
}

export const saveTokensStorage = (data: ITokens) => {
	Cookies.set(Auth.ACCESS_TOKEN, data.accessToken)
	Cookies.set(Auth.REFRESH_TOKEN, data.refreshToken)
}

export const removeFromStorage = () => {
	Cookies.remove(Auth.ACCESS_TOKEN)
	Cookies.remove(Auth.REFRESH_TOKEN)
	localStorage.removeItem(Auth.USER)
}

export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem(Auth.USER, JSON.stringify(data.user))
}
