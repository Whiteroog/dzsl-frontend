import { Button, Checkbox, Grid, Input, Table } from '@nextui-org/react'
import { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import { testCategory } from '@/types/category.interface'
import { testProducts } from '@/types/product.interface'

import styles from '../tables/Table.module.scss'

const Products: FC = () => {
	return (
		<>
			<h1 className='ml-[17%]'>Продукция</h1>
			<div className='flex items-end justify-between'>
				<Input size='sm' type='search' label='Поиск' width='250px' />
				<Button auto>Создать</Button>
			</div>
			<Grid.Container className='mt-2' gap={2}>
				<Grid xs={2} direction='column'>
					<h2 className='text-center'>Фильтр</h2>
					<div>
						<Checkbox.Group label='Категории'>
							{testCategory.map(category => (
								<Checkbox key={category.id} value={String(category.id)}>
									{category.name}
								</Checkbox>
							))}
						</Checkbox.Group>
					</div>
				</Grid>

				<Grid xs={10} direction='column' className='w-full'>
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
							<Table.Column>Категория</Table.Column>
							<Table.Column>Цена</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{testProducts.map(product => (
								<Table.Row key={product.id}>
									<Table.Cell>{product.id}</Table.Cell>
									<Table.Cell>{product.name}</Table.Cell>
									<Table.Cell>{product.slug}</Table.Cell>
									<Table.Cell>{product.category.name}</Table.Cell>
									<Table.Cell>{product.price}</Table.Cell>
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

export default Products
