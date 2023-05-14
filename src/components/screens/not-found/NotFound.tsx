import { Card } from '@nextui-org/react'
import { FC } from 'react'

import Logo from '@/components/layout/header/logo/Logo'

const NotFound: FC = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center'>
			<Card className='max-w-[600px]'>
				<Card.Body className='flex-row items-center justify-around space-x-2'>
					<Logo />
					<h1 className='py-4 text-2xl'>Страница не найдена!</h1>
				</Card.Body>
			</Card>
		</div>
	)
}

export default NotFound
