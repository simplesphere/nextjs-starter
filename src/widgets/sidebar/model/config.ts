import { BarChart3, FolderOpen, Home, LayoutDashboard, Settings, Users } from 'lucide-react'
import { NAV_ITEM_KEYS } from '@/widgets/sidebar/model/constants'
import type { NavItem } from '@/widgets/sidebar/model/types'

/**
 * Generates sidebar navigation items.
 *
 * @param navT - Translation function for navigation item keys
 * @returns Array of navigation items
 *
 * @example
 * ```ts
 * const navT = useTranslations('SIDEBAR.NAV_ITEMS')
 * const navItems = getSidebarNavItems(navT)
 * ```
 */
export function getSidebarNavItems(navT: (key: string) => string): NavItem[] {
	return [
		{ title: navT(NAV_ITEM_KEYS.OVERVIEW), icon: Home, url: '/dashboard' },
		{ title: navT(NAV_ITEM_KEYS.DASHBOARD), icon: LayoutDashboard, url: '/dashboard' },
		{ title: navT(NAV_ITEM_KEYS.ANALYTICS), icon: BarChart3, url: '/dashboard' },
		{ title: navT(NAV_ITEM_KEYS.PROJECTS), icon: FolderOpen, url: '/dashboard' },
		{ title: navT(NAV_ITEM_KEYS.TEAM), icon: Users, url: '/dashboard' },
		{ title: navT(NAV_ITEM_KEYS.SETTINGS), icon: Settings, url: '/dashboard' }
	]
}
