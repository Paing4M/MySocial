import { formatDate } from '@/lib/utils'
import UserAvatar from '../user/UserAvatar'

const CommentCard = ({ cmt }: { cmt: CommentType }) => {
	return (
		<div className='bg-[#F1F4F9] py-3 px-5 rounded-lg mb-3 last-of-type:mb-0'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<UserAvatar
						name={cmt?.user?.name}
						profile_img={cmt?.user?.profile_img}
					/>
					<div className='flex flex-col'>
						<span className='font-bold '>{cmt?.user?.name}</span>
						<span className='text-sm text-muted-foreground'>
							{cmt?.user?.bio}
						</span>
					</div>
				</div>

				<div>
					<span className='text-sm text-muted-foreground'>
						{formatDate(cmt?.created_at)}
					</span>
				</div>
			</div>

			<div className='mt-3'>
				<p className='text-sm'>{cmt?.comment}</p>
			</div>
		</div>
	)
}

export default CommentCard
