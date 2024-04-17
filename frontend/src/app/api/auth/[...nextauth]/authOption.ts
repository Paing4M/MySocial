import axiosInstance from '@/lib/axiosInstance'
import { AuthOptions, ISODateString } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

export interface CustomSession {
	user?: CustomUser
	expires: ISODateString
}

export interface CustomUser {
	id?: string | null
	name?: string | null
	email?: string | null
	profile_image?: string | null
	email_verified_at?: string | null
	created_at?: string | null
	updated_at?: string | null
	token?: string | null
}

export const authOption: AuthOptions = {
	pages: {
		signIn: '/auth',
	},

	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (user) {
				token.user = user
			}

			return token
		},

		async session({
			session,
			user,
			token,
		}: {
			session: CustomSession
			user: CustomUser
			token: JWT
		}) {
			session.user = token.user as CustomUser
			return session
		},
	},

	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				const res = await axiosInstance.post('/login', credentials)
				if (res?.data?.data) {
					return res?.data?.data
				} else {
					return null
				}
			},
		}),
	],
}
