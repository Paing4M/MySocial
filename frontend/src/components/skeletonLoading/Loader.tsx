const Loader = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-[calc(100vh-370px)] md:h-[calc(100vh-300px)] overflow-hidden '>
			{children}
		</div>
	)
}

export default Loader
