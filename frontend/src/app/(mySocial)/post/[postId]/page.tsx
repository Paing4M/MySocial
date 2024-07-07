import PostDetailBox from '@/components/post/PostDetailBox'
import { getPost } from '@/services/postService'

interface DetailPostProps {
	params: {
		postId: string
	}
}

const DetailPost: React.FC<DetailPostProps> = async ({ params }) => {
	return <PostDetailBox id={params.postId} />
}

export default DetailPost
