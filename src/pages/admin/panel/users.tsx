import { NextPage } from 'next'

import AdminLayout from '@/components/screens/admin/layout/AdminLayout'
import Users from '@/components/screens/admin/users/Users'

const UsersPage: NextPage = () => {
	return (
		<AdminLayout>
			<Users key={'users'} />
		</AdminLayout>
	)
}

export default UsersPage
