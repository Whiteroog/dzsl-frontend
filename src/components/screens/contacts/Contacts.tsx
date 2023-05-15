import { Grid, Image } from '@nextui-org/react'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { EnumLinks } from '@/types/links.enum'

const Contacts: FC = () => {
	return (
		<Layout>
			<TitlePage title='Контактная информация' />

			<Grid.Container>
				<Grid xs={6} justify='center'>
					<div>
						<h2>Организация</h2>
						<span>ООО «Дмитровский Завод Строительных Лесов»</span>

						<h2>Адрес</h2>
						<span>Россия, г. Яхрома, ул. Ленина, д. 42</span>

						<h2>Офис</h2>
						<span>
							г. Москва, улица Народного Ополчения, д. 34 стр. 3, офис 210
						</span>

						<h2 className='mt-6 text-center'>Часы работы</h2>
						<div className='flex justify-between space-x-8'>
							<div>
								<h3>Офис (оформление документов)</h3>
								<div className='flex space-x-8'>
									<div>
										<span className='block'>Понедельник — пятница</span>
										<span className='block'>с 8:00 до 18:00</span>
									</div>
									<div>
										<span className='block'>Суббота</span>
										<span className='block'>с 10:00 до 15:00</span>
									</div>
								</div>
							</div>
							<div>
								<h3>Склад</h3>
								<div>
									<span className='block'>ежедневно</span>
									<span className='block'>с 8 до 18:00</span>
								</div>
							</div>
						</div>
					</div>
				</Grid>
				<Grid xs={6} justify='center'>
					<div>
						<h2>Телефоны</h2>
						<div className='mb-2'>
							<span className='block'>8 (800) 555-88-11*</span>
							<span className='block text-sm opacity-70'>
								*звонок бесплатный
							</span>
						</div>
						<span className='block'>+7 (499) 340-01-07</span>
						<span className='block'>+7 (495) 641-71-00</span>

						<h2>e-mail</h2>
						<span>info@dzsl.ru</span>

						<h2 className='mt-4'>QR-код контактной информации</h2>
						<div>
							<Image
								src={EnumLinks.STATIC_IMAGES + 'qr.png'}
								width={195}
								height={195}
								alt='QR-код контактной информации'
								autoResize={true}
							/>
						</div>
					</div>
				</Grid>
			</Grid.Container>
			<Image
				src={EnumLinks.STATIC_IMAGES + 'location.png'}
				width={1011}
				height={736}
				alt='Местоположение офиса'
				autoResize={true}
				className='my-4'
			/>
		</Layout>
	)
}

export default Contacts
