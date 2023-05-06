import { IUser } from '@/interfaces/user.interface'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}

export interface IUserState {
	login: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}
