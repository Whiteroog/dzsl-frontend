import { Col, Image, Link, Row } from '@nextui-org/react'
import { FC } from 'react'

import { EnumLinks } from '@/types/links.enum'

const Footer: FC = () => {
	return (
		<footer className='mt-6 py-4'>
			<Row gap={2}>
				<Col className='space-y-4'>
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
							src='http://localhost:3000/images/pay.png'
							width={350}
							height={45}
							alt='Способы оплаты'
							autoResize={true}
							className='m-0'
						/>
					</div>
				</Col>
				<Col>
					<div className='flex flex-col'>
						<Link href={EnumLinks.ABOUT_US}>О Нас</Link>
						<Link href={EnumLinks.DELIVERY}>Доставка</Link>
						<Link href={EnumLinks.CONTACTS}>Контакты</Link>
						<Link href={EnumLinks.LOGIN}>Административная панель</Link>
					</div>
				</Col>
			</Row>
			<Row className='mt-6 border-t-2 border-gray p-4 pt-6'>
				<Col>
					©2023 Дмитровский Завод Строительных Лесов
					<br />
					Перепечатка материалов сайта запрещена
				</Col>
			</Row>
		</footer>
	)
}

export default Footer
