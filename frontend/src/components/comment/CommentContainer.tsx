import CommentCard from './CommentCard'

const CommentContainer = ({ comments }: { comments: CommentType[] }) => {
	return (
		<div className='mt-6 h-fit max-h-[350px] overflow-y-scroll scrollbar-hide'>
			{comments &&
				comments.map((cmt) => <CommentCard key={cmt.id} cmt={cmt} />)}
		</div>
	)
}

export default CommentContainer
