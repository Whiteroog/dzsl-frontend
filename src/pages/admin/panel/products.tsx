import { NextPage } from 'next'

import AdminLayout from '@/components/screens/admin/layout/AdminLayout'
import Products from '@/components/screens/admin/products/Products'

const ProductsPage: NextPage = () => {
	return (
		<AdminLayout>
			<Products key={'products'} />
		</AdminLayout>
	)
}

export default ProductsPage
