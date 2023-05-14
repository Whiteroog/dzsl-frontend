import AdminLayout from '@/components/screens/admin/layout/AdminLayout'
import Orders from '@/components/screens/admin/orders/Orders'

import { NextPageAuth } from '@/providers/auth/auth-page.types'

const OrdersPage: NextPageAuth = () => {
	return (
		<AdminLayout>
			<Orders key={'orders'} />
		</AdminLayout>
	)
}

OrdersPage.isOnlyAdmin = true

export default OrdersPage
