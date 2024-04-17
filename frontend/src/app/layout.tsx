import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
			<body className={roboto.className + ' bg-bgColor'}>
				{children}
				<ToastContainer
					// className={'z-[1000]'}
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

				<ToastContainer />
			</body>
		</html>
	)
}
