import { Link } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Logo from '@/components/layout/header/logo/Logo'

import { useActions } from '@/hooks/useActions'

import { EnumLinks } from '@/types/links.enum'

const Sidebar: FC = () => {
	const { logout } = useActions()
	const { replace } = useRouter()
	return (
		<>
			<Logo />
			<div className='mt-8 flex flex-col'>
				{/* Menu */}
				<div className='flex flex-col space-y-2'>
					<Link href={EnumLinks.TABLE_PRODUCTS}>Продукция</Link>
					<Link href={EnumLinks.TABLE_CATEGORIES}>Категории</Link>
					<Link href={EnumLinks.TABLE_ORDERS}>Заказы</Link>
					<Link href={EnumLinks.TABLE_USERS}>Пользователи</Link>
				</div>
				<div className='mt-20'>
					<Link
						href={EnumLinks.HOME_PAGE}
						onClick={async e => {
							await replace(EnumLinks.HOME_PAGE)
							await logout()
						}}
					>
						Выйти
					</Link>
				</div>
			</div>
		</>
	)
}

export default Sidebar
