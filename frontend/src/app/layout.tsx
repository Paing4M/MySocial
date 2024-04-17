import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
	variable: '--roboto-font',
})

export const metadata: Metadata = {
	title: 'My Social | Welcome to My Socail',
	description: 'Try to create amazing web.',
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.variable} bg-bgColor`}>{children}</body>
		</html>
	)
}
