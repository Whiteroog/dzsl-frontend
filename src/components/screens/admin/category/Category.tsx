import { Button, Grid, Input, Table } from '@nextui-org/react'
import { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import { testCategory } from '@/types/category.interface'

import styles from '../tables/Table.module.scss'

const Category: FC = () => {
	return (
		<>
			<h1 className='ml-[17%]'>Категории</h1>
			<div className='flex items-end justify-between'>
				<Input size='sm' type='search' label='Поиск' width='250px' />
				<Button auto>Создать</Button>
			</div>
			<Grid.Container className='mt-2' gap={2}>
				<Grid xs={12} direction='column' className='w-full'>
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
							{testCategory.map(category => (
								<Table.Row key={category.id}>
									<Table.Cell>{category.id}</Table.Cell>
									<Table.Cell>{category.name}</Table.Cell>
									<Table.Cell>{category.slug}</Table.Cell>
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
							))}
						</Table.Body>
					</Table>
				</Grid>
			</Grid.Container>
		</>
	)
}

export default Category
