import { Button, Card, Input } from '@nextui-org/react'
import { NextPage } from 'next'

import Logo from '@/components/layout/header/logo/Logo'

const LoginPage: NextPage = () => {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center'>
			<Card className='max-w-[600px]'>
				<Card.Header className='flex-col'>
					<Logo />
					<h1 className='py-4 text-2xl'>Авторизация</h1>
				</Card.Header>
				<Card.Body>
					<div className='flex flex-col items-center space-y-4'>
						<Input type='text' label='Логин' clearable width='200px' required />
						<Input.Password label='Пароль' clearable width='200px' required />
					</div>
				</Card.Body>
				<Card.Footer className='flex-col items-center py-10'>
					<Button className='' type='submit'>
						Войти
					</Button>
				</Card.Footer>
			</Card>
		</div>
	)
}

export default LoginPage
