'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@shared/ui/shadcn/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@shared/ui/shadcn/sidebar'
import { useTranslations } from 'next-intl'
import * as React from 'react'
import { Building2, Check, ChevronsUpDown, Plus } from 'lucide-react'
import { type Account, accountData } from '@/entities/account'

/**
 * Account switcher component for the sidebar.
 * Allows users to switch between different accounts.
 *
 * @returns The account switcher component
 *
 * @example
 * ```tsx
 * <AccountSwitcher />
 * ```
 */
export function AccountSwitcher() {
	const t = useTranslations('SIDEBAR.ACCOUNT_SWITCHER')
	const [activeAccount, setActiveAccount] = React.useState<Account>(accountData[0] as Account)

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Building2 className="size-4" />
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-semibold">{activeAccount.name}</span>
								<span className="text-xs text-muted-foreground">{activeAccount.plan}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)" align="start">
						<DropdownMenuLabel>{t('ACCOUNTS')}</DropdownMenuLabel>
						{accountData.map(account => (
							<DropdownMenuItem
								key={account.name}
								onClick={() => setActiveAccount(account)}
								className="cursor-pointer gap-2"
							>
								<div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
									<Building2 className="size-3" />
								</div>
								<div className="flex flex-1 flex-col">
									<div className="font-medium">{account.name}</div>
									<div className="text-xs text-muted-foreground">{account.plan}</div>
								</div>
								{activeAccount.name === account.name && <Check className="size-4" />}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer gap-2">
							<div className="flex aspect-square size-6 items-center justify-center rounded-md border border-sidebar-border">
								<Plus className="size-3" />
							</div>
							<div className="font-medium">{t('ADD_ACCOUNT')}</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
