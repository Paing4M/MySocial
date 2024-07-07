import axiosInstance from '@/lib/axiosInstance'

interface dataInterface {
	name?: string
	bio?: string | number
	profile_img?: File | null
}

export const updateProfile = async (data: dataInterface) => {
	const res = await axiosInstance.post('/update-profile', data)
	return res.data
}

export const getNoti = async () => {
	const res = await axiosInstance.get('/user-noti')
	return res.data
}
