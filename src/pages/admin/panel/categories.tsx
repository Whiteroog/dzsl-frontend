import Category from '@/components/screens/admin/category/Category'
import AdminLayout from '@/components/screens/admin/layout/AdminLayout'

import { NextPageAuth } from '@/providers/auth/auth-page.types'

const CategoryPage: NextPageAuth = () => {
	return (
		<AdminLayout>
			<Category key={'category'} />
		</AdminLayout>
	)
}

CategoryPage.isOnlyAdmin = true

export default CategoryPage
