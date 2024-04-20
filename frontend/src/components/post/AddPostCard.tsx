'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import UserAvatar from '../user/UserAvatar'
import { Image as ImageIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import Image from 'next/image'

const AddPostCard = ({ user }: { user: CustomUser }) => {
	const [image, setImage] = useState<File | null>(null)

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) setImage(file)
	}

	console.log(typeof image)

	return (
		<div className='bg-white shadow-md rounded-lg border p-4'>
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
									<ImageIcon />
									<span>Add Media</span>
								</label>
								<input
									onChange={handleImage}
									type='file'
									hidden
									id='image'
								/>
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

				{image && (
					<div className='mt-3'>
						<Image
							src={image ? URL.createObjectURL(image) : ''}
							width={400}
							height={400}
							alt='image'
							className='w-full object-cover rounded-lg '
						/>
					</div>
				)}
			</form>
		</div>
	)
}

export default AddPostCard
