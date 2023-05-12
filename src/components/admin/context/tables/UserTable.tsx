import { Button, Table } from '@nextui-org/react'
import { FC } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

import { testUsers } from '@/types/user.interface'

import styles from './Table.module.scss'

const UserTable: FC = () => {
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
				<Table.Column>login</Table.Column>
				<Table.Column hideHeader={true} width={100}>
					Действия
				</Table.Column>
			</Table.Header>
			<Table.Body>
				{testUsers.map(user => (
					<Table.Row>
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
							></Button>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	)
}

export default UserTable
