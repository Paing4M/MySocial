import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from '@/provider/AuthProvider'

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['300', '400', '500', '700'],
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
			<body
				className={roboto.className + ' bg-bgColor'}
				suppressHydrationWarning
			>
				<AuthProvider>{children}</AuthProvider>
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
					theme='light'
					transition={Bounce}
				/>
			</body>
		</html>
	)
}
