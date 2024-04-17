const InputErr = ({ err }: { err: string }) => {
	if (err) return <p className='leading-tight text-sm text-red-500'>{err}</p>
}

export default InputErr
