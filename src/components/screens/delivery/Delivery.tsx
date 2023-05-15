import { Image, Table } from '@nextui-org/react'
import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import TitlePage from '@/components/ui/title-page/TitlePage'

import { EnumLinks } from '@/types/links.enum'

import style from './Delivery.module.scss'

const Delivery: FC = () => {
	return (
		<Layout>
			<TitlePage title='Доставка по Москве и Московской Области' />
			<p>
				Доставка производится по Москве и Московской области по рабочим дням
				общем порядке, по выходным и праздничным дням - в порядке личной
				договоренности.
			</p>

			<div className='mx-auto max-w-[500px] py-4'>
				<Table
					bordered={true}
					borderWeight='light'
					shadow={false}
					lined={true}
					lineWeight='light'
					className={style.table}
				>
					<Table.Header>
						<Table.Column>Масса, кг</Table.Column>
						<Table.Column>Стоимость, руб/км</Table.Column>
					</Table.Header>
					<Table.Body>
						<Table.Row>
							<Table.Cell>до 500 кг</Table.Cell>
							<Table.Cell>35 руб/км</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>от 500 кг до 1500 кг</Table.Cell>
							<Table.Cell>40 руб/км</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>от 1500 кг до 3500 кг</Table.Cell>
							<Table.Cell>45 руб/км</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>от 3500 кг до 5000 кг</Table.Cell>
							<Table.Cell>50 руб/км</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>от 5000 кг до 10000 кг</Table.Cell>
							<Table.Cell>100 руб/км</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>

			<Image
				src={EnumLinks.STATIC_IMAGES + 'delivery-area.png'}
				width={700}
				height={473}
				alt='Карта Московкой области'
				autoResize={true}
				className='my-6'
			/>

			<h2>Доставка в другие регионы</h2>
			<p>
				Доставка в другие регионы должна быть организована заказчиком
				самостоятельно путем забора груза с нашего склада.
			</p>
			<p>
				В случае полного отказа от заказанного товара по причине, которая не
				зависит от транспортной компании или нашего завода (соблюдены все
				временные сроки и заявленное качество товара), то вам нужно
				компенсировать все расходы, связанные с доставкой товара (в соответствии
				со п. 2 ст. 497 ГК РФ).
			</p>
		</Layout>
	)
}

export default Delivery
