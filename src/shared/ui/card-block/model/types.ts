import type { ReactNode } from 'react'

export interface CardBlockProps {
	title: string
	subtitle?: string
	rightContent?: ReactNode
	children: ReactNode
	className?: string
}
