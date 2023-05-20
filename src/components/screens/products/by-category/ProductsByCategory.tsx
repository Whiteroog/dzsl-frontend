import { Grid } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

import Layout from '@/components/layout/Layout'
import CardProduct from '@/components/ui/card-product/CardProduct'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { IProduct } from '@/types/product.interface'

import { ProductService } from '@/services/product.service'

const ProductsByCategory: FC = () => {
	const slug = (useRouter().query.slug as string) ?? ''

	const queryGetProductsByCategory = useQuery({
		queryKey: ['get products by category', slug],
		queryFn: () => ProductService.getByCategory(slug),
		onSuccess(data) {
			setProducts(data.data)
			if (data.data.length !== 0) setTitle(data.data[0].category.name)
		},
		onError(err) {
			setTitle('Нет данных')
		}
	})

	const [products, setProducts] = useState<IProduct[]>([] as IProduct[])

	const [title, setTitle] = useState<string>('...Загрузка')

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
