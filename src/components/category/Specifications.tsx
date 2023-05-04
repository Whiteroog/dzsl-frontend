import { Table } from '@nextui-org/react'
import { FC } from 'react'

import { TypeSpecifications } from '@/types/product.interface'

interface ISpecificationsProps {
	specifications: TypeSpecifications[]
}

const Specifications: FC<ISpecificationsProps> = ({ specifications }) => {
	return (
		<div className='w-full max-w-[480px]'>
			<h3 className='my-2 text-center text-lg'>Технические характеристики</h3>
			<Table shadow={false} bordered={false}>
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
