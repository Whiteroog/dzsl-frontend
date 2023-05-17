import { EnumOrderStatus } from '@/types/order.interface'

const dictionaryTranslate = {
	NEW: 'Новый',
	MAKING: 'Готовится',
	WAITING: 'Ожидает',
	DISPATCHED: 'Отправлен',
	RECEIVED: 'Получен',
	CANCELED: 'Отменен'
}

export const getTranslatedStatus = (status: EnumOrderStatus): string => {
	return dictionaryTranslate[status]
}
