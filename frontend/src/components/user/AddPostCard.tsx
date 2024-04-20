'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import UserAvatar from './UserAvatar'
import { Image } from 'lucide-react'
import { Button } from '../ui/button'

const AddPostCard = ({ user }: { user: CustomUser }) => {
	return (
		<div className='bg-white shadow-sm rounded-lg border p-4'>
			<form action=''>
				<div className='flex items-start space-x-4'>
					<UserAvatar user={user} />
					<div className='w-full'>
						<input
							className='outline-none border-none w-full py-2'
							type='text'
							placeholder="What's on your mind?"
						/>
						<hr className='mt-3' />

						<div className='flex items-center justify-between mt-5 w-full '>
							<div>
								<label
									htmlFor='image'
									className='flex space-x-3 cursor-pointer px-2 items-center'
								>
									<Image />
									<span>Add Media</span>
								</label>
								<input type='file' hidden id='image' />
							</div>

							<Button
								type='submit'
								className='rounded-3xl px-6 bg-[#4C68D5] hover:bg-[#4361d8]'
								size={'sm'}
							>
								Post
							</Button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)
}

export default AddPostCard
