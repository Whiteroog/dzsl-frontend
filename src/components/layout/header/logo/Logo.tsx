import { Image, Link } from '@nextui-org/react'
import { FC } from 'react'

import { EnumLinks } from '@/types/links.enum'

const Logo: FC = () => {
	return (
		<Link href='/' className='max-w-full'>
			<Image
				src={EnumLinks.STATIC_IMAGES + 'logo.png'}
				alt='Логотип компании'
				width={209}
				height={100}
				autoResize={true}
			/>
		</Link>
	)
}

export default Logo
