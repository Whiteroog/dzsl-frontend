import { Grid } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import CardProduct from '@/components/ui/card-product/CardProduct'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { ProductService } from '@/services/product.service'

const ProductsByCategory: FC = () => {
	const slug = (useRouter().query.slug as string) ?? ''

	const queryProductsByCategory = useQuery({
		queryKey: ['get products by category', slug],
		queryFn: () => ProductService.getByCategory(slug)
	})

	const products = queryProductsByCategory.data?.data ?? []

	const title = products.length ? products[0].category.name : 'Нет категории'

	return (
		<Layout>
			<TitlePage title={title} />
			<Grid.Container gap={4}>
				{products.map(product => (
					<Grid key={product.id} xs={12} justify='center'>
						<CardProduct product={product} />
					</Grid>
				))}
			</Grid.Container>
		</Layout>
	)
}

export default ProductsByCategory
