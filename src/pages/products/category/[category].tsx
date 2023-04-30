import {
	Card,
	Container,
	Grid,
	Image,
	Link,
	Row,
	Table
} from '@nextui-org/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import Layout from '@/components/layout/Layout'

import { testDataCategory } from '@/service/category.data'
import { testDataProducts } from '@/service/products.data'

const CategoryPage: NextPage = () => {
	const { asPath } = useRouter()
	const querySlug = asPath.split('/').at(-1)

	const category = testDataCategory.find(item => item.slug === querySlug)

	const products = testDataProducts

	console.log(products)

	return (
		<Layout slug={'products'}>
			<h1 className='mb-10 text-2xl font-bold'>{category?.name}</h1>

			<Container>
				{products.map((item, index) => (
					<Row justify='center' className={`${index === 0 ? 'mt-0' : 'mt-10'}`}>
						<Card key={item.slug} className='min-w-[413px] max-w-[916px]'>
							<Card.Header className='justify-center'>
								<h2 className='text-lg font-bold'>{item.name}</h2>
							</Card.Header>
							<Card.Divider />
							<Card.Body>
								<Grid.Container gap={2}>
									<Grid xs={12} sm={4}>
										<Image
											src={'http://localhost:3000/images/' + item.imageName}
											alt='ЛРСП-30'
											width={250}
											height={375}
										/>
									</Grid>
									<Grid xs={12} sm={8} justify='center'>
										<div className='w-full max-w-[480px]'>
											<h3 className='my-2 text-center text-lg'>
												Технические характеристики
											</h3>
											<Table shadow={false} bordered={false}>
												<Table.Header>
													<Table.Column>Название</Table.Column>
													<Table.Column>Значение</Table.Column>
												</Table.Header>
												<Table.Body>
													{item.specifications.map((spec, index) => (
														<Table.Row key={index}>
															<Table.Cell>{spec.name}</Table.Cell>
															<Table.Cell>{spec.value}</Table.Cell>
														</Table.Row>
													))}
												</Table.Body>
											</Table>
										</div>
									</Grid>
									<p className='p-2'>{item.description}</p>
								</Grid.Container>
								<Card.Footer>
									<Row justify='flex-end'>
										<div>
											<div className='text-lg'>
												от{' '}
												<span className='font-bold text-dzsl-primary'>
													{item.price}
												</span>{' '}
												р.
											</div>
											<Link
												className='btn-base mt-2'
												href={'/product-detail/' + item.slug}
												block
											>
												Купить
											</Link>
										</div>
									</Row>
								</Card.Footer>
							</Card.Body>
						</Card>
					</Row>
				))}
			</Container>
		</Layout>
	)
}

export default CategoryPage
