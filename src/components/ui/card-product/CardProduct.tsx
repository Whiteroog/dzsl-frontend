import { Card, Grid, Image, Link, Row } from '@nextui-org/react'
import { FC, SyntheticEvent } from 'react'

import { EnumLinks } from '@/types/links.enum'
import { IProduct } from '@/types/product.interface'

import Specifications from '../specifications/Specifications'

const CardProduct: FC<{ product: IProduct }> = ({ product }) => {
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
							src={EnumLinks.PRODUCT_IMAGES + product.image}
							alt={product.name}
							width={250}
							height={375}
							autoResize={true}
							className='rounded-lg'
							onError={(e: SyntheticEvent & { target: HTMLImageElement }) =>
								(e.target.src =
									EnumLinks.STATIC_IMAGES + 'no-image-placeholder.svg')
							}
						/>
					</Grid>
					<Grid xs={12} sm={8} justify='center'>
						<Specifications specifications={product.specifications ?? []} />
					</Grid>
				</Grid.Container>
			</Card.Body>
			<Card.Footer>
				<Row justify='flex-end' className='p-4'>
					<div>
						<div className='text-lg'>
							от <strong>{product.price}</strong> р.
						</div>
						<Link
							className='button-link mt-2'
							href={EnumLinks.DETAIL + product.slug}
							block={true}
						>
							Купить
						</Link>
					</div>
				</Row>
			</Card.Footer>
		</Card>
	)
}

export default CardProduct
