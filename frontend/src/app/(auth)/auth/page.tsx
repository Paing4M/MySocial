import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

const AuthPage = () => {
	return (
		<div className='w-full  h-screen flex items-center justify-center'>
			<div className='flex flex-col space-y-5 items-center'>
				<Image
					src={'/mySocial.png'}
					className='object-cover'
					width={100}
					height={50}
					alt='logo'
				/>

				<Tabs defaultValue='login' className='w-[500px] px-3'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='login'>Login</TabsTrigger>
						<TabsTrigger value='register'>Register</TabsTrigger>
					</TabsList>

					<Login />

					<Register />
				</Tabs>
			</div>
		</div>
	)
}

export default AuthPage
