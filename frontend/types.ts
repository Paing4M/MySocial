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

type CreatePostType = {
	desc: any
	image?: File | null
}

type PostApiResponseType = {
	data: Post[]
	links: Links
	meta: Meta
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

type Post = {
	id: string
	desc: string
	image?: string
	user: User
	created_at: string
}

type User = {
	name: string
	profile_img?: string
	bio?: string | number
}
