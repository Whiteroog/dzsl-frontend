import { Grid } from '@nextui-org/react'
import { FC } from 'react'

import styles from './AdminPanel.module.scss'
import Context from './context/Context'
import Sidebar from './sidebar/Sidebar'

const AdminPanel: FC = () => {
	return (
		<Grid.Container direction='row' className={styles.adminPanel} gap={2}>
			<Grid
				direction='column'
				className='border-r border-gray border-opacity-30'
				xs={2}
			>
				<Sidebar />
			</Grid>
			<Grid direction='column' xs={10}>
				<Context />
			</Grid>
		</Grid.Container>
	)
}

export default AdminPanel
