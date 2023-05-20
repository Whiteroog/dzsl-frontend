import {
	Button,
	FormElement,
	Grid,
	Input,
	Modal,
	SortDescriptor,
	Table,
	useModal
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, KeyboardEvent, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineDelete } from 'react-icons/ai'
import { toastr } from 'react-redux-toastr'

import { ILoginPassword } from '@/store/user/user.interface'

import { useAuth } from '@/hooks/useAuth'

import { INewPassword, IUser } from '@/types/user.interface'

import stylesTable from '../../../ui/tables/Table.module.scss'

import { UserService } from '@/services/user.service'

type UserData = {
	items: IUser[]
	sortDescriptor: SortDescriptor
}

const Users: FC = () => {
	/* sort */
	const defaultSortDescriptor: SortDescriptor = {
		column: 'id',
		direction: 'descending'
	}

	const setUsersWithParam = (
		items: IUser[],
		sortDescriptor = users.sortDescriptor
	) => {
		setUsers({
			items,
			sortDescriptor
		})
	}

	const sortUsers = (descriptor: SortDescriptor) => {
		const { column, direction } = descriptor
		if (!users.items) return
		const sortedUsers = users.items.sort((a, b) => {
			let cmp = 1
			switch (column) {
				case 'id':
					cmp = a.id - b.id
					break
				case 'login':
					cmp = a.login.localeCompare(b.login)
					break
				default:
					cmp = a.id - b.id
					break
			}
			if (direction === 'descending') cmp *= -1
			return cmp
		})
		setUsersWithParam(sortedUsers, descriptor)
	}

	/* search */
	const search = (term: string) => {
		term = term.toLowerCase()

		const searchedUsers = _users.filter(
			user =>
				String(user.id).includes(term) ||
				user.login.toLowerCase().includes(term)
		)

		setUsersWithParam(searchedUsers)
	}

	const handleKeyDown = (e: KeyboardEvent<FormElement>) => {
		if (e.key === 'Enter') {
			if (e.currentTarget.value.length === 0) {
				setUsersWithParam(_users)
			} else {
				search(e.currentTarget.value)
			}
		}
	}

	/* initial */
	const { user } = useAuth()

	const [_users, _setUsers] = useState<IUser[]>([])
	const [users, setUsers] = useState<UserData>({
		items: [],
		sortDescriptor: defaultSortDescriptor
	})

	/* Get all users */
	const queryGetAllUsers = useQuery({
		queryKey: ['get all users'],
		queryFn: UserService.getAll,
		onSuccess(data) {
			_setUsers(data.data)
			setUsersWithParam(data.data, defaultSortDescriptor)
		}
	})

	/* modal create */

	const { setVisible: setVisibleModalCreate, bindings: bindingsModalCreate } =
		useModal()

	bindingsModalCreate.onClose = () => {
		setVisibleModalCreate(false)
		resetFormCreate()
	}

	const { mutateAsync: createUser } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: ILoginPassword) => UserService.create(data),
		onSuccess() {
			queryGetAllUsers.refetch()
		}
	})

	const {
		register: formCreate,
		handleSubmit: handleSubmitOnCreate,
		reset: resetFormCreate
	} = useForm<ILoginPassword>()

	const onSubmitCreate: SubmitHandler<ILoginPassword> = data => {
		console.log(data)

		if (_users.some(item => item.login === data.login)) {
			toastr.error('Поле Логин', 'Значение поля занято')
			return
		}

		createUser(data)
		resetFormCreate()
		setVisibleModalCreate(false)
	}

	/* Delete */
	const { mutateAsync: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => UserService.delete(id),
		onSuccess() {
			queryGetAllUsers.refetch()
		}
	})

	const deleteHandler = (id: number) => {
		if (user?.id === id) {
			toastr.error(
				'Удаление пользователя',
				'Нельзя удалить авторизированного пользователя'
			)
			return
		}

		deleteUser(id)
	}

	/* modal change password */

	const {
		setVisible: setVisibleModalChangePassword,
		bindings: bindingsModalChangePassword
	} = useModal()

	bindingsModalChangePassword.onClose = () => {
		setVisibleModalChangePassword(false)
		resetFormChangePassword()
	}

	const { mutateAsync: setNewPassword } = useMutation({
		mutationKey: ['set new password'],
		mutationFn: (data: INewPassword) => UserService.setNewPassword(data)
	})

	const {
		register: formChangePassword,
		handleSubmit: handleSubmitOnChangePassword,
		reset: resetFormChangePassword,
		setValue: setValueDelete
	} = useForm<INewPassword>()

	const onSubmitChangePassword: SubmitHandler<INewPassword> = data => {
		console.log(data)

		setNewPassword(data)
		resetFormChangePassword()
		setVisibleModalChangePassword(false)
	}

	const changePasswordHandler = (item: IUser) => {
		setValueDelete('id', item.id)

		setVisibleModalChangePassword(true)
	}

	return (
		<>
			<h1 className='ml-[17%]'>Пользователи</h1>
			<div className='flex items-end justify-between p-4'>
				<Input
					size='sm'
					type='search'
					label='Поиск'
					width='250px'
					onKeyDown={handleKeyDown}
				/>
				<Button auto onClick={() => setVisibleModalCreate(true)}>
					Создать
				</Button>
			</div>
			<Grid.Container className='mt-4'>
				<Grid xs={12} direction='column' className='w-full'>
					<Table
						bordered={true}
						borderWeight='light'
						shadow={false}
						lined={true}
						lineWeight='light'
						className={stylesTable.table}
						sortDescriptor={users.sortDescriptor}
						onSortChange={sortUsers}
					>
						<Table.Header>
							<Table.Column key='id' allowsSorting width={80}>
								Id
							</Table.Column>
							<Table.Column key='login' allowsSorting>
								login
							</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{users ? (
								users.items.map(item => (
									<Table.Row key={item.id}>
										<Table.Cell>{item.id}</Table.Cell>
										<Table.Cell>{item.login}</Table.Cell>
										<Table.Cell>
											<Button
												auto
												size='sm'
												onClick={() => {
													changePasswordHandler(item)
												}}
											>
												Сбросить пароль
											</Button>
											<Button
												auto
												icon={<AiOutlineDelete color='red' />}
												className='button-icon'
												onClick={() => deleteHandler(item.id)}
											/>
										</Table.Cell>
									</Table.Row>
								))
							) : (
								<></>
							)}
						</Table.Body>
					</Table>
				</Grid>
			</Grid.Container>

			{/* modal create */}

			<Modal className='p-6' closeButton width='800px' {...bindingsModalCreate}>
				<form onSubmit={handleSubmitOnCreate(onSubmitCreate)}>
					<Modal.Header>
						<h2 className='py-4 text-lg'>Новый пользователь</h2>
					</Modal.Header>
					<Modal.Body className='flex flex-col items-center'>
						<Input
							type='text'
							label='Логин'
							width='100%'
							{...formCreate('login')}
						/>
						<Input
							type='text'
							label='Пароль'
							width='100%'
							{...formCreate('password')}
						/>
					</Modal.Body>
					<Modal.Footer className='flex flex-col items-center py-10'>
						<Button type='submit'>Создать</Button>
					</Modal.Footer>
				</form>
			</Modal>

			{/* modal change password */}

			<Modal
				className='p-6'
				closeButton
				width='800px'
				{...bindingsModalChangePassword}
			>
				<form onSubmit={handleSubmitOnChangePassword(onSubmitChangePassword)}>
					<Modal.Header>
						<h2 className='py-4 text-lg'>Новый пароль</h2>
					</Modal.Header>
					<Modal.Body className='flex flex-col items-center'>
						<Input
							type='text'
							label='Пароль'
							width='100%'
							{...formChangePassword('newPassword')}
						/>
					</Modal.Body>
					<Modal.Footer className='flex flex-col items-center py-10'>
						<Button type='submit'>Изменить</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</>
	)
}

export default Users
