import { Button, Card, Input } from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Logo from '@/components/layout/header/logo/Logo'

import { ILoginPassword } from '@/store/user/user.interface'

import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'

const LoginPage: NextPage = () => {
	const { user } = useAuth()
	const { login } = useActions()

	const {
		register: formRegister,
		handleSubmit,
		reset
	} = useForm<ILoginPassword>({ mode: 'onSubmit' })

	const onSubmit: SubmitHandler<ILoginPassword> = data => {
		login(data)
		reset()
	}

	const { replace } = useRouter()

	useEffect(() => {
		if (user) replace('/admin/panel/products')
	}, [user])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex min-h-screen flex-col items-center justify-center'>
				<Card className='max-w-[600px]'>
					<Card.Header className='flex-col'>
						<Logo />
						<h1 className='py-4 text-2xl'>Авторизация</h1>
						<p className='text-error'>
							{login === undefined ? <>Неверный логин или пароль</> : <></>}
						</p>
					</Card.Header>
					<Card.Body>
						<div className='flex flex-col items-center space-y-4'>
							<Input
								{...formRegister('login')}
								type='text'
								label='Логин'
								clearable
								width='200px'
								required
							/>
							<Input.Password
								{...formRegister('password')}
								label='Пароль'
								clearable
								width='200px'
								required
							/>
						</div>
					</Card.Body>
					<Card.Footer className='flex-col items-center py-10'>
						<Button type='submit'>Войти</Button>
					</Card.Footer>
				</Card>
			</div>
		</form>
	)
}

export default LoginPage
