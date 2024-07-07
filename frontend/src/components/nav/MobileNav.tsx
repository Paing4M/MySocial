'use client'

import { Bell, Home, Search, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useActivePath } from '@/hooks/checkActivePath'
import { useRouter } from 'next/navigation'
import { useNotiContext } from '@/contexts/NotiContext'

const MobileNav = () => {
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const activePath = useActivePath()
	const router = useRouter()
	const { noti } = useNotiContext()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		router.push(`/search?post=${searchTerm}`)
		setOpen(false)
	}

	return (
		<div className='block md:hidden'>
			{open ? (
				<div className='absolute top-0 left-0 w-full h-screen bg-white '>
					<div className='p-6'>
						<form
							onSubmit={handleSubmit}
							className='flex w-full  items-center space-x-2'
						>
							<Input
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder='Search'
							/>
							<Button type='submit'>Search</Button>
						</form>
					</div>
				</div>
			) : (
				<nav className='p-6 h-[60px] flex items-center justify-center  mx-auto border-t shadow-md'>
					<ul className='flex items-center justify-around w-full'>
						<li>
							<Link
								href='/'
								className={`px-2 ${
									activePath('/')
										? 'text-black'
										: 'text-muted-foreground'
								}`}
							>
								<Home />
							</Link>
						</li>

						<li>
							<div
								onClick={() => setOpen(true)}
								className={`px-2 cursor-pointer ${
									activePath('/search')
										? 'text-black'
										: 'text-muted-foreground'
								}`}
							>
								<Search />
							</div>
						</li>

						<li>
							<Link
								href={'/notifications'}
								className={`px-2 ${
									activePath('/notifications')
										? 'text-black'
										: 'text-muted-foreground'
								}`}
							>
								<div className='relative'>
									<Bell />
									{noti && (
										<span className='absolute top-[-4px] right-[-1px] h-3 w-3 bg-red-500 rounded-full'></span>
									)}
								</div>
							</Link>
						</li>

						<li>
							<Link
								href='/profile'
								className={`px-2 ${
									activePath('/profile')
										? 'text-black'
										: 'text-muted-foreground'
								}`}
							>
								<UserRound />
							</Link>
						</li>
					</ul>
				</nav>
			)}
		</div>
	)
}

export default MobileNav
