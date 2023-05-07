import { Grid, Image } from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'
import Specifications from '@/components/specifications/Specifications'
import TitlePage from '@/components/title-page/TitlePage'

import { testProducts } from '@/interfaces/product.interface'
import { Links } from '@/links/Links'

const ProductPage: NextPage = () => {
	const slug = useRouter().query.slug

	const product = testProducts.find(product => product.slug === slug)

	return (
		<Layout>
			<TitlePage title={product?.name} />
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Image
						src={Links.IMAGES + product?.image}
						alt={product?.name}
						width={250}
						height={375}
						autoResize={true}
						className='rounded-lg'
					/>
				</Grid>
				<Grid xs={12} sm={8} justify='center'>
					<Specifications specifications={product?.specifications ?? []} />
				</Grid>
			</Grid.Container>
			<p>{product?.description}</p>
		</Layout>
	)
}

export default ProductPage
