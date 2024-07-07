'use client'

import { getPost } from '@/services/postService'
import { useEffect, useState } from 'react'
import PostCard from './PostCard'

const PostDetailBox = ({ id }: { id: string }) => {
	const [post, setPost] = useState<PostType>()

	useEffect(() => {
		if (!id) return

		getPost(id).then((res) => {
			if (res) {
				setPost(res.data)
			}
		})
	}, [id])

	if (!post) return

	console.log(post)
	return (
		<div>
			<PostCard post={post!} />
		</div>
	)
}

export default PostDetailBox
