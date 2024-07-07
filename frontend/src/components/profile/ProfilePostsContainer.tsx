'use client'

import { getPosts as getPostsService } from '@/services/postService'
import PostCard from '../post/PostCard'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/hooks/currentUser'
import PostLoading from '../skeletonLoading/PostLoading'
import { laraEcho } from '@/lib/echoConfig'

const ProfilePostsContainer = () => {
	const [posts, setPosts] = useState<ApiResponseType<PostType> | null>()
	const [loading, setLoading] = useState(false)
	const user = useCurrentUser()

	useEffect(() => {
		if (user) getPosts()
	}, [user])

	const getPosts = async () => {
		setLoading(true)
		const res = await getPostsService(user?.id!)
		if (res) {
			setPosts(res)
			setLoading(false)
		}
	}

	useEffect(() => {
		laraEcho.channel('post_channel').listen('PostDeleteEvent', (e: any) => {
			const id = e.id
			if (posts?.data) {
				const updatedPosts = posts?.data?.filter((post) => post.id !== id)

				setPosts((prev) => {
					return {
						...prev,
						data: updatedPosts,
					}
				})
			}
		})

		return () => {
			laraEcho.leave('post_channel')
		}
	}, [posts])

	return (
		<div>
			{loading && <PostLoading />}
			{posts &&
				posts.data &&
				posts.data.length > 0 &&
				posts.data?.map((post) => <PostCard key={post.id} post={post!} />)}
		</div>
	)
}

export default ProfilePostsContainer
