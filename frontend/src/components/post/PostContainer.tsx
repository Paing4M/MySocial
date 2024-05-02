'use client'

import { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { getPosts as getPostsService } from '@/services/postService'
import PostLoading from '../skeletonLoading/PostLoading'
import { laraEcho } from '@/lib/echoConfig'
import { useCurrentUser } from '@/hooks/currentUser'

const PostContainer = () => {
	const [posts, setPosts] = useState<ApiResponseType<PostType> | null>()
	const [loading, setLoading] = useState(false)
	const user = useCurrentUser()

	console.log(posts?.data)

	useEffect(() => {
		getPosts()
	}, [])

	useEffect(() => {
		laraEcho
			.channel('post_channel')
			.listen('PostCreateEvent', (e: any) => {
				if (e.post) {
					const post: PostType = e.post

					setPosts((prev) => {
						if (prev && prev.data) {
							return {
								...prev,
								data: [post, ...prev.data],
							}
						}
						return prev
					})
				}
			})
			.listen('PostUpdateEvent', (e: any) => {
				console.log(e)
				const post: PostType = e.post
				setPosts((prev) => {
					if (prev && prev.data) {
						const updatedData = prev.data.map((prevPost) =>
							prevPost.id === post.id ? post : prevPost
						)
						console.log('up', updatedData)

						return {
							...prev,
							data: updatedData,
						}
					}

					return prev
				})
			})

		return () => {
			laraEcho.leave('post_channel')
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

			{posts &&
				posts.data &&
				posts.data.length > 0 &&
				posts.data?.map((post) => <PostCard key={post.id} post={post!} />)}
		</div>
	)
}

export default PostContainer
