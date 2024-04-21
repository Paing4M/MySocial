'use client'

import { useState } from 'react'
import ProfileCard from './ProfileCard'
import ProfilePostsContainer from './ProfilePostsContainer'
import Settings from './Settings'

const ProfileContainer = () => {
	const [tabIndex, setTabIndex] = useState(0)
	let render

	if (tabIndex == 0) {
		render = <ProfilePostsContainer />
	} else if (tabIndex == 1) {
		render = <Settings />
	}

	return (
		<div>
			<ProfileCard tabIndex={tabIndex} setTabIndex={setTabIndex} />
			<div className='mt-8'>{render}</div>
		</div>
	)
}

export default ProfileContainer
