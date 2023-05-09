import { Button, Table } from '@nextui-org/react'
import { FC } from 'react'
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'

import styles from './Table.module.scss'
import { testProducts } from '@/interfaces/product.interface'

const ProductTable: FC = () => {
	return (
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
					<Table.Row>
						<Table.Cell>{product.id}</Table.Cell>
						<Table.Cell>{product.name}</Table.Cell>
						<Table.Cell>{product.slug}</Table.Cell>
						<Table.Cell>{product.category}</Table.Cell>
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
	)
}

export default ProductTable
