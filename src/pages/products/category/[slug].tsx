import { Row } from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import CardProduct from '@/components/card-product/CardProduct'
import Layout from '@/components/layout/Layout'
import TitlePage from '@/components/title-page/TitlePage'

import { testDataCategory } from '@/types/category.interface'
import { testDataProducts } from '@/types/product.interface'

const CategoryPage: NextPage = () => {
	const { asPath } = useRouter()
	const slug = asPath.split('/').at(-1)

	const category = testDataCategory.find(item => item.slug === slug)

	const products = testDataProducts

	return (
		<Layout>
			<TitlePage title={category?.name} />

			{products.map((item, index) => (
				<Row justify='center' className={`${index === 0 ? 'mt-0' : 'mt-10'}`}>
					<CardProduct dataProduct={item} />
				</Row>
			))}
		</Layout>
	)
}

export default CategoryPage
