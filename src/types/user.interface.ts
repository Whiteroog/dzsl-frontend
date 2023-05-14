export interface IUser {
	id: number
	login: string
}

export interface INewPassword {
	id: number
	newPassword: string
}

export const testUsers: IUser[] = [
	{
		id: 1,
		login: 'user1'
	},
	{
		id: 2,
		login: 'user2'
	}
]
