export interface ICategory {
	id: number
	name: string
	slug: string
}

export const testCategory: ICategory[] = [
	{
		id: 1,
		name: 'Строительные леса',
		slug: 'scaffolding'
	},
	{
		id: 2,
		name: 'Вышки-туры',
		slug: 'tour-tower'
	}
]
