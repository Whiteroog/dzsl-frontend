import AdminLayout from '@/components/screens/admin/layout/AdminLayout'
import Users from '@/components/screens/admin/users/Users'

import { NextPageAuth } from '@/providers/auth/auth-page.types'

const UsersPage: NextPageAuth = () => {
	return (
		<AdminLayout>
			<Users key={'users'} />
		</AdminLayout>
	)
}

UsersPage.isOnlyAdmin = true

export default UsersPage
