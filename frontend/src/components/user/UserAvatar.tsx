import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserAvatar = ({ user }: { user: CustomUser }) => {
	return (
		<Avatar>
			<AvatarImage src={user?.profile_image} />
			<AvatarFallback>{user?.name?.split(0, 2)}</AvatarFallback>
		</Avatar>
	)
}

export default UserAvatar
