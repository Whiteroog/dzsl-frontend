import { NextPage } from 'next'

import AdminLayout from '@/components/screens/admin/layout/AdminLayout'
import Orders from '@/components/screens/admin/orders/Orders'

const OrdersPage: NextPage = () => {
	return (
		<AdminLayout>
			<Orders key={'orders'} />
		</AdminLayout>
	)
}

export default OrdersPage
