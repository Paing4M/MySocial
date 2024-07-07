import Navbar from '@/components/nav/Navbar'
import type { Metadata } from 'next'
import MobileNav from '@/components/nav/MobileNav'
import UserSidebar from '@/components/user/UserSidebar'
import Container from '@/components/main/Container'

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
	return (
		<div>
			<Container>{children}</Container>
		</div>
	)
}
