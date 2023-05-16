import {
	Button,
	FormElement,
	Grid,
	Input,
	Modal,
	Table
} from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, KeyboardEvent, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { toastr } from 'react-redux-toastr'

import { ILoginPassword } from '@/store/user/user.interface'

import { useAuth } from '@/hooks/useAuth'
import useInput from '@/hooks/useInput'

import { INewPassword, IUser } from '@/types/user.interface'

import tableStyle from '../tables/Table.module.scss'

import { UserService } from '@/services/user.service'

const Users: FC = () => {
	const { user } = useAuth()

	const [_users, _setUsers] = useState<IUser[]>([])
	const [users, setUsers] = useState<IUser[]>([])

	const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser)

	const selectUserHandler = (id: number) => {
		setSelectedUser(users.find(item => item.id === id) ?? ({} as IUser))
	}

	/* Get all */
	const queryGetAllUsers = useQuery({
		queryKey: ['get all users'],
		queryFn: UserService.getAll,
		onSuccess(data) {
			_setUsers(data.data)
			setUsers(data.data)
		}
	})

	/* Delete */
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

	const { mutateAsync: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => UserService.delete(id),
		onSuccess() {
			queryGetAllUsers.refetch()
		}
	})

	/* new password */
	const [modalPassword, setModalPassword] = useState(false)

	const passwordInput = useInput('')

	const { mutateAsync: setNewPassword } = useMutation({
		mutationKey: ['set new password'],
		mutationFn: (data: INewPassword) => UserService.setNewPassword(data)
	})

	const closeModelPasswordHandler = () => {
		passwordInput.setValue('')
		setModalPassword(false)
	}

	/* create user */
	const [modalCreateUser, setModalCreateUser] = useState(false)

	const loginInput = useInput('')

	const { mutateAsync: createUser } = useMutation({
		mutationKey: ['create user'],
		mutationFn: (data: ILoginPassword) => UserService.create(data),
		onSuccess() {
			queryGetAllUsers.refetch()
		}
	})

	const closeModelCreateUserHandler = () => {
		passwordInput.setValue('')
		loginInput.setValue('')
		setModalCreateUser(false)
	}

	/* search */
	const search = (term: string) => {
		term = term.toLowerCase()

		const searchedUsers = _users.filter(user =>
			user.login.toLowerCase().includes(term)
		)

		setUsers(searchedUsers)
	}

	const handleKeyDown = (e: KeyboardEvent<FormElement>) => {
		if (e.key === 'Enter') {
			if (e.currentTarget.value.length === 0) {
				setUsers(_users)
			} else {
				search(e.currentTarget.value)
			}
		}
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
				<Button auto onClick={() => setModalCreateUser(true)}>
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
						className={tableStyle.table}
					>
						<Table.Header>
							<Table.Column width={80}>Id</Table.Column>
							<Table.Column>login</Table.Column>
							<Table.Column hideHeader={true} width={100}>
								Действия
							</Table.Column>
						</Table.Header>
						<Table.Body>
							{users.map(user => (
								<Table.Row key={user.id}>
									<Table.Cell>{user.id}</Table.Cell>
									<Table.Cell>{user.login}</Table.Cell>
									<Table.Cell>
										<Button
											auto
											size={'sm'}
											onClick={() => {
												setModalPassword(true)
												selectUserHandler(user.id)
											}}
										>
											Сбросить пароль
										</Button>
										<Button
											auto
											icon={<AiOutlineDelete color='red' />}
											className='button-icon'
											onClick={() => deleteHandler(user.id)}
										/>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</Grid>
			</Grid.Container>

			<Modal
				className='p-6'
				closeButton
				open={modalPassword}
				onClose={() => {
					closeModelPasswordHandler()
				}}
			>
				<Modal.Header>
					<h2 className='py-4 text-lg'>Новый пароль</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-center'>
					<Input
						size='sm'
						type='text'
						label='Пароль'
						width='250px'
						{...passwordInput}
					/>
					<Button
						className='mt-6'
						auto
						onClick={() => {
							setNewPassword({
								id: selectedUser.id,
								newPassword: passwordInput.value
							})
							closeModelPasswordHandler()
						}}
					>
						Изменить
					</Button>
				</Modal.Body>
			</Modal>

			<Modal
				closeButton
				open={modalCreateUser}
				onClose={() => {
					closeModelCreateUserHandler()
				}}
				className='p-6'
			>
				<Modal.Header>
					<h2 className='py-4 text-lg'>Новый пользователь</h2>
				</Modal.Header>
				<Modal.Body className='flex flex-col items-center'>
					<Input
						size='sm'
						type='text'
						label='Логин'
						width='250px'
						{...loginInput}
					/>
					<Input
						size='sm'
						type='text'
						label='Пароль'
						width='250px'
						{...passwordInput}
					/>
					<Button
						className='mt-6'
						auto
						onClick={() => {
							createUser({
								login: loginInput.value,
								password: passwordInput.value
							})
							closeModelCreateUserHandler()
						}}
					>
						Создать
					</Button>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Users
