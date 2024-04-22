'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import UserAvatar from './UserAvatar'
import { Bell, Home, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useActivePath } from '@/hooks/checkActivePath'
import { useCurrentUser } from '@/hooks/currentUser'

const UserSidebar = () => {
	const activePath = useActivePath()
	const user = useCurrentUser()

	const links = [
		{
			name: 'Home',
			icon: <Home />,
			link: '/',
		},
		{
			name: 'Profile',
			icon: <UserRound />,
			link: '/profile',
		},
		{
			name: 'Notifications',
			icon: <Bell />,
			link: '/notifications',
		},
	]

	return (
		<div className='p-6 hidden md:block rounded-lg border shadow-md bg-white w-[280px]'>
			<div className='flex items-center gap-3'>
				<UserAvatar user={user} />
				<div className='flex flex-col'>
					<span className='font-bold text-lg'>{user?.name}</span>
					<span className=' text-sm text-muted-foreground leading-tight'>
						{user?.bio}
					</span>
				</div>
			</div>
			<div className='pt-6'>
				<ul>
					{links.map((item) => (
						<li key={item.name}>
							<Link
								href={item.link}
								className={`flex items-center gap-2 py-4  ${
									links.length === links.indexOf(item) + 1
										? ''
										: 'border-b'
								}
                ${
							activePath(item.link)
								? 'text-black'
								: 'text-muted-foreground'
						}`}
							>
								{item.icon}
								<span>{item.name}</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default UserSidebar
