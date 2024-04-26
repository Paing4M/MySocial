import axiosInstance from '@/lib/axiosInstance'

interface DataInterface {
	comment: string
	post_id: string
}

export const addComment = async (data: DataInterface) => {
	const res = await axiosInstance.post('/comments', data)
	return res.data
}
