import { Grid } from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import styles from '@/admin/Admin.module.scss'
import Context from '@/admin/context/Context'
import Sidebar from '@/admin/sidebar/Sidebar'

const AdminPage: NextPage = () => {
	const slug = useRouter().query.slug

	return (
		<Grid.Container direction='row' className={styles.adminPanel} gap={2}>
			<Grid
				direction='column'
				className='border-r border-gray border-opacity-30'
				xs={2}
			>
				<Sidebar />
			</Grid>
			<Grid direction='column' className='' xs={10}>
				<Context slug={slug} />
			</Grid>
		</Grid.Container>
	)
}

export default AdminPage
