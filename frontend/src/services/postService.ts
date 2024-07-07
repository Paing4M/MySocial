import axiosInstance from '@/lib/axiosInstance'

interface PostInterface {
	id?: string
	desc: any
	image?: File | null
	_method?: string
}

export const createPost = async (data: PostInterface) => {
	const res = await axiosInstance.post('/posts', data)
	return res.data
}

export const getPosts = async (user?: string, searchTerm?: any) => {
	const params = {
		searchTerm,
		user,
	}

	const res = await axiosInstance.get(`/posts`, { params })
	return res.data
}

export const getPost = async (id: string) => {
	const res = await axiosInstance.get(`/posts/${id}`)
	return res.data
}

export const updatePost = async (data: PostInterface) => {
	data._method = 'PUT'

	const res = await axiosInstance.post('/posts/' + data?.id, data)
	return res.data
}

export const deletePost = async (id: string) => {
	const res = await axiosInstance.delete('/posts/' + id)
	return res.data
}
