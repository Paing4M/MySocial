import UserAvatar from '../user/UserAvatar'

const tabs = ['My Posts', 'Settings']

interface TabInterface {
	tabIndex: number
	setTabIndex: (idx: number) => void
}

const ProfileCard = ({ tabIndex, setTabIndex }: TabInterface) => {
	return (
		<div className='bg-white rounded-md shadow-md border'>
			<div className='flex  p-6 items-center justify-between '>
				<div className='flex items-center space-x-5'>
					<UserAvatar size={'lg'} user={{ name: 'abe' }} />
					<div className='flex flex-col'>
						<span className='font-bold text-lg'>name</span>
						<span className='text-muted-foreground text-sm'>
							Wed Developer
						</span>
					</div>
				</div>

				<div>
					<p className='text-2xl font-bold leading-tight'>30</p>
					<span className='text-muted-foreground text-sm'>posts</span>
				</div>
			</div>

			<hr />

			<div className='p-6'>
				<ul className='flex items-center space-x-6'>
					{tabs.map((tab, idx) => (
						<li key={tab + idx}>
							<p
								onClick={(e) => setTabIndex(idx)}
								className={`py-1 px-2 text-lg cursor-pointer capitalize select-none ${
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
