import { FolderOpen, Home, LineChart, Settings, Users } from 'lucide-react'
import type { NavItem } from '@/widgets/sidebar/model/types'

export function getSidebarNavItems(navT: (key: string) => string, workspaceSlug: string): NavItem[] {
	const base = `/${workspaceSlug}`

	return [
		{ title: navT('OVERVIEW'), icon: Home, url: `${base}/dashboard` },
		{ title: navT('ANALYTICS'), icon: LineChart, url: `${base}/analytics` },
		{ title: navT('PROJECTS'), icon: FolderOpen, url: `${base}/projects` },
		{ title: navT('TEAM'), icon: Users, url: `${base}/team` },
		{ title: navT('SETTINGS'), icon: Settings, url: `${base}/settings` }
	]
}
