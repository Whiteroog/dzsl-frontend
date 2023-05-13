import { Grid } from '@nextui-org/react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import CardProduct from '@/components/ui/card-product/CardProduct'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { testCategory } from '@/types/category.interface'
import { testProducts } from '@/types/product.interface'

const ProductsByCategory: FC = () => {
	const slug = useRouter().query.slug
	const category = testCategory.find(category => category.slug === slug)
	const products = testProducts.filter(
		product => product.category.id === category?.id
	)
	return (
		<Layout>
			<TitlePage title={category?.name} />
			<Grid.Container gap={4}>
				{products.map((product, index) => (
					<Grid
						xs={12}
						justify='center'
						className={cn('mt-10', { 'mt-0': index === 0 })}
					>
						<CardProduct product={product} />
					</Grid>
				))}
			</Grid.Container>
		</Layout>
	)
}

export default ProductsByCategory
