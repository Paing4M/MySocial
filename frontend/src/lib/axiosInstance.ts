import axios, { InternalAxiosRequestConfig } from 'axios'
import Env from './Env'

const axiosInstance = axios.create({
	baseURL: Env.API_URL + '/api/v1',
})

axiosInstance.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		let headers: any = {
			Accept: 'application/json',
		}

		config.headers = headers
		return config
	},
	async (response) => response,
	async (err) => err
)

export default axiosInstance
