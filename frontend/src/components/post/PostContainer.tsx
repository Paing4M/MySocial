'use client'

import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { getPosts as getPostsService } from '@/services/postService'
import PostLoading from '../skeletonLoading/PostLoading'

const PostContainer = () => {
	const [posts, setPosts] = useState<ApiResponseType<PostType> | null>()
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		setLoading(true)
		const res = await getPostsService()
		if (res) {
			setPosts(res)
			setLoading(false)
		}
	}

	return (
		<div className='mt-8 first-of-type:mt-0'>
			{loading && <PostLoading />}

			{posts?.data &&
				posts?.data.length > 0 &&
				posts?.data?.map((post) => <PostCard key={post.id} post={post} />)}
		</div>
	)
}

export default PostContainer
