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
	bio?: string | null
	profile_img?: string | null
	email_verified_at?: string | null
	created_at?: string | null
	updated_at?: string | null
	token?: string | null
	// notifications?: CustomNoti[] | null
}

// export interface CustomNoti {
// 	id?: string
// 	type?: string
// 	notifiable_type?: string
// 	notifiable_id?: number
// 	data?: Data
// 	read_at?: any
// 	created_at?: string
// 	updated_at?: string
// }

// interface Data {
// 	title: string
// 	post_id: string
// 	user: CustomUser
// }

export const authOption: AuthOptions = {
	pages: {
		signIn: '/auth',
	},

	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (trigger === 'update' && session?.profile_img) {
				const user: CustomUser = token.user as CustomUser
				user.profile_img = session.profile_img
			}

			if (trigger === 'update' && session?.bio) {
				const user: CustomUser = token.user as CustomUser
				user.bio = session.bio
			}

			if (trigger === 'update' && session?.name) {
				const user: CustomUser = token.user as CustomUser
				user.name = session.name
			}

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
