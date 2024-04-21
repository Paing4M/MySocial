import ProfileContainer from '@/components/profile/ProfileContainer'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'My Social | Profile Page',
	description: 'Modify your profile settings',
}

const ProfilePage = () => {
	return (
		<div>
			<ProfileContainer />
		</div>
	)
}

export default ProfilePage
