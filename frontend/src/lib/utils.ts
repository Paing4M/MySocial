import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function sliceDesc(desc: string, isTruncated: boolean): string {
	if (desc) {
		const displayedText = isTruncated ? `${desc.slice(0, 200)} ...` : desc
		return displayedText
	} else return ''
}
