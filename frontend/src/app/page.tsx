import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOption } from './api/auth/[...nextauth]/authOption'

export default async function Home() {
	const session = await getServerSession(authOption)
	console.log('session', session)
	return <h1>hello</h1>
}
