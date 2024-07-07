import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import moment from 'moment'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function sliceDesc(desc: string, isTruncated: boolean): string {
	if (desc) {
		if (desc.length >= 200) {
			const displayedText = isTruncated ? `${desc.slice(0, 200)} ...` : desc
			return displayedText
		} else {
			return desc
		}
	} else return ''
}

export function formatDate(date: string) {
	const formattedDate = moment(date).fromNow()
	// const formattedDate = moment(date).format('D-m-y H-m-s')
	return formattedDate
}
