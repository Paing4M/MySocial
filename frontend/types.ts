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
