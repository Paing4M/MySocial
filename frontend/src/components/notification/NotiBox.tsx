'use client'

import { useEffect, useState } from 'react'
import NotificationCard from './NotificationCard'
import { clearNoti, getNoti } from '@/services/userService'
import NotiLoading from '../skeletonLoading/NotiLoading'
import { useNotiContext } from '@/contexts/NotiContext'

const NotiBox = () => {
	const [notis, setNotis] = useState<NotiType[]>([])
	const [loading, setLoading] = useState(false)
	const { setNoti } = useNotiContext()

	useEffect(() => {
		setLoading(true)
		getNoti().then((res) => {
			if (res.data) {
				setLoading(false)
				setNotis(res.data)
			} else {
				setLoading(false)
				setNotis([])
			}
		})
	}, [])

	useEffect(() => {
		setNoti(false)
	}, [])

	const handleClick = async () => {
		const res = await clearNoti()
		if (res.status == 200) {
			setNotis([])
		}
	}

	return (
		<div className='border shadow-md bg-white rounded-md '>
			<div className=' flex items-center p-6 justify-between'>
				<h4 className='text-lg font-bold'>Notifications</h4>

				<button
					onClick={handleClick}
					className='px-5 py-1 rounded-lg bg-transparent border border-neutral-400 hover:bg-neutral-400 hover:text-white  transition'
				>
					Clear
				</button>
			</div>

			<hr />

			<div className='mt-6'>
				{notis.length == 0 && loading && <NotiLoading />}

				{!loading && notis.length == 0 && (
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
