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

interface PostDeleteModalInterface {
	open: boolean
	setOpen: (open: boolean) => void
	post: PostType
}

const PostDeleteModal = ({ open, setOpen, post }: PostDeleteModalInterface) => {
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete
						your account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default PostDeleteModal
