import { Button, Input, Table } from '@nextui-org/react'
import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai'

import { ISpecifications } from '@/types/product.interface'

import stylesTable from '../../tables/Table.module.scss'

import { IEditSpecifications, IUpdateProduct } from '@/services/product.service'

const SpecificationsForm = ({
	control,
	defaultSpecifications
}: {
	control: Control<IUpdateProduct>
	defaultSpecifications: ISpecifications[]
}) => {
	const [lastId, setLastId] = useState(
		Math.max(...(defaultSpecifications.map(item => item.id) as number[])) + 1
	)

	const [existsSpecifications, setExistsSpecifications] = useState(
		defaultSpecifications
	)

	const [editSpecifications, setEditSpecifications] =
		useState<IEditSpecifications>({
			createSpecifications: [],
			updateSpecifications: [],
			deleteSpecifications: []
		} as IEditSpecifications)

	const addFieldHandler = () => {
		editSpecifications.createSpecifications.push({
			id: lastId,
			name: '',
			value: 0
		})

		setEditSpecifications(editSpecifications)
		setLastId(lastId + 1)

		console.log(editSpecifications)

		return editSpecifications
	}

	const removeExistsFieldHandler = (field: ISpecifications) => {
		editSpecifications.deleteSpecifications.push(field)

		const filteredSpecifications = existsSpecifications.filter(
			item => item.id !== field.id
		)
		setExistsSpecifications(filteredSpecifications)

		editSpecifications.updateSpecifications =
			editSpecifications.updateSpecifications.filter(
				item => item.id !== field.id
			)

		setEditSpecifications(editSpecifications)

		return editSpecifications
	}

	const removeCreateFieldHandler = (id: number) => {
		editSpecifications.createSpecifications =
			editSpecifications.createSpecifications.filter(item => item.id !== id)
		setEditSpecifications(editSpecifications)

		return editSpecifications
	}

	const updateExistsSpecifications = (
		editedSpecifications: ISpecifications
	) => {
		let foundedExistsDataSpecifications =
			editSpecifications.updateSpecifications.find(
				item => item.id === editedSpecifications.id
			)

		if (foundedExistsDataSpecifications) {
			foundedExistsDataSpecifications = editedSpecifications
			return editSpecifications
		} else {
			editSpecifications.updateSpecifications.push(editedSpecifications)
			return editSpecifications
		}
	}

	const setInputNameExistsHandler = (
		item: ISpecifications,
		newValue: string
	) => {
		item.name = newValue
		setExistsSpecifications(existsSpecifications)

		return updateExistsSpecifications(item)
	}

	const setInputValueExistsHandler = (
		item: ISpecifications,
		newValue: string
	) => {
		item.value = Number(newValue)
		setExistsSpecifications(existsSpecifications)

		return updateExistsSpecifications(item)
	}

	const setInputNameCreatedHandler = (
		item: ISpecifications,
		newValue: string
	) => {
		item.name = newValue

		return editSpecifications
	}

	const setInputValueCreatedHandler = (
		item: ISpecifications,
		newValue: string
	) => {
		item.value = Number(newValue)

		return editSpecifications
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
							<>
								{existsSpecifications ? (
									existsSpecifications.map(item => {
										return (
											<Table.Row key={item.id}>
												<Table.Cell>
													<Input
														type='text'
														required
														value={item.name}
														onChange={newValue =>
															onChange(
																setInputNameExistsHandler(
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
																setInputValueExistsHandler(
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
															onChange(removeExistsFieldHandler(item))
														}}
													></Button>
												</Table.Cell>
											</Table.Row>
										)
									})
								) : (
									<></>
								)}
							</>
							<>
								{editSpecifications.createSpecifications ? (
									editSpecifications.createSpecifications.map(item => {
										return (
											<Table.Row key={item.id}>
												<Table.Cell>
													<Input
														type='text'
														required
														value={item.name}
														onChange={newValue =>
															onChange(
																setInputNameCreatedHandler(
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
																setInputValueCreatedHandler(
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
															onChange(removeCreateFieldHandler(item.id ?? -1))
														}}
													></Button>
												</Table.Cell>
											</Table.Row>
										)
									})
								) : (
									<></>
								)}
							</>
						</Table.Body>
					</Table>
				</div>
			)}
		/>
	)
}

export default SpecificationsForm
