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

const Register = () => {
	return (
		<TabsContent value='register'>
			<Card>
				<form action=''>
					<CardHeader className='pb-3'>
						<CardTitle>Register</CardTitle>
						<CardDescription>
							Please register your account here.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2 px-6'>
						<div className='space-y-1'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' defaultValue='name' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' defaultValue='example@email.com' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>
							<Input
								type='password'
								id='password'
								placeholder='******'
							/>
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password_confirmation'>
								Password Confirmation
							</Label>
							<Input
								type='password'
								id='password_confirmation'
								placeholder='******'
							/>
						</div>
					</CardContent>
					<CardFooter>
						<Button>Register</Button>
					</CardFooter>
				</form>
			</Card>
		</TabsContent>
	)
}

export default Register
