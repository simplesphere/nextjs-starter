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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/shadcn/tooltip'
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
							<TooltipProvider delayDuration={0}>
								{navItems.map(item => {
									const isActive = pathname.endsWith(item.url) || pathname.includes(`${item.url}/`)

									return (
										<SidebarMenuItem key={item.title}>
											<Tooltip>
												<TooltipTrigger asChild>
													<SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
														<Link href={item.url} className="text-muted-foreground hover:text-foreground">
															<item.icon className="size-4" />
															<span>{item.title}</span>
														</Link>
													</SidebarMenuButton>
												</TooltipTrigger>
												<TooltipContent side="right">{item.title}</TooltipContent>
											</Tooltip>
										</SidebarMenuItem>
									)
								})}
							</TooltipProvider>
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
