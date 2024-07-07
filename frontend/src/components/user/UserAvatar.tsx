import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = ({
	name,
	profile_img,
	size = 'md',
}: {
	name: string
	profile_img?: string
	size?: string
}) => {
	return (
		<Avatar
			className={`${
				size == 'md'
					? 'w-[40px] h-[40px]'
					: size == 'lg'
					? 'h-[65px] w-[65px]'
					: ''
			}`}
		>
			<AvatarImage
				className='object-cover'
				src={
					profile_img
						? process.env.NEXT_PUBLIC_API_URL + '/storage/' + profile_img
						: ''
				}
			/>
			<AvatarFallback className='bg-[#C3C5F1]'>
				{name?.slice(0, 2)}
			</AvatarFallback>
		</Avatar>
	)
}

export default UserAvatar
