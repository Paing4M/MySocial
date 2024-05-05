'use client'

import { getPosts as getPostsService } from '@/services/postService'
import PostCard from '../post/PostCard'
import { useEffect, useState } from 'react'
import { useCurrentUser } from '@/hooks/currentUser'
import PostLoading from '../skeletonLoading/PostLoading'

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
