import Image from 'next/image'
import { AlignJustify, LogOut, Search, UserRound } from 'lucide-react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import UserAvatar from '../user/UserAvatar'
import { Button } from '../ui/button'
import Link from 'next/link'
import MobileMenu from './MobileMenu'
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'

const Navbar = ({ user }: { user: CustomUser }) => {
	return (
		<div className=' bg-white border-b shadow-sm'>
			<nav className='p-4 h-[60px] max-w-[1300px] flex items-center justify-between mx-auto'>
				<Image
					src={'/mySocial.png'}
					width={50}
					height={50}
					className='w-12 object-cover'
					alt='logo'
				/>

				<div className='hidden md:flex w-[550px] px-4 items-center  border rounded-md'>
					<Search className='text-muted-foreground' />
					<input
						className='w-full outline-none border-none h-[40px] ml-4'
						placeholder='Search'
					/>
				</div>

				<div className=''>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<UserAvatar user={user} />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<LogOut className='mr-2 h-4 w-4' />
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* menu */}
				{/* <div className='block md:hidden'>
					<MobileMenu user={user}/>
				</div> */}
			</nav>
		</div>
	)
}

export default Navbar
