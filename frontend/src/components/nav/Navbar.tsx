'use client'

import Image from 'next/image'
import { LogOut, Search } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from '../user/UserAvatar'
import { useCurrentUser } from '@/hooks/currentUser'
import { logout } from '@/services/authService'
import { signOut } from 'next-auth/react'

const Navbar = () => {
	const user = useCurrentUser()

	const handleLogout = async () => {
		const res = await logout()
		if (res.status == 200) {
			signOut({ callbackUrl: '/auth', redirect: true })
		}
	}

	return (
		<div className=' bg-white border-b shadow-md'>
			<nav className='p-6 h-[60px] max-w-[1300px] flex items-center justify-between mx-auto'>
				<Image
					src={'/mySocial.png'}
					width={50}
					height={50}
					className='w-12 object-cover'
					alt='logo'
				/>

				<div className='hidden md:flex w-[550px] px-4 items-center  border rounded-md'>
					<Search className='text-muted-foreground' />
					<input
						className='w-full outline-none border-none h-[40px] ml-4'
						placeholder='Search'
					/>
				</div>

				<div className=''>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<UserAvatar user={user} />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
