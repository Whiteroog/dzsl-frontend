import { FormElement } from '@nextui-org/react'
import { ChangeEvent, useCallback, useState } from 'react'

const useInput = <T>(initialValue: T) => {
	const [value, setValue] = useState(initialValue)

	const onChange = useCallback(
		(e: ChangeEvent<FormElement>) => setValue(e.currentTarget.value as T),
		[]
	)

	return {
		value,
		onChange,
		setValue
	}
}

export default useInput
