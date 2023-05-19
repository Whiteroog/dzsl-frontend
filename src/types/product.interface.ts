import { ICategory, testCategory } from './category.interface'

export interface IProduct {
	id: number
	name: string
	slug: string
	price: number
	image?: string
	description?: string
	category: ICategory
	specifications?: ISpecifications[]
	productItems?: IProductItem[]
}

export interface ISpecifications {
	id?: number
	name: string
	value: number
}

export interface IProductItem {
	id?: number
	name: string
	quantity: number
	price: number
}

export const testProducts: IProduct[] = [
	{
		id: 1,
		name: 'ЛРСП-40',
		slug: 'lrsp-40',
		price: 10_000,
		image: 'lrsp-40.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		specifications: [
			{
				id: 1,
				name: 'test1',
				value: 5
			},
			{
				id: 1,
				name: 'test2',
				value: 15
			}
		],
		productItems: [],
		category: testCategory[0]
	},
	{
		id: 2,
		name: 'ЛРСП-30',
		slug: 'lrsp-30',
		price: 12_000,
		image: 'lrsp-30.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		specifications: [
			{
				id: 1,
				name: 'test1',
				value: 5
			},
			{
				id: 1,
				name: 'test2',
				value: 15
			}
		],
		productItems: [],
		category: testCategory[0]
	},
	{
		id: 3,
		name: 'ВСП-250',
		slug: 'vsp-250',
		price: 9_000,
		image: 'vsp-250.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		specifications: [
			{
				id: 1,
				name: 'test1',
				value: 5
			},
			{
				id: 1,
				name: 'test2',
				value: 15
			}
		],
		productItems: [],
		category: testCategory[1]
	}
]
