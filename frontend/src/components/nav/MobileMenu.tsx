import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { AlignJustify, UserRound } from 'lucide-react'
import UserAvatar from '../user/UserAvatar'
import Link from 'next/link'
import { CustomUser } from '@/app/api/auth/[...nextauth]/authOption'

const MobileMenu = ({ user }: { user: CustomUser }) => {
	return (
		<div>
			<Sheet>
				<SheetTrigger>
					<AlignJustify className=' w-8 h-8 cursor-pointer' />
				</SheetTrigger>
				<SheetContent className='pt-[65px]'>
					<SheetHeader>
						<SheetTitle>
							<div className='flex space-x-3 items-center'>
								<UserAvatar user={user} />
								<span>{user?.name}</span>
							</div>
						</SheetTitle>
						<SheetDescription>
							<ul className='mt-4 space-y-2'>
								<li>
									<Link href={'/profile'} className='flex  py-2'>
										<UserRound className='mr-2 h-4 w-4' />
										<span>Profile</span>
									</Link>
								</li>

								<li>
									<Link href={'/profile'} className='flex '>
										<UserRound className='mr-2 h-4 w-4' />
										<span>Profile</span>
									</Link>
								</li>
							</ul>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default MobileMenu
