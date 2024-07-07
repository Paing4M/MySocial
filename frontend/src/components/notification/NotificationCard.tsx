import { formatDate } from '@/lib/utils'
import UserAvatar from '../user/UserAvatar'

const NotificationCard = ({ noti }: { noti: NotiType }) => {
	return (
		<div className='border-b last-of-type:bottom-0 p-6 first-of-type:pt-0'>
			<div className='flex items-start sm:items-center justify-between '>
				<div className='flex items-start sm:items-center gap-2 flex-col sm:flex-row'>
					<div className='flex items-center gap-3 sm:gap-2'>
						<UserAvatar
							name={noti.user.name}
							profile_img={noti.user.profile_img}
						/>
						<div className='flex sm:items-center sm:gap-2 flex-col sm:flex-row'>
							{/* <p className='font-bold leading-tight'>{noti.user.name}</p> */}
							<p className='text-md tracking-wide'>{noti.title}</p>
						</div>
					</div>
				</div>

				<p className='text-sm text-muted-foreground'>
					{formatDate(noti.created_at)}
				</p>
			</div>
		</div>
	)
}

export default NotificationCard
