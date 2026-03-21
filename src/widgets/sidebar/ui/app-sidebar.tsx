'use client'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
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
import { Link } from '@/shared/config/i18n'
import { getSidebarNavItems } from '@/widgets/sidebar/model/config'
import type { AppSidebarProps } from '@/widgets/sidebar/model/types'

export function AppSidebar({ workspace }: AppSidebarProps) {
	const t = useTranslations('SIDEBAR')
	const navT = useTranslations('SIDEBAR.NAV_ITEMS')

	const navItems = getSidebarNavItems(navT, workspace.slug)

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="h-12 justify-center border-b p-2">
				<WorkspaceSwitcher currentWorkspace={workspace} />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>{t('NAVIGATION')}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<TooltipProvider delayDuration={0}>
								{navItems.map(item => (
									<SidebarMenuItem key={item.title}>
										<Tooltip>
											<TooltipTrigger asChild>
												<SidebarMenuButton asChild tooltip={item.title}>
													<Link href={item.url}>
														<item.icon className="h-4 w-4" />
														<span>{item.title}</span>
													</Link>
												</SidebarMenuButton>
											</TooltipTrigger>
											<TooltipContent side="right">{item.title}</TooltipContent>
										</Tooltip>
									</SidebarMenuItem>
								))}
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
