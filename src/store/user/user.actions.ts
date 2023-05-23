import { createAsyncThunk } from '@reduxjs/toolkit'

import { IAuthResponse, ILoginPassword } from './user.interface'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

/* login */
export const login = createAsyncThunk<IAuthResponse, ILoginPassword>(
	'auth/login',
	async (data, thunkApi) => {
		try {
			const response = await AuthService.login(data)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

/* logout */
export const logout = createAsyncThunk('auth/logout', async () => {
	removeFromStorage()
})

/* checkAuth */
export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response = await AuthService.getNewTokens()

			return response.data
		} catch (error) {
			removeFromStorage()
			thunkApi.dispatch(logout())
			return thunkApi.rejectWithValue(error)
		}
	}
)
