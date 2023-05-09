import { Button, Checkbox, Grid, Input, Table } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import styles from './Table.module.scss'
import { adminLinks } from '@/links/Links'

const Context: FC = () => {
	const slug = useRouter().query.slug
	const title = adminLinks.find(link => link.slug === slug)?.name

	return (
		<>
			<h1 className='ml-[17%]'>{title}</h1>
			<div className='flex items-end justify-between'>
				<Input size='sm' type='search' label='Поиск' width='250px' />
				<Button auto>Создать</Button>
			</div>
			<Grid.Container className='mt-2' gap={2}>
				<Grid xs={2} direction='column'>
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
				<Grid xs={10} direction='column'>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						lined={true}
						lineWeight='light'
						className={styles.table}
					>
						<Table.Header>
							<Table.Column width={80}>Id</Table.Column>
							<Table.Column>Название</Table.Column>
							<Table.Column>Slug</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							<Table.Row>
								<Table.Cell>1</Table.Cell>
								<Table.Cell>Строительные леса</Table.Cell>
								<Table.Cell>scaffolding</Table.Cell>
								<Table.Cell>
									<Button
										auto
										icon={<AiOutlineEye />}
										className='button-icon'
									></Button>
									<Button
										auto
										icon={<AiOutlineEdit />}
										className='button-icon'
									></Button>
									<Button
										auto
										icon={<AiOutlineDelete color='red' />}
										className='button-icon'
									></Button>
								</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>2</Table.Cell>
								<Table.Cell>Вышки-туры</Table.Cell>
								<Table.Cell>tour-tower</Table.Cell>
								<Table.Cell>
									<Button
										auto
										icon={<AiOutlineEye />}
										className='button-icon'
									></Button>
								</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</Grid>
			</Grid.Container>
		</>
	)
}

export default Context
