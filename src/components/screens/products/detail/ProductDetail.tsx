import { Grid, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import Specifications from '@/components/ui/specifications/Specifications'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { EnumLinks } from '@/types/links.enum'
import { IProduct, testProducts } from '@/types/product.interface'

import FormOrder from './FormOrder'

const ProductDetail: FC = () => {
	const slug = useRouter().query.slug
	const product = testProducts.find(product => product.slug === slug)

	return (
		<Layout>
			<TitlePage title={product?.name} />
			<Grid.Container gap={2}>
				<Grid xs={12} sm={4}>
					<Image
						src={EnumLinks.IMAGES + product?.image}
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
			<FormOrder product={product ?? ({} as IProduct)} />
		</Layout>
	)
}

export default ProductDetail
