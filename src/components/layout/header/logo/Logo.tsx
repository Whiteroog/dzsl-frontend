import { Image, Link } from '@nextui-org/react'
import { FC } from 'react'

const Logo: FC = () => {
	return (
		<Link href='/' className='max-w-full'>
			<Image
				src='http://localhost:3000/images/logo.png'
				alt='Логотип компании'
				width={209}
				height={100}
				autoResize={true}
			/>
		</Link>
	)
}

export default Logo
