import { Link } from '@nextui-org/react'
import { FC } from 'react'

import Logo from '@/components/layout/header/logo/Logo'

import { EnumLinks } from '@/types/links.enum'

const Sidebar: FC = () => {
	return (
		<>
			<Logo />

			<div className='mt-8 flex flex-col'>
				{/* Menu */}
				<div className='flex flex-col space-y-2'>
					<Link href={'products'}>Продукция</Link>
					<Link href={'category'}>Категории</Link>
					<Link href={'orders'}>Заказы</Link>
					<Link href={'users'}>Пользователи</Link>
				</div>
				<div className='mt-20'>
					<Link href={EnumLinks.LOGOUT}>Выйти</Link>
				</div>
			</div>
		</>
	)
}

export default Sidebar
