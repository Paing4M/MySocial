import { AuthOptions, ISODateString } from 'next-auth'
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
		signIn: 'auth',
	},

	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {},
		}),
	],
}
