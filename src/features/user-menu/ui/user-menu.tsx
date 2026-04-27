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
import { useParams } from 'next/navigation'
import { ChevronsUpDown, CreditCard, LogOut, Settings, User } from 'lucide-react'
import { logoutAction } from '@/features/auth'
import { Link } from '@/shared/config/i18n'
import { routes } from '@/shared/config/routes'
import { userData } from '@/entities/user'
import { DEFAULT_WORKSPACE_SLUG } from '@/entities/workspace'

/** Sidebar user menu with profile, billing, settings, and logout options. */
export function UserMenu() {
	const t = useTranslations('SIDEBAR.USER_MENU')
	// Read the active workspace slug from the URL so menu links stay scoped to
	// whichever workspace the user is currently looking at; falls back to the
	// default when the menu renders outside a workspace route.
	const params = useParams<{ workspace?: string }>()
	const workspaceSlug = params.workspace ?? DEFAULT_WORKSPACE_SLUG
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
							<DropdownMenuItem asChild className="cursor-pointer">
								<Link href={routes.dashboard.billing(workspaceSlug)}>
									<CreditCard className="mr-2 h-4 w-4" />
									{t('BILLING')}
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer">
								<Settings className="mr-2 h-4 w-4" />
								{t('SETTINGS')}
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild className="cursor-pointer">
							<form action={logoutAction}>
								<button type="submit" className="flex w-full items-center">
									<LogOut className="mr-2 h-4 w-4" />
									{t('LOG_OUT')}
								</button>
							</form>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
