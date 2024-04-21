import { Input } from '@/components/ui/input'
import { CloudUpload } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const GeneralSetting = () => {
	return (
		<div>
			<form action=''>
				<div className='space-y-5'>
					<div>
						<label
							className='flex items-center  h-10 w-full rounded-md border-dashed border text-sm py-2 px-3 gap-4 text-muted-foreground cursor-pointer active:ring-2 active:ring-ring active:ring-offset-2 '
							htmlFor='image'
						>
							<CloudUpload />
							<p>Choose an image for an avatar</p>
							<input id='image' type='file' hidden />
						</label>
					</div>

					<Input placeholder='name' />

					<Textarea placeholder='Bio' />

					<div>
						<Button className='px-8' type='submit'>
							Save Changes
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default GeneralSetting
