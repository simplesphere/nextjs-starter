'use client'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from '@shared/ui/shadcn/sidebar'
import { useTranslations } from 'next-intl'
import { UserMenu } from '@/features/user-menu'
import { WorkspaceSwitcher } from '@/features/workspace-switcher'
import { Link, usePathname } from '@/shared/config/i18n'
import { getSidebarNavItems } from '@/widgets/sidebar/model/config'
import type { AppSidebarProps } from '@/widgets/sidebar/model/types'

export function AppSidebar({ workspace }: AppSidebarProps) {
	const pathname = usePathname()
	const navT = useTranslations('SIDEBAR.NAV_ITEMS')

	const navItems = getSidebarNavItems(navT, workspace.slug)

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="h-12 justify-center border-b p-2">
				<WorkspaceSwitcher currentWorkspace={workspace} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navItems.map(item => {
								// Match the exact route or any nested child of it; avoid substring false matches.
								const isActive = pathname === item.url || pathname.startsWith(`${item.url}/`)

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											isActive={isActive}
											tooltip={item.title}
											render={<Link href={item.url} className="text-muted-foreground hover:text-foreground" />}
										>
											<item.icon className="size-4" />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<UserMenu />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
