import type { ReactNode } from 'react'
import type { HeadingLevel } from '@/shared/types'

export interface PageHeaderProps {
	headline?: string
	subheadline?: string
	actions?: ReactNode
	className?: string
	pageHeaderComponent?: ReactNode
	backLink?: string
	/**
	 * Semantic level for the headline. Defaults to `h1`. Set to `h2` when the
	 * page already provides its own `h1` (e.g. inside a route layout).
	 */
	headingAs?: HeadingLevel
}
