import { Card, Grid, Image, Link, Row } from '@nextui-org/react'
import { FC } from 'react'

import Specifications from '../specifications/Specifications'

import { IProduct } from '@/interfaces/product.interface'
import { Links } from '@/links/Links'

interface IProductProps {
	product: IProduct
}

const CardProduct: FC<IProductProps> = ({ product }) => {
	return (
		<Card key={product.slug} className='max-w-[916px]' variant='bordered'>
			<Card.Header className='justify-center'>
				<h2 className='text-lg font-bold'>{product.name}</h2>
			</Card.Header>
			<Card.Divider />
			<Card.Body>
				<Grid.Container gap={2}>
					<Grid xs={12} sm={4}>
						<Image
							src={Links.IMAGES + product.image}
							alt={product.name}
							width={250}
							height={375}
							autoResize={true}
							className='rounded-lg'
						/>
					</Grid>
					<Grid xs={12} sm={8} justify='center'>
						<Specifications specifications={product.specifications} />
					</Grid>
				</Grid.Container>
				<Card.Footer>
					<Row justify='flex-end'>
						<div>
							<div className='text-lg'>
								от <strong>{product.price}</strong> р.
							</div>
							<Link
								className='button-link mt-2'
								href={Links.DETAIL + product.slug}
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