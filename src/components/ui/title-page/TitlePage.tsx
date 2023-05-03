import { FC } from 'react'

interface ITitlePage {
	title?: string
}

const TitlePage: FC<ITitlePage> = ({ title }) => {
	return title ? <h1 className='mb-10 text-2xl font-bold'>{title}</h1> : <></>
}

export default TitlePage
