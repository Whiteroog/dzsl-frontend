import { FC } from 'react'

interface ITitlePage {
	title?: string
}

const TitlePage: FC<ITitlePage> = ({ title }) => {
	return title ? (
		<h1 className='mb-10 pl-0 text-center sm:pl-[12%] sm:text-start'>
			{title}
		</h1>
	) : (
		<></>
	)
}

export default TitlePage
