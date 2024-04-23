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
import { toast } from 'react-toastify'
import { login } from '@/services/authService'
import InputErr from './InputErr'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

const Login = () => {
	const [loginState, setLoginState] = useState<LoginType>()
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		email: '',
		password: '',
		incorrect: '',
	})
	const searchParam = useSearchParams()
	const callbackUrl = searchParam.get('callbackUrl')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginState((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)

		try {
			const res = await login(loginState)
			console.log(res)
			if (res) {
				setLoading(false)
				setErrors({
					email: '',
					password: '',
					incorrect: '',
				})
				signIn('credentials', {
					email: loginState?.email,
					password: loginState?.password,
					redirect: true,
					callbackUrl: callbackUrl ? callbackUrl : '/',
				})
				toast.success(res.message)
			}
		} catch (err: any) {
			setLoading(false)
			console.log(err)
			if (err?.response?.status == 422 || err?.response?.status == 401) {
				setErrors(err?.response?.data?.errors)
			}
		}
	}

	return (
		<TabsContent value='login'>
			<Card>
				<CardHeader className='pb-3'>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Please login your account here.
					</CardDescription>
				</CardHeader>
				<CardContent className='space-y-2 px-6'>
					<form action='' onSubmit={handleSubmit}>
						<InputErr err={errors?.incorrect?.[0]} />
						<div className='space-y-1'>
							<Label htmlFor='email'>Email</Label>
							<Input
								name='email'
								onChange={handleChange}
								id='email'
								placeholder='example@email.com'
							/>
							<InputErr err={errors?.email?.[0]} />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>
							<Input
								name='password'
								onChange={handleChange}
								type='password'
								id='password'
								placeholder='*****'
							/>
							<InputErr err={errors?.password?.[0]} />
						</div>

						<div className='mt-4'>
							<Button
								type='submit'
								className='w-full'
								disabled={loading}
							>
								{loading ? 'Processing...' : 'Login'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</TabsContent>
	)
}

export default Login
