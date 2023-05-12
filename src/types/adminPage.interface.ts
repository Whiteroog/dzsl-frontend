export interface IAdminPage {
	name: string
	slug: string
}

export const admin: IAdminPage[] = [
	{
		name: 'Продукция',
		slug: 'products'
	},
	{
		name: 'Категории',
		slug: 'category'
	},
	{
		name: 'Заказы',
		slug: 'orders'
	},
	{
		name: 'Пользователи',
		slug: 'users'
	}
]
