'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/shadcn/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@shared/ui/shadcn/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@shared/ui/shadcn/sidebar'
import { useTranslations } from 'next-intl'
import { ChevronsUpDown, CreditCard, LogOut, Settings, User } from 'lucide-react'
import { userData } from '@/entities/user'

/**
 * User menu component for the sidebar.
 * Displays user information and provides menu options.
 *
 * @returns The user menu component
 *
 * @example
 * ```tsx
 * <UserMenu />
 * ```
 */
export function UserMenu() {
	const t = useTranslations('SIDEBAR.USER_MENU')
	const userInitials = userData.name
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage src={userData.avatar} alt={userData.name} />
								<AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{userData.name}</span>
								<span className="truncate text-xs text-muted-foreground">{userData.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
						side="top"
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage src={userData.avatar} alt={userData.name} />
									<AvatarFallback className="rounded-lg">{userInitials}</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-semibold">{userData.name}</span>
									<span className="truncate text-xs text-muted-foreground">{userData.email}</span>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="cursor-pointer">
								<User className="mr-2 h-4 w-4" />
								{t('PROFILE')}
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<CreditCard className="mr-2 h-4 w-4" />
								{t('BILLING')}
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<Settings className="mr-2 h-4 w-4" />
								{t('SETTINGS')}
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer">
							<LogOut className="mr-2 h-4 w-4" />
							{t('LOG_OUT')}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
