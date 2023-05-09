import { Button, Checkbox, Grid, Input } from '@nextui-org/react'
import { FC } from 'react'

import { adminLinks } from '@/links/Links'

interface IContextProps {
	slug: string | string[] | undefined
}

const Context: FC<IContextProps> = ({ slug }) => {
	const title = adminLinks.find(link => link.slug === slug)?.name

	return (
		<>
			<h1 className='ml-[17%]'>{title}</h1>
			<div className='flex items-end justify-between'>
				<Input size='sm' type='search' label='Поиск' width='250px' />
				<Button auto>Создать</Button>
			</div>
			<Grid.Container className='mt-2 grow' gap={2}>
				<Grid className='border' xs={2} direction='column'>
					<h2 className='text-center'>Фильтр</h2>
					<div>
						<div>
							<Checkbox.Group label='Категории'>
								<Checkbox value='scaffolding'>Строительные леса</Checkbox>
								<Checkbox value='tour-tower'>Вышки-туры</Checkbox>
							</Checkbox.Group>
						</div>
					</div>
				</Grid>
				<Grid className='border' xs={10}>
					Таблица
				</Grid>
			</Grid.Container>
		</>
	)
}

export default Context
