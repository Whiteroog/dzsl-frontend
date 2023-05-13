import { Button, Card, Grid, Input } from '@nextui-org/react'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

interface IFormOrderProps {
	product: IProduct
}

const FormOrder: FC<IFormOrderProps> = ({ product }) => {
	return (
		<Card variant='bordered'>
			<Card.Header className='justify-center'>
				<h2 className='text-lg font-bold'>Форма составления заказа</h2>
			</Card.Header>
			<Card.Body>
				<Grid.Container>
					<Grid xs={4} direction='column' alignItems='center' justify='center'>
						<div>
							Цена за <strong>1</strong> шт.
						</div>
						<div className='text-lg'>
							<strong>{product.price}</strong> р.
						</div>
					</Grid>
					<Grid xs={4} direction='column' alignItems='center' justify='center'>
						<Input width='100px' type='number' label='Количество' />
					</Grid>
					<Grid xs={4} direction='column' alignItems='center' justify='center'>
						<div>Итоговая цена</div>
						<div className='text-lg'>
							<strong>{product.price}</strong> р.
						</div>
					</Grid>
				</Grid.Container>
			</Card.Body>
			<Card.Footer className='mt-8 flex-col pb-10'>
				<div className='flex flex-col space-y-4'>
					<Input
						type='text'
						label='ф и о'
						clearable
						placeholder='Фамилия Имя Отчество'
						width='400px'
						required
					/>
					<Input
						type='tel'
						label='телефон'
						clearable
						placeholder='+7 (123) 456-78-90'
						required
					/>

					<Input
						type='email'
						label='почта'
						clearable
						placeholder='example@mail.ru'
						required
					/>
				</div>
				<Button className='mt-10' type='submit'>
					Отправить
				</Button>
			</Card.Footer>
		</Card>
	)
}

export default FormOrder
