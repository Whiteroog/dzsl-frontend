import { Grid, Image } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, SyntheticEvent } from 'react'

import Layout from '@/components/layout/Layout'
import Specifications from '@/components/ui/specifications/Specifications'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { EnumLinks } from '@/types/links.enum'
import { IProduct } from '@/types/product.interface'

import FormOrder from './FormOrder'
import { ProductService } from '@/services/product.service'

const ProductDetail: FC = () => {
	const slug = (useRouter().query.slug as string) ?? ''

	const queryProductsBySlug = useQuery({
		queryKey: ['get products by slug', slug],
		queryFn: () => ProductService.getBySlug(slug)
	})

	const product = queryProductsBySlug.data?.data ?? ({} as IProduct)

	const title = product ? product.category?.name : 'Нет категории'

	return (
		<Layout>
			<TitlePage title={title} />
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Image
						src={EnumLinks.IMAGES + product.image}
						alt={product.name}
						width={250}
						height={375}
						autoResize={true}
						className='rounded-lg'
						onError={(e: SyntheticEvent & { target: HTMLImageElement }) =>
							(e.target.src = EnumLinks.IMAGES + 'No-Image-Placeholder.svg')
						}
					/>
				</Grid>
				<Grid xs={12} sm={8} justify='center'>
					<Specifications specifications={product.specifications ?? []} />
				</Grid>
			</Grid.Container>
			<p>{product.description}</p>
			<FormOrder product={product} />
		</Layout>
	)
}

export default ProductDetail
