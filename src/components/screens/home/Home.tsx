import Layout from '@/components/layout/Layout'
import { Grid, Image } from '@nextui-org/react'
import { FC } from 'react'

const Home: FC = () => {
  return <Layout>
  <Grid.Container alignItems='center' gap={2}>
    <Grid xs={12} sm={6}>
      <div>
        <h1 className='mb-2 text-3xl font-medium'>
          Дмитровский Завод Строительный Лесов
        </h1>
        <p className='text-lg'>
          Лучший отечественный производитель строительных конструкций для
          высотных работ
        </p>
      </div>
    </Grid>
    <Grid xs={12} sm={6}>
      <Image
        src='http://localhost:3000/images/home-image-1.jpg'
        width={500}
        height={500}
        alt='Картинка показывающая деятельность компании'
        autoResize={true}
      />
    </Grid>
  </Grid.Container>
</Layout>
}

export default Home