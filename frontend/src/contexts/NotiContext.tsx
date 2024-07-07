import { createContext, useContext, useState } from 'react'

interface NotiContextInterface {
	noti: boolean
	setNoti(value: boolean): void
}

export const NotiContext = createContext<NotiContextInterface | null>(null)

export const NotiContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [noti, setNoti] = useState<boolean>(false)

	return (
		<NotiContext.Provider value={{ noti, setNoti }}>
			{children}
		</NotiContext.Provider>
	)
}

export const useNotiContext = () =>
	useContext(NotiContext) as NotiContextInterface
