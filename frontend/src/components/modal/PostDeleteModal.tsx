'use client'

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
} from '../ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import { useState } from 'react'
import { deletePost } from '@/services/postService'
import { toast } from 'react-toastify'

interface PostDeleteModalInterface {
	open: boolean
	setOpen: (open: boolean) => void
	postId: string
}

const PostDeleteModal = ({
	open,
	setOpen,
	postId,
}: PostDeleteModalInterface) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = await deletePost(postId)
			if (res.status == 200) {
				setLoading(false)
				console.log(res)
				toast.success(res?.message)
				setOpen(false)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className='text-xl font-bold'>
						Are you absolutely sure?
					</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete
						your post and remove your data from our servers.
					</DialogDescription>

					<form action='' onSubmit={handleSubmit}>
						<div className='mt-4 flex items-center justify-between'>
							<DialogClose asChild>
								<Button variant={'outline'}>Cancle</Button>
							</DialogClose>

							<Button
								disabled={loading}
								type='submit'
								variant={'destructive'}
							>
								{loading ? 'Processing...' : 'Delete Post'}
							</Button>
						</div>
					</form>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default PostDeleteModal
