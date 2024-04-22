import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = ({
	user,
	size = 'md',
}: {
	user: CustomUser
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
					user?.profile_img
						? process.env.NEXT_PUBLIC_API_URL +
						  '/storage/' +
						  user?.profile_img
						: ''
				}
			/>
			<AvatarFallback className='bg-[#C3C5F1]'>
				{user?.name?.slice(0, 3)}
			</AvatarFallback>
		</Avatar>
	)
}

export default UserAvatar
