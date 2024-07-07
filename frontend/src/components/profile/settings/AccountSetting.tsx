import { Button } from '@/components/ui/button'

const AccountSetting = () => {
	return (
		<div>
			<h4 className='mb-4 text-lg'>Delete account </h4>

			<p className='text-sm text-muted-foreground'>
				This action is irreversible and will permanently delete all your
				data associated with the account.
			</p>

			<div className='mt-6'>
				<Button
					variant={'outline'}
					className='border-red-600 text-red-500 hover:bg-red-500 hover:text-white'
				>
					Delete My Account
				</Button>
			</div>
		</div>
	)
}

export default AccountSetting
