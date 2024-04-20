import { Ellipsis, MessageCircle, ThumbsUp } from 'lucide-react'
import UserAvatar from '../user/UserAvatar'
import AddCommentBox from '../comment/AddCommentBox'
import CommentContainer from '../comment/CommentContainer'
import Link from 'next/link'

const PostCard = () => {
	return (
		<div className='bg-white border rounded-lg shadow-md mb-8 last-of-type:mb-0'>
			<Link
				href='/post/123'
				className='flex items-center justify-between p-4'
			>
				<div className='flex items-center gap-3'>
					<UserAvatar
						user={{
							name: 'abc3f',
							profile_image: '',
						}}
					/>
					<div className='flex flex-col'>
						<span className='text-lg font-bold'>test</span>
						<span className='text-sm text-muted-foreground leading-tight'>
							web developer
						</span>
					</div>
				</div>

				<div>
					<div className='flex flex-col items-end'>
						<Ellipsis />
						<span className='text-sm text-muted-foreground leading-tight'>
							2 days ago
						</span>
					</div>
				</div>
			</Link>

			<hr className='my-2' />

			<div className='p-4'>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Aspernatur, impedit? Eaque voluptate officia debitis quo
					accusamus expedita mollitia optio consectetur exercitationem
					consequatur soluta magni perspiciatis, libero at! Omnis,
					voluptate! Cumque fugiat aliquid, unde aut nobis dolorem ea error
					molestias quidem.
				</p>
			</div>

			{/*  */}
			<div className='p-4 flex items-center justify-between'>
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
			<div className='mt-3 p-4'>
				<AddCommentBox user={{ name: 'abc3f' }} />
				<CommentContainer />
			</div>
		</div>
	)
}

export default PostCard
