import { Skeleton } from '../ui/skeleton'
import Loader from './Loader'

const Loading = () => {
	return (
		<div className='border-b last-of-type:bottom-0 p-6 first-of-type:pt-0'>
			<div className='flex items-start sm:items-center justify-between '>
				<div className='flex items-start sm:items-center gap-2 flex-col sm:flex-row'>
					<div className='flex items-center gap-3 sm:gap-2'>
						<Skeleton className='w-[40px] h-[40px] rounded-full'></Skeleton>
						<div className='flex sm:items-center sm:gap-2 flex-col sm:flex-row'>
							{/* <p className='font-bold leading-tight'>{noti.user.name}</p> */}
							<Skeleton className='h-2 w-24'></Skeleton>
						</div>
					</div>
				</div>

				<Skeleton className='h-2 w-16'></Skeleton>
			</div>
		</div>
	)
}

const NotiLoading = () => {
	return (
		<Loader>
			<Loading />
			<Loading />
			<Loading />
			<Loading />
			<Loading />
			<Loading />
			<Loading />
			<Loading />
			<Loading />
			<Loading />
		</Loader>
	)
}

export default NotiLoading
