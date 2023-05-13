import { Grid } from '@nextui-org/react'
import { FC, PropsWithChildren } from 'react'

import styles from './AdminLayout.module.scss'
import Sidebar from './sidebar/Sidebar'

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Grid.Container direction='row' className={styles.adminLayout} gap={2}>
			<Grid
				direction='column'
				className='border-r border-gray border-opacity-30'
				xs={2}
			>
				<Sidebar />
			</Grid>
			<Grid direction='column' xs={10}>
				{children}
			</Grid>
		</Grid.Container>
	)
}

export default AdminLayout
