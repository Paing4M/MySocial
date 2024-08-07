import { Skeleton } from '../ui/skeleton'
import Loader from './Loader'

const Loading = () => {
	return (
		<div className='bg-white rounded-lg border shadow-md  mb-8'>
			<div className='flex items-center gap-3 p-6'>
				<Skeleton className='w-[40px] h-[40px] rounded-full' />
				<Skeleton className='w-[100px] h-[20px]' />
			</div>

			<hr />

			<div className='p-6 space-y-1'>
				<Skeleton className='w-full h-[20px]' />
				<Skeleton className='w-full h-[20px]' />
			</div>
		</div>
	)
}

const PostLoading = () => {
	return (
		<Loader>
			<Loading />
			<Loading />
			<Loading />
		</Loader>
	)
}

export default PostLoading
