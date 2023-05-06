import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'
import TitlePage from '@/components/title-page/TitlePage'

import { testProducts } from '@/interfaces/product.interface'

const ProductPage: NextPage = () => {
	const slug = useRouter().query.slug

	const product = testProducts.find(product => product.slug === slug)
	return (
		<Layout>
			<TitlePage title={product?.name} />
		</Layout>
	)
}

export default ProductPage
