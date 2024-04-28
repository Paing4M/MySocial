'use client'

import { useState } from 'react'
import { Button } from '../ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { TabsContent } from '../ui/tabs'
import { register } from '@/services/authService'
import InputErr from './InputErr'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'

const Register = () => {
	const [registerState, setRegisterState] = useState<RegisterType>()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: '',
		password_confirmation: '',
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = await register(registerState)
			console.log(res)
			if (res) {
				setLoading(false)
				setErrors({
					name: '',
					email: '',
					password: '',
					password_confirmation: '',
				})
				signIn('credentials', {
					email: registerState?.email,
					password: registerState?.password,
					redirect: true,
					callbackUrl: '/',
				})
				toast.success(res.message)
			}
		} catch (err: any) {
			setLoading(false)
			// console.log(err)
			if (err?.response?.status == 422) {
				setErrors(err?.response?.data?.errors)
			}
		}
	}

	return (
		<TabsContent value='register'>
			<Card>
				<CardHeader className='pb-3'>
					<CardTitle>Register</CardTitle>
					<CardDescription>
						Please register your account here.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2 px-6'>
					<form action='' onSubmit={handleSubmit}>
						<div className='space-y-1'>
							<Label htmlFor='name'>Name</Label>
							<Input
								onChange={handleChange}
								name='name'
								id='name'
								placeholder='name'
							/>
							<InputErr err={errors?.name?.[0]} />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='email'>Email</Label>
							<Input
								onChange={handleChange}
								name='email'
								id='email'
								placeholder='example@email.com'
							/>
							<InputErr err={errors?.email?.[0]} />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>
							<Input
								onChange={handleChange}
								name='password'
								type='password'
								id='password'
								placeholder='******'
							/>
							<InputErr err={errors?.password?.[0]} />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password_confirmation'>
								Password Confirmation
							</Label>
							<Input
								onChange={handleChange}
								name='password_confirmation'
								type='password'
								id='password_confirmation'
								placeholder='******'
							/>
							<InputErr err={errors?.password_confirmation?.[0]} />
						</div>
						<div className='mt-4'>
							<Button
								disabled={loading}
								type='submit'
								className='w-full'
							>
								{loading ? 'Processing' : 'Register'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

export default Register
