import { Table } from '@nextui-org/react'
import { FC } from 'react'

import { ISpecifications } from '@/types/product.interface'

import stylesTable from '../tables/Table.module.scss'

interface ISpecificationsProps {
	specifications: ISpecifications[]
}

const Specifications: FC<ISpecificationsProps> = ({ specifications }) => {
	return (
		<div className='w-full max-w-[480px]'>
			<h3 className='py-2 text-center text-lg font-medium'>
				Технические характеристики
			</h3>
			<Table
				bordered={true}
				borderWeight='light'
				shadow={false}
				headerLined={true}
				lineWeight='light'
				lined={true}
				className={stylesTable.tableFontBs}
			>
				<Table.Header>
					<Table.Column>Название</Table.Column>
					<Table.Column>Значение</Table.Column>
				</Table.Header>
				<Table.Body>
					{specifications.map((spec, index) => (
						<Table.Row key={index}>
							<Table.Cell>{spec.name}</Table.Cell>
							<Table.Cell>{spec.value}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	)
}

export default Specifications
