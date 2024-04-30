'use client'

import { useEffect, useState } from 'react'
import MobileNav from '../nav/MobileNav'
import Navbar from '../nav/Navbar'
import UserSidebar from '../user/UserSidebar'
import { useCurrentUser } from '@/hooks/currentUser'
import { privateLaraEcho } from '@/lib/echoConfig'
import { toast } from 'react-toastify'

const Container = ({ children }: { children: React.ReactNode }) => {
	const user = useCurrentUser()

	useEffect(() => {
		if (user) {
			const echo = privateLaraEcho(user?.token!)
			echo.private(`notifications.${user?.id}`).notification((e: any) => {
				console.log(e)
				if (e.data.user.id != user.id) {
					toast.success(e.data.title)
				}
			})
		}
	}, [user])

	return (
		<>
			<Navbar />

			<div className='max-w-[1300px] h-[calc(100vh-128px)] md:h-auto overflow-y-scroll p-6 mx-auto flex items-start gap-8'>
				<UserSidebar />
				<div className='flex-1'>{children}</div>
			</div>

			{/* mobile navigation */}
			<MobileNav />
		</>
	)
}

export default Container
