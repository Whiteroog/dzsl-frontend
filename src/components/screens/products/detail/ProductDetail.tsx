import { Grid, Image } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, SyntheticEvent, useState } from 'react'

import Layout from '@/components/layout/Layout'
import Specifications from '@/components/ui/specifications/Specifications'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { EnumLinks } from '@/types/links.enum'
import { IProduct } from '@/types/product.interface'

import FormOrder from './FormOrder'
import { ProductService } from '@/services/product.service'

const ProductDetail: FC = () => {
	const slug = (useRouter().query.slug as string) ?? ''

	const queryGetProductsBySlug = useQuery({
		queryKey: ['get products by slug', slug],
		queryFn: () => ProductService.getBySlug(slug),
		onSuccess(data) {
			setProduct(data.data)
			setTitle(data.data.name)
		},
		onError(err) {
			setTitle('Нет данных')
		}
	})
	const [product, setProduct] = useState<IProduct>({} as IProduct)

	const [title, setTitle] = useState<string>('...Загрузка')

	return (
		<Layout>
			<TitlePage title={title} />
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Image
						src={EnumLinks.PRODUCT_IMAGES + product.image}
						alt={product.name}
						width={250}
						height={375}
						autoResize={true}
						className='rounded-lg'
						onError={(e: SyntheticEvent) =>
							((e.target as HTMLImageElement).src =
								EnumLinks.STATIC_IMAGES + 'no-image-placeholder.svg')
						}
					/>
				</Grid>
				{product.specifications?.length ? (
					<Grid xs={12} sm={8} justify='center'>
						<Specifications specifications={product.specifications ?? []} />
					</Grid>
				) : (
					<></>
				)}
			</Grid.Container>
			<p className='mb-6 p-4'>{product.description}</p>
			<FormOrder product={product} />
		</Layout>
	)
}

export default ProductDetail
