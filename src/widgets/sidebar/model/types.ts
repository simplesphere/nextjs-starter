import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface NavItem {
	title: string
	icon: LucideIcon
	url: string
}

export interface BreadcrumbItem {
	id: string
	title: string
	url?: string
	'data-testid'?: string
}

export interface DashboardHeaderProps {
	breadcrumbs: BreadcrumbItem[]
}

export interface DashboardPageWrapperProps {
	breadcrumbs: BreadcrumbItem[]
	children: ReactNode
}
