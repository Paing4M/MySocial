import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import PostCard from './PostCard'

const PostContainer = () => {
	return (
		<div className='mt-8'>
			<PostCard />
			<PostCard />
			<PostCard />
			<PostCard />
		</div>
	)
}

export default PostContainer
