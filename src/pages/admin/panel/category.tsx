import { NextPage } from 'next'

import Category from '@/components/screens/admin/category/Category'
import AdminLayout from '@/components/screens/admin/layout/AdminLayout'

const CategoryPage: NextPage = () => {
	return (
		<AdminLayout>
			<Category key={'category'} />
		</AdminLayout>
	)
}

export default CategoryPage
