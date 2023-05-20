import { axiosAuth } from '@/api/api.interceptor'

export const FileService = {
	async upload(file: FormData, folder?: string) {
		return axiosAuth.post<{ url: string; name: string }[]>('/files', file, {
			params: { folder },
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}
