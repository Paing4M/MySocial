import axios, { InternalAxiosRequestConfig } from 'axios'
import Env from './Env'
import { CustomSession } from '@/app/api/auth/[...nextauth]/authOption'
import { getSession } from 'next-auth/react'

const axiosInstance = axios.create({
	baseURL: Env.API_URL + '/api/v1',
})

axiosInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const session: CustomSession = (await getSession()) as CustomSession
		const token = session?.user?.token

		let headers: any = {
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		}

		if (
			(config?.url?.includes('/update-profile') ||
				config?.url?.includes('/posts')) &&
			config.method == 'post'
		) {
			headers = {
				...headers,
				'Content-Type': 'multipart/form-data',
			}
		}

		config.headers = headers
		return config
	},
	async (response) => response
)

export default axiosInstance
