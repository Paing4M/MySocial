import UserAvatar from '../user/UserAvatar'

const CommentCard = () => {
	return (
		<div className='bg-[#F1F4F9] p-6 rounded-lg mb-3 last-of-type:mb-0'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<UserAvatar user={{ name: 'haha' }} />
					<div className='flex flex-col'>
						<span className='font-bold '>haha</span>
						<span className='text-sm text-muted-foreground'>
							Designer
						</span>
					</div>
				</div>

				<div>
					<span className='text-sm text-muted-foreground'>2 days ago</span>
				</div>
			</div>

			<div className='mt-3'>
				<p className='text-sm'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit.
					Blanditiis at corrupti officia aperiam consequatur et
					accusantium! Error officiis voluptatum dolore, ratione quis eum,
					rerum facere minus accusantium incidunt molestiae nulla.
				</p>
			</div>
		</div>
	)
}

export default CommentCard
