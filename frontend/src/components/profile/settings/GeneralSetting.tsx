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
import Error from '@/components/common/Error'

const GeneralSetting = () => {
	const [inputState, setInputState] = useState({
		name: '',
		bio: '',
	})
	const [image, setImage] = useState<File | null>()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		profile_img: '',
		bio: '',
	})
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
			// console.log(res)
			if (res?.status == 200) {
				setLoading(false)
				setErrors({
					profile_img: '',
					bio: '',
				})
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
				setImage(null)
			}
		} catch (err: any) {
			// console.log(err)
			if (err?.response?.status == 422) {
				setErrors(err?.response?.data?.errors)
			}
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
								accept='image/png,image/svg,image/jpg,image/jpeg,image/gif,image/webp'
								hidden
							/>
						</label>

						{image && (
							<div className='mt-2'>
								<Image
									src={URL.createObjectURL(image)}
									width={400}
									height={300}
									className='w-full rounded-lg h-[300px] object-cover'
									alt='profile-img'
								/>
							</div>
						)}

						{errors?.profile_img && (
							<Error err={errors?.profile_img?.[0]} />
						)}
					</div>

					<div>
						<Input
							defaultValue={user?.name!}
							name='name'
							onChange={handleChange}
							placeholder='name'
						/>
					</div>

					<div>
						<Textarea
							defaultValue={user?.bio!}
							name='bio'
							onChange={handleChange}
							placeholder='Bio (Web Developer)'
						/>
						{errors?.bio && <Error err={errors?.bio?.[0]} />}
					</div>

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
