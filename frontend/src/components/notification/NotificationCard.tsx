import UserAvatar from '../user/UserAvatar'

const NotificationCard = () => {
	return (
		<div className='border-b last-of-type:bottom-0 p-6 first-of-type:pt-0'>
			<div className='flex items-start sm:items-center justify-between '>
				<div className='flex items-start sm:items-center gap-2 flex-col sm:flex-row'>
					<div className='flex items-center gap-3 sm:gap-2'>
						<UserAvatar user={{ name: 'abc' }} />
						<div className='flex sm:items-center sm:gap-2 flex-col sm:flex-row'>
							<p className='font-bold leading-tight'>abc</p>
							<p className='text-sm text-muted-foreground leading-tight'>
								is liked your post.
							</p>
						</div>
					</div>
				</div>

				<p className='text-sm text-muted-foreground'>12 hours ago</p>
			</div>
		</div>
	)
}

export default NotificationCard
