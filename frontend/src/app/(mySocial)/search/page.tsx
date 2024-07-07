import PostCard from '@/components/post/PostCard'
import PostLoading from '@/components/skeletonLoading/PostLoading'
import { getPosts } from '@/services/postService'
import Link from 'next/link'

const SearchPage = async ({ searchParams }: { searchParams: any }) => {
	const { post } = searchParams

	const posts: ApiResponseType<PostType> = await getPosts(undefined, post)

	return (
		<div>
			{!posts && <PostLoading />}
			{posts?.data && posts.data.length == 0 && (
				<div className='flex flex-col items-center justify-center '>
					<p className='text-center text-lg'>
						No search result for{' '}
						<span className='text-[#4361D8] font-bold'>{post}</span>
					</p>
					<Link className='text-center text-[#4361D8]' href='/'>
						Go Home
					</Link>
				</div>
			)}

			<div>
				{posts?.data && posts.data.length > 0 && (
					<h1 className='text-2xl py-4 block md:hidden'>
						<Link href={'/'}>Home</Link> /
						<span className='font-bold ml-1 inline-block text-[#4361D8]'>
							{post}
						</span>
					</h1>
				)}
				{posts?.data && posts.data.map((post) => <PostCard post={post} />)}
			</div>
		</div>
	)
}

export default SearchPage
