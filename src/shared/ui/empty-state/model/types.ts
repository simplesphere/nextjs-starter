import type { ReactNode } from 'react'

export interface EmptyStateProps {
	icon: ReactNode
	title: string
	description?: string
	actions?: ReactNode
	className?: string
}
