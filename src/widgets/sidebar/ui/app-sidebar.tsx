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
import { AccountSwitcher } from '@/features/account-switcher'
import { UserMenu } from '@/features/user-menu'
import { Link } from '@/shared/config/i18n'
import { getSidebarNavItems } from '@/widgets/sidebar/model/config'

/**
 * Main application sidebar component.
 * Provides navigation and user account management.
 *
 * @returns The app sidebar component
 *
 * @example
 * ```tsx
 * <AppSidebar />
 * ```
 */
export function AppSidebar() {
	const t = useTranslations('SIDEBAR')
	const navT = useTranslations('SIDEBAR.NAV_ITEMS')

	const navItems = getSidebarNavItems(navT)

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<AccountSwitcher />
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
