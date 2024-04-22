import NotificationCard from '@/components/notification/NotificationCard'

const NotificationsPage = () => {
	return (
		<div className='border shadow-md bg-white rounded-md '>
			<h4 className='text-lg font-bold p-6'>Notifications</h4>

			<hr />

			<div className='mt-6'>
				<NotificationCard />
				<NotificationCard />
				<NotificationCard />
				<NotificationCard />
			</div>
		</div>
	)
}

export default NotificationsPage
