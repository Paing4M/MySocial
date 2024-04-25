import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'
import UserAvatar from '../user/UserAvatar'

const tabs = ['My Posts', 'Settings']

interface TabInterface {
	tabIndex: number
	setTabIndex: (idx: number) => void
	user: CustomUser
}

const ProfileCard = ({ tabIndex, setTabIndex, user }: TabInterface) => {
	return (
		<div className='bg-white rounded-md shadow-md border'>
			<div className='flex  p-6 items-center justify-between '>
				<div className='flex items-center space-x-5'>
					<UserAvatar
						size={'lg'}
						name={user?.name!}
						profile_img={user?.profile_img!}
					/>
					<div className='flex flex-col'>
						<span className='font-bold text-lg'>{user?.name}</span>
						<span className='text-muted-foreground text-sm capitalize'>
							{user?.bio}
						</span>
					</div>
				</div>

				<div className='flex flex-col items-center'>
					<p className='text-2xl font-bold leading-tight'>30</p>
					<span className='text-muted-foreground text-sm'>posts</span>
				</div>
			</div>

			<hr />

			<div className='p-6'>
				<ul className='flex items-center space-x-4'>
					{tabs.map((tab, idx) => (
						<li key={tab + idx}>
							<p
								onClick={(e) => setTabIndex(idx)}
								className={`py-1 px-2 text-[16px] cursor-pointer capitalize select-none ${
									tabIndex == idx
										? 'text-black'
										: 'text-muted-foreground'
								}`}
							>
								{tab}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default ProfileCard
