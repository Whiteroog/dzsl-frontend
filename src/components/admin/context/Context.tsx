import { Button, Grid, Input } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { FC } from 'react'

import ProductFilter from './filters/ProductFilter'
import CategoryTable from './tables/CategoryTable'
import OrdersTable from './tables/OrdersTable'
import ProductTable from './tables/ProductTable'
import UserTable from './tables/UserTable'
import { adminLinks } from '@/links/Links'

const Context: FC = () => {
	const slug = useRouter().query.slug
	const title = adminLinks.find(link => link.slug === slug)?.name

	const selectTable: { [key: string]: JSX.Element } = {
		products: <ProductTable />,
		category: <CategoryTable />,
		orders: <OrdersTable />,
		users: <UserTable />
	}

	const selectFilter: { [key: string]: JSX.Element } = {
		products: <ProductFilter />
	}

	const showFilter = selectFilter[slug as string] ? true : false

	return (
		<>
			<h1 className='ml-[17%]'>{title}</h1>
			<div className='flex items-end justify-between'>
				<Input size='sm' type='search' label='Поиск' width='250px' />
				<Button auto>Создать</Button>
			</div>
			<Grid.Container className='mt-2' gap={2}>
				{showFilter ? (
					<Grid xs={2} direction='column'>
						<h2 className='text-center'>Фильтр</h2>
						{selectFilter[slug as string]}
					</Grid>
				) : null}
				<Grid xs={showFilter ? 10 : 12} direction='column' className='w-full'>
					{selectTable[slug as string]}
				</Grid>
			</Grid.Container>
		</>
	)
}

export default Context
