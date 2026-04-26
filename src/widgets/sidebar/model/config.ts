import { FolderOpen, Home, LineChart, Settings, Users } from 'lucide-react'
import { routes } from '@/shared/config/routes'
import type { NavItem } from '@/widgets/sidebar/model/types'

export function getSidebarNavItems(navT: (key: string) => string, workspaceSlug: string): NavItem[] {
	return [
		{ title: navT('OVERVIEW'), icon: Home, url: routes.dashboard.dashboard(workspaceSlug) },
		{ title: navT('ANALYTICS'), icon: LineChart, url: routes.dashboard.analytics(workspaceSlug) },
		{ title: navT('PROJECTS'), icon: FolderOpen, url: routes.dashboard.projects(workspaceSlug) },
		{ title: navT('TEAM'), icon: Users, url: routes.dashboard.team(workspaceSlug) },
		{ title: navT('SETTINGS'), icon: Settings, url: routes.dashboard.settings(workspaceSlug) }
	]
}
