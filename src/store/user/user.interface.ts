import { IUser } from '@/types/user.interface'

export interface ILoginPassword {
	login: string
	password: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}

export interface IUserState {
	user: IUser | null
	status: number | null
}
