export interface IProduct {
	id: number
	name: string
	slug: string
	specifications: TypeSpecifications[]
	description: string
	price: number
	imageName: string
}

export type TypeSpecifications = {
	name: string
	value: string
}

export const testDataProducts: IProduct[] = [
	{
		id: 1,
		name: 'ЛРСП-30',
		slug: 'lrsp-30',
		specifications: [
			{
				name: 'Высота',
				value: '1.8м'
			},
			{
				name: 'Длина',
				value: '2.4м'
			},
			{
				name: 'Макс. нагрузка',
				value: '200кг'
			}
		],
		description:
			'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
		price: 15000,
		imageName: 'lrsp-30.jpg'
	},
	{
		id: 2,
		name: 'ЛРСП-40',
		slug: 'lrsp-40',
		specifications: [
			{
				name: 'Высота',
				value: '2м'
			},
			{
				name: 'Длина',
				value: '2.6м'
			},
			{
				name: 'Макс. нагрузка',
				value: '200кг'
			}
		],
		description:
			'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.',
		price: 18000,
		imageName: 'lrsp-40.jpg'
	}
]
