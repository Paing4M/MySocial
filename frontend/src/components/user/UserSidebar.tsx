'use client'

import UserAvatar from './UserAvatar'
import { Bell, Home, UserRound } from 'lucide-react'
import Link from 'next/link'
import { useActivePath } from '@/hooks/checkActivePath'
import { useCurrentUser } from '@/hooks/currentUser'
import { useNotiContext } from '@/contexts/NotiContext'

const UserSidebar = () => {
	const activePath = useActivePath()
	const user = useCurrentUser()
	const { noti } = useNotiContext()

	const links = [
		{
			name: 'Home',
			icon: Home,
			link: '/',
		},
		{
			name: 'Profile',
			icon: UserRound,
			link: '/profile',
		},
		{
			name: 'Notifications',
			icon: Bell,
			link: '/notifications',
		},
	]

	return (
		<div className='p-6 hidden md:block rounded-lg border shadow-md bg-white w-[280px]'>
			{user && (
				<div className='flex items-center gap-3'>
					<UserAvatar
						name={user?.name!}
						profile_img={user?.profile_img!}
					/>
					<div className='flex flex-col'>
						<span className='font-bold text-lg'>{user?.name}</span>
						<span className='capitalize text-sm text-muted-foreground leading-tight'>
							{user?.bio}
						</span>
					</div>
				</div>
			)}
			<div className={user && 'pt-6'}>
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
								{item.name == 'Notifications' ? (
									<div className='relative'>
										<item.icon />
										{noti && (
											<span className='absolute top-[-4px] right-[-1px] h-3 w-3 bg-red-500 rounded-full'></span>
										)}
									</div>
								) : (
									<item.icon />
								)}
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
