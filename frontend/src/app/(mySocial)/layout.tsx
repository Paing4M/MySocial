import Navbar from '@/components/nav/Navbar'
import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import {
	CustomSession,
	CustomUser,
	authOption,
} from '../api/auth/[...nextauth]/authOption'
import MobileNav from '@/components/nav/MobileNav'
import UserSidebar from '@/components/user/UserSidebar'

export const metadata: Metadata = {
	title: 'My Social | Home Page',
	icons: {
		icon: '/favicon.ico',
	},
}

export default async function MySocialLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session: CustomSession = (await getServerSession(
		authOption
	)) as CustomSession
	const user: CustomUser = session.user as CustomUser

	return (
		<div>
			<Navbar user={user!} />

			<div className='max-w-[1300px] h-[calc(100vh-128px)] md:h-auto overflow-y-scroll p-4 mx-auto flex items-start gap-8'>
				<UserSidebar user={user} />
				<div className='flex-1'>{children}</div>
			</div>

			{/* mobile navigation */}
			<MobileNav />
		</div>
	)
}
