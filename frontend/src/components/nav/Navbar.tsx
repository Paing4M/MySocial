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
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
	const user = useCurrentUser()
	const [search, setSearch] = useState('')
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		router.push(`/search?post=${search}`)
	}

	const handleLogout = async () => {
		const res = await logout()
		if (res.status == 200) {
			signOut({ callbackUrl: '/auth', redirect: true })
		}
	}

	return (
		<div className=' bg-white border-b shadow-md'>
			<nav className='p-6 h-[60px] max-w-[1300px] flex items-center justify-between mx-auto'>
				<Link href={'/'}>
					<Image
						src={'/mySocial.png'}
						width={50}
						height={50}
						className='w-12 object-cover'
						alt='logo'
						priority={true}
					/>
				</Link>

				<form action='' onSubmit={handleSubmit} className='hidden md:block'>
					<div className='flex w-[550px] px-4 items-center  border rounded-md'>
						<Search className='text-muted-foreground' />
						<input
							defaultValue={search}
							onChange={(e) => setSearch(e.target.value)}
							className='w-full outline-none border-none h-[40px] ml-4'
							placeholder='Search'
						/>
					</div>
				</form>

				{user ? (
					<div className=''>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<UserAvatar
									name={user?.name!}
									profile_img={user?.profile_img!}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem
									className='cursor-pointer'
									onClick={handleLogout}
								>
									<LogOut className='mr-2 h-4 w-4' />
									<span>Log out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				) : (
					<Link
						className='inline-block px-3 py-1 rounded text-white  bg-[#4361D8]'
						href={'/auth'}
					>
						Login
					</Link>
				)}
			</nav>
		</div>
	)
}

export default Navbar
