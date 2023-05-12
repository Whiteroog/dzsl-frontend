import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@/types/user.interface'

import { getStoreLocal } from '@/utils/local-storage'

import { checkAuth, login, logout } from './user.actions'

const initialState: { user: IUser | null } = {
	user: getStoreLocal('user')
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
			.addCase(login.rejected, state => {
				state.user = null
			})
			.addCase(logout.fulfilled, state => {
				state.user = null
			})
			.addCase(checkAuth.fulfilled, (state, { payload }) => {
				state.user = payload.user
			})
	}
})
