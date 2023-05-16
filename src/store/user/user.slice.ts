import { createSlice } from '@reduxjs/toolkit'

import { getStoreLocal } from '@/utils/local-storage'

import { checkAuth, login, logout } from './user.actions'
import { IUserState } from './user.interface'

const initialState: IUserState = {
	user: getStoreLocal('user'),
	status: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.status = 200
			})
			.addCase(login.rejected, state => {
				state.user = null
				state.status = 404
			})
			.addCase(logout.fulfilled, state => {
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})

export const { reducer } = userSlice
