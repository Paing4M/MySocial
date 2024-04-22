import axiosInstance from '@/lib/axiosInstance'

export const login = async (data: LoginType | undefined) => {
	const res = await axiosInstance.post('/login', data)
	return res.data
}

export const register = async (data: RegisterType | undefined) => {
	const res = await axiosInstance.post('/register', data)
	return res.data
}

export const logout = async () => {
	const res = await axiosInstance.post('/logout')
	return res.data
}
