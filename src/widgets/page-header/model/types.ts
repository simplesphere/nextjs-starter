import type { ReactNode } from 'react'

export interface PageHeaderProps {
	headline?: string
	subheadline?: string
	actions?: ReactNode
	className?: string
	pageHeaderComponent?: ReactNode
	backLink?: string
}
