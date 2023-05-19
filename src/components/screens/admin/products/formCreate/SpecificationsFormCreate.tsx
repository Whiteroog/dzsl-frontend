import { Button, Input, Table } from '@nextui-org/react'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai'

import { ISpecifications } from '@/types/product.interface'

import stylesTable from '../../tables/Table.module.scss'

import { ICreateProduct } from '@/services/product.service'

const SpecificationsFormCreate = ({
	control,
	lastIdSpecifications
}: {
	control: Control<ICreateProduct>
	lastIdSpecifications: number
}) => {
	const [lastId, setLastId] = useState(lastIdSpecifications + 1)
	const [specifications, setSpecifications] = useState<ISpecifications[]>([])

	const setInputNameHandler = (item: ISpecifications, newValue: string) => {
		item.name = newValue
		setSpecifications(specifications)
		return specifications
	}
	const setInputValueHandler = (item: ISpecifications, newValue: string) => {
		const valueNumber = Number(newValue)

		item.value = valueNumber
		setSpecifications(specifications)
		return specifications
	}

	const addFieldHandler = () => {
		specifications.push({ id: lastId, name: '', value: 0 })
		setSpecifications(specifications)
		setLastId(lastId + 1)

		return specifications
	}

	const removeFieldHandler = (id: number) => {
		const filteredSpecifications = specifications.filter(item => item.id !== id)
		setSpecifications(filteredSpecifications)

		return specifications
	}

	return (
		<Controller
			control={control}
			name='specifications'
			render={({ field: { value, onChange } }) => (
				<div className='w-full'>
					<div className='flex items-center justify-between py-4'>
						<span className='font-bold'>Технические характеристики</span>
						<Button
							auto
							size='sm'
							onClick={() => {
								onChange(addFieldHandler())
							}}
						>
							Добавить
						</Button>
					</div>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						headerLined={true}
						lineWeight='light'
						lined={true}
						className={stylesTable.tableWithoutActions}
					>
						<Table.Header>
							<Table.Column>Название</Table.Column>
							<Table.Column>Значение</Table.Column>
							<Table.Column hideHeader={true}>Удалить</Table.Column>
						</Table.Header>
						<Table.Body>
							{specifications ? (
								specifications.map(item => {
									return (
										<Table.Row key={item.id}>
											<Table.Cell>
												<Input
													type='text'
													required
													value={item.name}
													onChange={newValue =>
														onChange(
															setInputNameHandler(
																item,
																newValue.currentTarget.value
															)
														)
													}
												/>
											</Table.Cell>
											<Table.Cell>
												<Input
													type='number'
													required
													value={item.value}
													onChange={newValue =>
														onChange(
															setInputValueHandler(
																item,
																newValue.currentTarget.value
															)
														)
													}
												/>
											</Table.Cell>
											<Table.Cell>
												<Button
													auto
													icon={<AiOutlineDelete color='red' />}
													className='button-icon'
													onClick={() => {
														onChange(removeFieldHandler(item.id ?? -1))
													}}
												></Button>
											</Table.Cell>
										</Table.Row>
									)
								})
							) : (
								<></>
							)}
						</Table.Body>
					</Table>
				</div>
			)}
		/>
	)
}

export default SpecificationsFormCreate
