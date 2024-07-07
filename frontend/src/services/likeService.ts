import axiosInstance from '@/lib/axiosInstance'

interface DataInterface {
	post_id: string
}

export const addLike = async (data: DataInterface) => {
	const res = await axiosInstance.post('/add-like', data)
	return res.data
}
