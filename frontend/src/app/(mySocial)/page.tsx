import AddPostCard from '@/components/post/AddPostCard'
import PostContainer from '@/components/post/PostContainer'
import {
	CustomSession,
	CustomUser,
	authOption,
} from '../api/auth/[...nextauth]/authOption'
import { getServerSession } from 'next-auth'

export default async function Home() {
	const session: CustomSession = (await getServerSession(
		authOption
	)) as CustomSession
	const user: CustomUser = session?.user as CustomUser

	return (
		<div className='w-full'>
			{user && <AddPostCard />}
			<PostContainer />
		</div>
	)
}
