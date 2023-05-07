import { Button, Card, Col, Grid, Image, Input, Row } from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'
import Specifications from '@/components/specifications/Specifications'
import TitlePage from '@/components/title-page/TitlePage'

import useInput from '@/hooks/useInput'

import { testProducts } from '@/interfaces/product.interface'
import { Links } from '@/links/Links'

const ProductPage: NextPage = () => {
	const slug = useRouter().query.slug

	const product = testProducts.find(product => product.slug === slug)

	const quantityInput = useInput('2')

	const price = product?.price ?? 0

	const getQuantity = () => {
		const value = Number(quantityInput.value)
		if (value < 1) quantityInput.setValue('1')
		if (value > 99) quantityInput.setValue('99')
		return Number(quantityInput.value)
	}

	return (
		<Layout>
			<TitlePage title={product?.name} />
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Image
						src={Links.IMAGES + product?.image}
						alt={product?.name}
						width={250}
						height={375}
						autoResize={true}
						className='rounded-lg'
					/>
				</Grid>
				<Grid xs={12} sm={8} justify='center'>
					<Specifications specifications={product?.specifications ?? []} />
				</Grid>
			</Grid.Container>
			<p>{product?.description}</p>

			<Card variant='bordered'>
				<Card.Header className='justify-center'>
					<h2 className='text-lg font-bold'>Форма составления заказа</h2>
				</Card.Header>
				<Card.Body>
					<Row align='center'>
						<Col className='text-center'>
							<div>
								Цена за <strong>1</strong> шт.
							</div>
							<div className='text-lg'>
								<strong>{price}</strong> р.
							</div>
						</Col>
						<Col className='text-center'>
							<Input
								width='100px'
								type='number'
								label='Количество'
								{...quantityInput}
							/>
						</Col>
						<Col className='text-center'>
							<div>Итоговая цена</div>
							<div className='text-lg'>
								<strong>{price * getQuantity()}</strong> р.
							</div>
						</Col>
					</Row>
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
		</Layout>
	)
}

export default ProductPage
