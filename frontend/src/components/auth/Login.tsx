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

const Login = () => {
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
					<form action=''>
						<div className='space-y-1'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' defaultValue='example@email.com' />
						</div>
						<div className='space-y-1'>
							<Label htmlFor='password'>Password</Label>
							<Input type='password' id='password' placeholder='*****' />
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button>Save changes</Button>
				</CardFooter>
			</Card>
		</TabsContent>
	)
}

export default Login
