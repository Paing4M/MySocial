'use client'

import UserAvatar from '../user/UserAvatar'
import { Image as ImageIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { createPost } from '@/services/postService'
import Error from '../common/Error'
import { useCurrentUser } from '@/hooks/currentUser'

const AddPostCard = () => {
	const [image, setImage] = useState<File | null>()
	const [desc, setDesc] = useState('')
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		image: '',
		desc: '',
	})
	const router = useRouter()
	const user = useCurrentUser()

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) setImage(file)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!user) {
			toast.warning('Please login to add a post.')
			router.push('/auth')
		} else {
			setLoading(true)
			try {
				const res = await createPost({
					desc,
					image,
				})
				// console.log(res)
				if (res?.status == 201) {
					setLoading(false)
					setDesc('')
					setErrors({
						image: '',
						desc: '',
					})
					setImage(null)

					toast.success(res?.message)
				}
			} catch (error: any) {
				setLoading(false)
				if (error?.response?.status == 422) {
					setErrors(error?.response?.data?.errors)
				}
			}
		}
	}

	return (
		<div className='bg-white shadow-md rounded-lg border p-6'>
			<form action='' onSubmit={handleSubmit}>
				<div className='flex items-start space-x-4'>
					<UserAvatar
						name={user?.name!}
						profile_img={user?.profile_img!}
					/>
					<div className='w-full'>
						<input
							value={desc}
							onChange={(e) => setDesc(e.target.value)}
							className='outline-none border-none w-full py-2'
							type='text'
							placeholder="What's on your mind?"
						/>
						{errors?.desc && <Error err={errors?.desc?.[0]} />}

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
								disabled={loading}
								type='submit'
								className='rounded-3xl px-6 bg-[#4C68D5] hover:bg-[#4361d8]'
								size={'sm'}
							>
								{loading ? 'Processing...' : 'Post'}
							</Button>
						</div>
					</div>
				</div>

				{errors?.image && <Error err={errors?.image?.[0]} />}
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
