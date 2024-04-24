'use client'

import { Ellipsis, MessageCircle, Pencil, ThumbsUp, Trash } from 'lucide-react'
import UserAvatar from '../user/UserAvatar'
import AddCommentBox from '../comment/AddCommentBox'
import CommentContainer from '../comment/CommentContainer'
import { useState } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const PostCard = ({ post }: { post: Post }) => {
	const [isTruncated, setIsTruncated] = useState(true)

	const toggleTruncation = () => {
		setIsTruncated(!isTruncated)
	}

	let postDesc = post?.desc

	const displayedText = isTruncated
		? `${postDesc.slice(0, 200)} ...`
		: postDesc

	return (
		<div className='bg-white border rounded-lg shadow-md mb-8 last-of-type:mb-0'>
			<div className='flex items-center justify-between p-6'>
				<div className='flex items-center gap-3'>
					<UserAvatar user={post?.user!} />
					<div className='flex flex-col'>
						<span className='text-lg font-bold'>test</span>
						<span className='text-sm text-muted-foreground leading-tight'>
							{post?.user?.bio}
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
						</DropdownMenu>

						<span className='text-sm text-muted-foreground leading-tight'>
							2 days ago
						</span>
					</div>
				</div>
			</div>

			<hr className='my-2' />

			<div className='p-6'>
				<p>
					{displayedText}{' '}
					{postDesc?.length > 200 && (
						<span
							onClick={toggleTruncation}
							className='inline-block ml-1 cursor-pointer text-sm text-[#6174D9]'
						>
							{isTruncated ? 'Read more' : 'Read less'}
						</span>
					)}
				</p>
			</div>

			{post?.image && (
				<div className='p-6'>
					<Image
						src={
							process.env.NEXT_PUBLIC_API_URL + '/storage/' + post?.image
						}
						width={500}
						height={500}
						className='w-full h-[500px] object-cover'
						alt='post-img'
					/>
				</div>
			)}

			{/*  */}
			<div className='p-6 flex items-center justify-between'>
				<div className='flex items-end gap-2 '>
					<ThumbsUp className='text-[#4C68D5] cursor-pointer' />
					<span className='text-sm '>100 likes</span>
				</div>

				<div className='flex items-end gap-2 cursor-pointer'>
					<MessageCircle />
					<span className='text-sm'>Comment</span>
				</div>
			</div>

			{/* comments */}
			<div className='mt-3 p-6'>
				<AddCommentBox user={{ name: 'abc3f' }} />
				<CommentContainer />
			</div>
		</div>
	)
}

export default PostCard
