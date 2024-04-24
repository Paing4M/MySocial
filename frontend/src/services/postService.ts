import axiosInstance from '@/lib/axiosInstance'

export const createPost = async (data: CreatePostType) => {
	const res = await axiosInstance.post('/posts', data)
	return res.data
}

export const getPosts = async () => {
	const res = await axiosInstance.get('/posts')
	return res.data
}
