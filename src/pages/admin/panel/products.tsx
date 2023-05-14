import AdminLayout from '@/components/screens/admin/layout/AdminLayout'
import Products from '@/components/screens/admin/products/Products'

import { NextPageAuth } from '@/providers/auth/auth-page.types'

const ProductsPage: NextPageAuth = () => {
	return (
		<AdminLayout>
			<Products key={'products'} />
		</AdminLayout>
	)
}

ProductsPage.isOnlyAdmin = true

export default ProductsPage
