type RegisterType = {
	name?: string
	email?: string
	password?: string
	password_confirmation?: string
}

type LoginType = {
	email?: string
	password?: string
}

type ApiResponseType<T> = {
	data?: Array<T> | []
	links?: Links
	meta?: Meta
}

type Meta = {
	current_page: number
	from: number
	last_page: number
	links: Link[]
	path: string
	per_page: number
	to: number
	total: number
}

type Link = {
	url?: string
	label: string
	active: boolean
}

type Links = {
	first: string
	last: string
	prev?: any
	next?: any
}

type PostType = {
	id: string
	desc: string
	image?: string
	user: User
	comments?: CommentType[]
	likes?: LikeType[]
	like_count: number
	liked_by_user?: boolean
	created_at?: string
	updated_at?: string
}

type User = {
	id?: string
	name: string
	profile_img?: string
	bio?: any
}

type CommentType = {
	id: string
	comment: string
	user_id: string
	post_id: string
	user: User
	created_at: string
}

type LikeType = {
	user_id: string
	post_id: string
}

type NotiType = {
	post_id: string
	user: User
	created_at: string
	title: string
}
