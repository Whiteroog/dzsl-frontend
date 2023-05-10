import { Grid } from '@nextui-org/react'
import cn from 'classnames'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import CardProduct from '@/components/card-product/CardProduct'
import Layout from '@/components/layout/Layout'
import TitlePage from '@/components/title-page/TitlePage'

import { testCategory } from '@/types/category.interface'

import { testProducts } from '@/interfaces/product.interface'

const CategoryPage: NextPage = () => {
	const slug = useRouter().query.slug

	const category = testCategory.find(category => category.slug === slug)

	const products = testProducts.filter(
		product => product.categoryId === category?.id
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

export default CategoryPage
