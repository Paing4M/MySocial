import NextAuth from 'next-auth/next'
import { authOption } from './authOption'

const nextAuth = NextAuth(authOption)

export { nextAuth as GET, nextAuth as POST, nextAuth as update }
