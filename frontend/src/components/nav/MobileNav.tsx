'use client'

import { Bell, Home, Search, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useActivePath } from '@/hooks/checkActivePath'

const MobileNav = () => {
	const [open, setOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const activePath = useActivePath()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<div className='block md:hidden'>
			{open ? (
				<div className='absolute top-0 left-0 w-full h-screen bg-white '>
					<div className='p-4'>
						<form
							onSubmit={handleSubmit}
							className='flex w-full  items-center space-x-2'
						>
							<Input placeholder='Search' />
							<Button type='submit'>Search</Button>
						</form>
					</div>
				</div>
			) : (
				<nav className='p-4 h-[60px] flex items-center justify-center  mx-auto border-t shadow-md'>
					<ul className='flex items-center justify-between w-full'>
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
								<Bell />
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
