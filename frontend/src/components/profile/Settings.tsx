'use client'

import { useState } from 'react'
import GeneralSetting from './settings/GeneralSetting'
import AccountSetting from './settings/AccountSetting'
import { Button } from '../ui/button'

let tabs = ['general', 'account']

const Settings = () => {
	const [tabIdx, setTabIdx] = useState(0)

	let render

	switch (tabIdx) {
		case 0:
			render = <GeneralSetting />
			break

		case 1:
			render = <AccountSetting />
			break

		default:
			render = <GeneralSetting />
			break
	}

	return (
		<div className='bg-white rounded-lg shadow-md border w-full overflow-hidden'>
			<h1 className='text-lg font-bold p-6'>Settings</h1>
			<hr />
			<div className='flex flex-col lg:flex-row'>
				<div className='w-full lg:w-[300px]  border-r-0 lg:border-r'>
					<div className='mt-10 w-full'>
						<ul className='flex flex-row items-center lg:flex-col justify-between lg:justify-start px-6 lg:px-0 gap-4 lg:gap-0'>
							{tabs.map((tab, idx) => (
								<li
									onClick={() => setTabIdx(idx)}
									key={tab + idx}
									className={`capitalize cursor-pointer mb-1 last-of-type:mb-0 w-full text-center lg:text-left py-2 px-6 rounded-md ${
										tabIdx == idx ? 'bg-[#F1F4F9]' : ''
									}`}
								>
									{tab}
								</li>
							))}

							<li
								className={`capitalize cursor-pointer mt-0 lg:mt-4 last-of-type:mb-0 w-full py-2 px-0 lg:px-6`}
							>
								<Button className='w-full' variant={'destructive'}>
									Logout
								</Button>
							</li>
						</ul>
					</div>
				</div>

				<div className='flex-1'>
					<div className='mt-10 px-6 pb-6'>{render}</div>
				</div>
			</div>
		</div>
	)
}

export default Settings
