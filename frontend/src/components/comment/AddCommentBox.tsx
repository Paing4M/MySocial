import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import UserAvatar from '../user/UserAvatar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const AddCommentBox = ({ user }: { user: CustomUser }) => {
	return (
		<div className='flex items-center gap-6'>
			<UserAvatar name={user?.name!} profile_img={user?.profile_img!} />
			<div className='flex items-center gap-2 w-full'>
				<Input
					className='flex-1'
					placeholder='Share your thought here....'
				/>
				<Button variant={'outline'}>Send</Button>
			</div>
		</div>
	)
}

export default AddCommentBox
