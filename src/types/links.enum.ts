export enum EnumLinks {
	PRODUCTS = '/products/category/',
	DETAIL = '/products/product-detail/',
	ABOUT_US = '/about-us',
	DELIVERY = '/delivery',
	CONTACTS = '/contacts',
	IMAGES = 'http://localhost:3000/images/',
	ADMIN_PANEL = 'admin/panel/',
	LOGOUT = 'admin/login/'
}

export interface IAdminLinks {
	name: string
	slug: string
}

export const adminLinks: IAdminLinks[] = [
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
