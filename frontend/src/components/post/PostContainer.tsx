'use client'

import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { getPosts as getPostsService } from '@/services/postService'
import PostLoading from '../skeletonLoading/PostLoading'
import { laraEcho } from '@/lib/echoConfig'

const PostContainer = () => {
	const [posts, setPosts] = useState<ApiResponseType<PostType>>()
	const [loading, setLoading] = useState(false)

	console.log(posts?.data)

	useEffect(() => {
		getPosts()
	}, [])

	useEffect(() => {
		laraEcho.channel('post_create').listen('PostCreateEvent', (e: any) => {
			// console.log(e)
			if (e.post) {
				const post: PostType = e.post

				setPosts((prev: any) => {
					return {
						...prev,
						data: [post, ...prev.data],
					}
				})
			}
		})

		return () => {
			laraEcho.leave('test')
		}
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
