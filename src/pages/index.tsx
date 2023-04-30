import { Grid, Image } from '@nextui-org/react'
import { NextPage } from 'next'

import Layout from '@/components/layout/Layout'

const HomePage: NextPage = () => {
	return (
		<Layout>
			<Grid.Container justify='center' alignItems='center' gap={4}>
				<Grid>
					<div>
						<h1 className='text-4xl'>Дмитровский Завод Строительный Лесов</h1>
						<p className='text-md'>
							Лучший отечественный производитель строительных конструкций для
							высотных работ
						</p>
					</div>
				</Grid>
				<Grid>
					<Image
						src='http://localhost:3000/images/home-image-1.jpg'
						width={500}
						height={500}
						alt='Картинка показывающая деятельность компании'
					/>
				</Grid>
			</Grid.Container>
		</Layout>
	)
}

export default HomePage
