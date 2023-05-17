import { Grid, Image, Link } from '@nextui-org/react'
import { FC } from 'react'

import { EnumLinks } from '@/types/links.enum'

const Footer: FC = () => {
	return (
		<footer className='mt-6 py-4'>
			<Grid.Container gap={2}>
				<Grid xs={12} sm={6} className='space-y-4'>
					<div className='flex flex-col items-start'>
						<div>
							г. Москва, улица Народного Ополчения, д. 34 стр. 3, офис 210
						</div>
						<div className='flex flex-col'>
							<span>+7 (499) 340-01-07</span>
							<span> +7 (495) 641-71-00</span>
						</div>
						<div>info@dzsl.ru</div>
						<div className='flex flex-col items-start'>
							<span>Принимаем к оплате:</span>
							<Image
								src={EnumLinks.STATIC_IMAGES + 'pay.png'}
								width={350}
								height={45}
								alt='Способы оплаты'
								autoResize={true}
								className='m-0'
							/>
						</div>
					</div>
				</Grid>
				<Grid xs={12} sm={6}>
					<div className='flex flex-col items-start'>
						<Link href={EnumLinks.ABOUT_US}>О Нас</Link>
						<Link href={EnumLinks.DELIVERY}>Доставка</Link>
						<Link href={EnumLinks.CONTACTS}>Контакты</Link>
						<Link href={EnumLinks.LOGIN}>Административная панель</Link>
					</div>
				</Grid>
				<Grid xs={12} className='mt-6 border-t-2 border-gray p-4 pt-6'>
					<div>
						©2023 Дмитровский Завод Строительных Лесов
						<br />
						Перепечатка материалов сайта запрещена
					</div>
				</Grid>
			</Grid.Container>
		</footer>
	)
}

export default Footer
