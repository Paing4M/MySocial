'use client'

import { Input } from '@/components/ui/input'
import { CloudUpload } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'
import { updateProfile } from '@/services/userService'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'
import { useCurrentUser } from '@/hooks/currentUser'

const GeneralSetting = () => {
	const [inputState, setInputState] = useState({
		name: '',
		bio: '',
	})
	const [image, setImage] = useState<File | null>()
	const [loading, setLoading] = useState(false)
	const { update } = useSession()
	const user = useCurrentUser()

	const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) setImage(file)
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setInputState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const data = {
				name: inputState.name,
				bio: inputState.bio,
				profile_img: image,
			}

			const res = await updateProfile(data)
			console.log(res)
			if (res?.status == 200) {
				setLoading(false)
				toast.success(res?.message)
				update({
					name: res?.user?.name,
					bio: res?.user?.bio,
					profile_img: res?.user?.profile_img,
				})
				setInputState({
					name: '',
					bio: '',
				})
			}
		} catch (err: any) {
			// console.log(err)
			toast.error(err?.response?.data?.message)
			setLoading(false)
		}
	}

	return (
		<div>
			<form action='' onSubmit={handleSubmit}>
				<div className='space-y-5'>
					<div>
						<label
							className='flex items-center  h-10 w-full rounded-md border-dashed border text-sm py-2 px-3 gap-4 text-muted-foreground cursor-pointer active:ring-2 active:ring-ring active:ring-offset-2 '
							htmlFor='image'
						>
							<CloudUpload />
							<p>Choose an image for an avatar</p>
							<input
								onChange={handleImg}
								id='image'
								type='file'
								hidden
							/>
						</label>
					</div>

					{image && (
						<div>
							<Image
								src={URL.createObjectURL(image)}
								width={400}
								height={300}
								className='w-full h-[300px] object-cover'
								alt='profile-img'
							/>
						</div>
					)}

					<Input
						defaultValue={user?.name!}
						name='name'
						onChange={handleChange}
						placeholder='name'
					/>

					<Textarea
						defaultValue={user?.bio!}
						name='bio'
						onChange={handleChange}
						placeholder='Bio'
					/>

					<div>
						<Button disabled={loading} className='px-8' type='submit'>
							{loading ? 'Processing...' : 'Save Changes'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default GeneralSetting
