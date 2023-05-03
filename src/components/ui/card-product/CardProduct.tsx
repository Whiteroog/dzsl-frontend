import { Card, Grid, Image, Link, Row } from '@nextui-org/react'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import Specifications from '../category/Specifications'

interface ICardProduct {
	dataProduct: IProduct
}

const CardProduct: FC<ICardProduct> = ({ dataProduct }) => {
	return (
		<Card
			key={dataProduct.slug}
			className='min-w-[413px] max-w-[916px]'
			variant='bordered'
		>
			<Card.Header className='justify-center'>
				<h2 className='text-lg font-bold'>{dataProduct.name}</h2>
			</Card.Header>
			<Card.Divider />
			<Card.Body>
				<Grid.Container gap={2}>
					<Grid xs={12} sm={4}>
						<Image
							src={'http://localhost:3000/images/' + dataProduct.imageName}
							alt='ЛРСП-30'
							width={250}
							height={375}
						/>
					</Grid>
					<Grid xs={12} sm={8} justify='center'>
						<Specifications specifications={dataProduct.specifications} />
					</Grid>
				</Grid.Container>
				<Card.Footer>
					<Row justify='flex-end'>
						<div>
							<div className='text-lg'>
								от{' '}
								<span className='font-bold text-dzsl-primary'>
									{dataProduct.price}
								</span>{' '}
								р.
							</div>
							<Link
								className='btn-base mt-2'
								href={'/products/product-detail/' + dataProduct.slug}
								block={true}
							>
								Купить
							</Link>
						</div>
					</Row>
				</Card.Footer>
			</Card.Body>
		</Card>
	)
}

export default CardProduct
