'use client'

import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import { useSession } from 'next-auth/react'

export const useCurrentUser = (): CustomUser => {
	const { data } = useSession()
	const user = data?.user as CustomUser
	return user
}
