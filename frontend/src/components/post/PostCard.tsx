'use client'

import { Ellipsis, MessageCircle, Pencil, ThumbsUp, Trash } from 'lucide-react'
import UserAvatar from '../user/UserAvatar'
import AddCommentBox from '../comment/AddCommentBox'
import CommentContainer from '../comment/CommentContainer'
import { useEffect, useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/currentUser'
import { formatDate, sliceDesc } from '@/lib/utils'
import { toast } from 'react-toastify'
import { addLike } from '@/services/likeService'
import { laraEcho } from '@/lib/echoConfig'

const PostCard = ({ post }: { post: PostType }) => {
	const [isTruncated, setIsTruncated] = useState(true)
	const [postState, setPostState] = useState(post)
	const user = useCurrentUser()

	const toggleTruncation = () => {
		setIsTruncated(!isTruncated)
	}

	const handleLike = async () => {
		if (!user) {
			toast.warning('Please login to like this post.')
			return
		}

		try {
			const res = await addLike({ post_id: postState?.id })

			if (res.status == 201) {
				setPostState((prev) => ({
					...prev,
					liked_by_user: true,
				}))
			}

			if (res.status == 200) {
				setPostState((prev) => ({
					...prev,
					liked_by_user: false,
				}))
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	useEffect(() => {
		laraEcho
			.channel('post_channel')

			.listen('LikeEvent', (e: any) => {
				console.log(e)
				if (postState?.id == e.data.post_id) {
					setPostState((prev) => ({
						...prev,
						like_count:
							e.data.type === 'like'
								? prev.like_count + 1
								: e.data.type === 'unLike'
								? prev.like_count - 1
								: 0,
					}))
				}
			})

		return () => {
			laraEcho.leave('post_channel')
		}
	}, [])

	return (
		<div className='bg-white border rounded-lg shadow-md mb-8 last-of-type:mb-0'>
			<div className='flex items-center justify-between p-6'>
				<div className='flex items-center gap-3'>
					<UserAvatar
						name={postState?.user?.name!}
						profile_img={postState?.user?.profile_img!}
					/>
					<div className='flex flex-col'>
						<span className='text-lg font-bold'>test</span>
						<span className='text-sm text-muted-foreground leading-tight'>
							{postState?.user?.bio}
						</span>
					</div>
				</div>

				<div>
					<div className='flex flex-col items-end'>
						<DropdownMenu>
							<DropdownMenuTrigger>
								{' '}
								<Ellipsis />
							</DropdownMenuTrigger>
							{postState?.user?.id == user?.id && (
								<DropdownMenuContent>
									<DropdownMenuItem className='cursor-pointer'>
										<Pencil className='mr-2 h-4 w-4' />
										<span>Edit</span>
									</DropdownMenuItem>
									<DropdownMenuItem className='cursor-pointer'>
										<Trash className='mr-2 h-4 w-4' />
										<span>Delete</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							)}
						</DropdownMenu>

						<span className='text-sm text-muted-foreground leading-tight'>
							{formatDate(postState?.created_at!)}
						</span>
					</div>
				</div>
			</div>

			<hr />

			<div className='p-6'>
				<p>
					{sliceDesc(postState?.desc, isTruncated)}{' '}
					{postState?.desc?.length > 200 && (
						<span
							onClick={toggleTruncation}
							className='inline-block ml-1 cursor-pointer text-sm text-[#6174D9]'
						>
							{isTruncated ? 'Read more' : 'Read less'}
						</span>
					)}
				</p>
			</div>

			{postState?.image && (
				<div className='px-6'>
					<Image
						src={
							process.env.NEXT_PUBLIC_API_URL +
							'/storage/' +
							postState?.image
						}
						width={500}
						height={500}
						className='w-full h-[300px]  md:h-[500px] object-cover rounded-lg'
						alt='post-img'
					/>
				</div>
			)}

			{/*  */}
			<div className='p-6 mt-3 flex items-center justify-between'>
				<div className='flex items-end gap-2 '>
					<ThumbsUp
						onClick={handleLike}
						className={` cursor-pointer ${
							postState?.liked_by_user ? 'text-[#4C68D5]' : 'text-black'
						}`}
					/>
					{postState?.like_count > 0 && (
						<span className='text-sm '>( {postState?.like_count} )</span>
					)}
				</div>

				<div className='flex items-end gap-2 cursor-pointer'>
					<MessageCircle />
					<span className='text-sm'>Comment</span>
				</div>
			</div>

			{/* comments */}
			<div className='mt-3 px-6 pb-6'>
				{user && <AddCommentBox user={user} postId={postState?.id} />}

				{postState?.comments && postState?.comments?.length > 0 && (
					<CommentContainer comments={postState?.comments} />
				)}
			</div>
		</div>
	)
}

export default PostCard
