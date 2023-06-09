import axios from 'axios'
import { toastr } from 'react-redux-toastr'

import { errorCatch, getContentType } from './api.helper'
import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

const axiosOptions = {
	baseURL: process.env.SERVER_URL,
	headers: getContentType()
}

export const axiosClassic = axios.create(axiosOptions)
export const axiosAuth = axios.create(axiosOptions)

axiosAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config && config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosAuth.interceptors.response.use(
	config => config,
	async error => {
		// полученный запрос
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewTokens()

				// необработанный запрос
				return axiosAuth.request(originalRequest)
			} catch (error) {
				toastr.error('Ошибка авторизации', 'Ошибка: ' + errorCatch(error))
				removeFromStorage()
			}
		}

		throw error
	}
)
