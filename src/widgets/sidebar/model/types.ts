import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Workspace } from '@/entities/workspace'

export interface NavItem {
	title: string
	icon: LucideIcon
	url: string
}

export type BreadcrumbIconName = 'LayoutDashboard' | 'BarChart3' | 'FolderOpen' | 'Users' | 'Settings' | 'Home'

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
	children: ReactNode
}

export interface AppSidebarProps {
	workspace: Workspace
}
