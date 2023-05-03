import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/ui/layout/Layout'

import { testDataProducts } from '@/types/product.interface'

const ProductPage: NextPage = () => {
	const { asPath } = useRouter()
	const slug = asPath.split('/').at(-1)

	const product = testDataProducts.find(item => item.slug === slug)
	return (
		<Layout slug={'products'}>
			<h1 className='mb-10 text-2xl font-bold'>{product?.name}</h1>
		</Layout>
	)
}

export default ProductPage
