import { getServerSession } from 'next-auth'
import {
	CustomSession,
	CustomUser,
	authOption,
} from '../api/auth/[...nextauth]/authOption'
import AddPostCard from '@/components/user/AddPostCard'

export default async function Home() {
	const session: CustomSession = (await getServerSession(
		authOption
	)) as CustomSession
	const user: CustomUser = session.user as CustomUser

	return (
		<div className='w-full '>
			<AddPostCard user={user} />
		</div>
	)
}
