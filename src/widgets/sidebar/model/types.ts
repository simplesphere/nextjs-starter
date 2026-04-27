import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Workspace } from '@/entities/workspace'
import type { PageHeaderProps } from '@/widgets/page-header/model/types'

export interface NavItem {
	title: string
	icon: LucideIcon
	url: string
}

export type BreadcrumbIconName =
	| 'LayoutDashboard'
	| 'BarChart3'
	| 'LineChart'
	| 'FolderOpen'
	| 'Users'
	| 'Settings'
	| 'CreditCard'
	| 'Home'

export interface DashboardBreadcrumb {
	id: string
	title: string
	icon?: BreadcrumbIconName
	url?: string
	'data-testid'?: string
}

export interface DashboardHeaderProps {
	breadcrumbs: DashboardBreadcrumb[]
}

export interface DashboardPageWrapperProps {
	breadcrumbs: DashboardBreadcrumb[]
	pageHeader?: PageHeaderProps
	children: ReactNode
}

export interface AppSidebarProps {
	workspace: Workspace
}
