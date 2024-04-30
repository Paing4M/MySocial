'use client'

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
			icon: (
				<div className='relative'>
					<Bell />
					{/* {user?.notifications && user?.notifications?.length > 0 && (
						<div className='absolute top-0 right-[3px] w-[10px] h-[10px] rounded-full bg-red-500'></div>
					)} */}
				</div>
			),
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
