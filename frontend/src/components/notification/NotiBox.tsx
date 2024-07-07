'use client'

import { useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'
import { getNoti } from '@/services/userService'
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'

const NotiBox = () => {
	const [notis, setNotis] = useState<NotiType[]>([])

	useEffect(() => {
		getNoti().then((res) => {
			if (res.data) {
				setNotis(res.data)
			} else {
				setNotis([])
			}
		})
	}, [])

	console.log(notis)

	return (
		<div className='border shadow-md bg-white rounded-md '>
			<div className=' flex items-center p-6 justify-between'>
				<h4 className='text-lg font-bold'>Notifications</h4>

				<button className='px-5 py-1 rounded-lg bg-transparent border border-neutral-400 hover:bg-neutral-400 hover:text-white  transition'>
					Clear
				</button>
			</div>

			<hr />

			<div className='mt-6'>
				{notis.length < 0 && (
					<p className='text-center mb-6'>Notification is clear.</p>
				)}
				{notis &&
					notis.length > 0 &&
					notis.map((noti, idx) => (
						<NotificationCard noti={noti} key={noti.post_id + idx} />
					))}
			</div>
		</div>
	)
}

export default NotiBox
