import { Image, Link, Navbar } from '@nextui-org/react'
import { FC } from 'react'

const Logo: FC = () => {
	return (
		<Navbar.Brand className='mx-auto sm:mx-0'>
			<Link href='/'>
				<Image
					src='http://localhost:3000/images/logo.png'
					alt='Логотип компании'
					width={209}
					height={100}
					autoResize={true}
				/>
			</Link>
		</Navbar.Brand>
	)
}

export default Logo
