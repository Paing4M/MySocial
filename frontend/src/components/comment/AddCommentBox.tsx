'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import UserAvatar from '../user/UserAvatar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import { addComment } from '@/services/commentService'
import Error from '../common/Error'
import { toast } from 'react-toastify'

const AddCommentBox = ({
	user,
	postId,
}: {
	user: CustomUser
	postId: string
}) => {
	const [commentState, setCommentState] = useState('')
	const [errors, setErrors] = useState({ comment: '' })

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			const data = {
				comment: commentState,
				post_id: postId,
			}
			const res = await addComment(data)
			if (res?.status == 201) {
				toast.success(res?.message)
				setCommentState('')
				setErrors({
					comment: '',
				})
			}
		} catch (err: any) {
			// console.log(err)
			if (err?.response?.status == 422) {
				setErrors(err?.response?.data?.errors)
			}
		}
	}

	return (
		<div className='flex items-center gap-6'>
			<UserAvatar name={user?.name!} profile_img={user?.profile_img!} />
			<form onSubmit={handleSubmit} className='w-full'>
				<div className='flex items-center gap-2 w-full'>
					<Input
						value={commentState}
						onChange={(e) => setCommentState(e.target.value)}
						className='flex-1'
						placeholder='Share your thought here....'
					/>
					<Button type='submit' variant={'outline'}>
						Send
					</Button>
				</div>
				{errors?.comment && <Error err={errors?.comment?.[0]} />}
			</form>
		</div>
	)
}

export default AddCommentBox
