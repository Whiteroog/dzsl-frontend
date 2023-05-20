import { FormElement, Image, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { EnumLinks } from '@/types/links.enum'

import { FileService } from '@/services/file.service'

const UploadImage: FC<{
	onChange: (...event: any[]) => void
	existsImageSrc?: string
}> = ({ onChange, existsImageSrc }) => {
	const [imageSrc, setImageSrc] = useState('')

	/* upload image */
	const { mutateAsync } = useMutation({
		mutationKey: ['upload image product on create'],
		mutationFn: (data: FormData) => FileService.upload(data, 'products'),
		onSuccess(data) {
			setImageSrc(data.data[0].name)
			onChange(data.data[0].name)
		}
	})

	const uploadImage = async (e: ChangeEvent<FormElement>) => {
		const files = (e.target as HTMLInputElement).files

		if (files?.length) {
			const formData = new FormData()
			formData.append('image', files[0])

			await mutateAsync(formData)
		}
	}

	useEffect(() => {
		setImageSrc(existsImageSrc ?? '')
	}, [existsImageSrc])

	return (
		<div>
			<Input
				type='file'
				label='Изображение'
				width='100%'
				onChange={uploadImage}
			/>

			{imageSrc !== '' ? (
				<div className='p-6'>
					<Image
						src={EnumLinks.PRODUCT_IMAGES + imageSrc}
						autoResize
						width='200px'
					/>
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default UploadImage
