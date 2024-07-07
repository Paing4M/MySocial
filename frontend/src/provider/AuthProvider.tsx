'use client'
import { NotiContextProvider } from '@/contexts/NotiContext'
import { SessionProvider } from 'next-auth/react'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<NotiContextProvider>{children}</NotiContextProvider>
		</SessionProvider>
	)
}

export default AuthProvider
