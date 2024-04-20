import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = ({ user }: { user: CustomUser }) => {
	return (
		<Avatar>
			<AvatarImage src={user?.profile_image!} />
			<AvatarFallback className='bg-[#C3C5F1]'>
				{user?.name?.slice(0, 3)}
			</AvatarFallback>
		</Avatar>
	)
}

export default UserAvatar
