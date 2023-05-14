import { Button, Grid, Input, Table } from '@nextui-org/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FC } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import styles from '../tables/Table.module.scss'

import { UserService } from '@/services/user.service'

const Users: FC = () => {
	/* Get all */
	const queryGetAllUsers = useQuery({
		queryKey: ['get all users'],
		queryFn: UserService.getAll
	})

	const users = queryGetAllUsers.data?.data ?? []

	/* Delete */
	const { mutateAsync: deleteUser } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (id: number) => UserService.delete(id),
		onSuccess() {
			queryGetAllUsers.refetch()
		}
	})

	return (
		<>
			<h1 className='ml-[17%]'>Пользователи</h1>
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
										<Button auto size={'sm'}>
											Сбросить пароль
										</Button>
										<Button
											auto
											icon={<AiOutlineDelete color='red' />}
											className='button-icon'
											onClick={() => deleteUser(user.id)}
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

export default Users
