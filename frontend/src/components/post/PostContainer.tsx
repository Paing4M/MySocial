'use client'

import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { getPosts as getPostsService } from '@/services/postService'

const PostContainer = () => {
	const [posts, setPosts] = useState<PostApiResponseType | null>()

	useEffect(() => {
		getPosts()
	}, [])

	const getPosts = async () => {
		const res = await getPostsService()
		if (res) setPosts(res)
	}

	return (
		<div className='mt-8 first-of-type:mt-0'>
			{posts?.data &&
				posts?.data.length > 0 &&
				posts?.data?.map((post) => <PostCard key={post.id} post={post} />)}
		</div>
	)
}

export default PostContainer
