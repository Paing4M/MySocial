'use client'

import { CloudUpload } from 'lucide-react'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { updatePost } from '@/services/postService'
import Error from '../common/Error'
import { toast } from 'react-toastify'

interface PostEditModalInterface {
	open: boolean
	setOpen: (open: boolean) => void
	post: PostType
}

const PostEditModal = ({ open, setOpen, post }: PostEditModalInterface) => {
	const [image, setImage] = useState<File | null>()
	const [descState, setDescState] = useState(post?.desc)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		image: '',
		desc: '',
	})

	const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) setImage(file)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await updatePost({
				id: post?.id,
				desc: descState,
				image,
			})
			// console.log(res)
			if (res.status == 200) {
				setLoading(false)
				toast.success(res?.message)
				setOpen(false)
			}
		} catch (error: any) {
			// console.log(error)
			setLoading(false)
			if (error?.response?.status == 422) {
				setErrors(error?.response?.data?.errors)
			}
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent
				className='h-fit max-h-[800px] overflow-scroll scrollbar-hide'
				onInteractOutside={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>
						Edit Post
					</DialogTitle>
					<form onSubmit={handleSubmit}>
						<div className='space-y-2 mt-4'>
							<div>
								<label
									htmlFor='img'
									className='flex cursor-pointer text-muted-foreground items-center gap-2 border rounded-md justify-center px-3 py-2 h-10'
								>
									<CloudUpload />
									<span>Choose an image</span>
									<input
										onChange={handleImg}
										id='img'
										type='file'
										hidden
									/>
								</label>
								<Error err={errors?.image?.[0]} />
							</div>
							{(image || post?.image) && (
								<div>
									<Image
										className='w-full h-[300px] rounded-md object-cover'
										width={300}
										height={300}
										src={
											image
												? URL.createObjectURL(image!)
												: process.env.NEXT_PUBLIC_API_URL +
												  '/storage/' +
												  post.image
										}
										alt='img'
									/>
								</div>
							)}

							<div>
								<Textarea
									defaultValue={descState}
									onChange={(e) => setDescState(e.target.value)}
								/>
								<Error err={errors?.desc?.[0]} />
							</div>

							<div>
								<div className='mt-4 flex items-center justify-between'>
									<DialogClose asChild>
										<Button variant={'outline'}>Cancle</Button>
									</DialogClose>

									<Button
										disabled={loading}
										type='submit'
										className=' bg-[#4C68D5] hover:bg-[#4361d8] text-white '
									>
										{loading ? 'Processing...' : 'Update Post'}
									</Button>
								</div>
							</div>
						</div>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default PostEditModal
