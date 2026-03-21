import { BarChart3, FolderOpen, Home, LayoutDashboard, Settings, Users } from 'lucide-react'
import type { NavItem } from '@/widgets/sidebar/model/types'

export function getSidebarNavItems(navT: (key: string) => string): NavItem[] {
	return [
		{ title: navT('OVERVIEW'), icon: Home, url: '/dashboard' },
		{ title: navT('DASHBOARD'), icon: LayoutDashboard, url: '/dashboard' },
		{ title: navT('ANALYTICS'), icon: BarChart3, url: '/dashboard' },
		{ title: navT('PROJECTS'), icon: FolderOpen, url: '/dashboard' },
		{ title: navT('TEAM'), icon: Users, url: '/dashboard' },
		{ title: navT('SETTINGS'), icon: Settings, url: '/dashboard' }
	]
}
