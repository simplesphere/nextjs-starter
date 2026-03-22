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
import { Building2, Check, ChevronDown, Plus } from 'lucide-react'
import type { WorkspaceSwitcherProps } from '@/features/workspace-switcher/model/types'
import { useRouter } from '@/shared/config/i18n'
import { type Workspace, workspaceData } from '@/entities/workspace'

export function WorkspaceSwitcher({ currentWorkspace }: WorkspaceSwitcherProps) {
	const t = useTranslations('SIDEBAR.WORKSPACE_SWITCHER')
	const plansT = useTranslations('SIDEBAR.PLANS')
	const router = useRouter()

	function handleSwitch(workspace: Workspace) {
		if (workspace.slug !== currentWorkspace.slug) {
			router.push(`/${workspace.slug}/dashboard`)
		}
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton className="h-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
							<div className="flex size-6 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
								<Building2 className="size-3.5" />
							</div>
							<span className="truncate font-semibold">{currentWorkspace.name}</span>
							<ChevronDown className="ml-auto size-3.5 opacity-50" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)" align="start">
						<DropdownMenuLabel>{t('WORKSPACES')}</DropdownMenuLabel>
						{workspaceData.map(workspace => (
							<DropdownMenuItem
								key={workspace.slug}
								onClick={() => handleSwitch(workspace)}
								className="cursor-pointer gap-2"
							>
								<div className="flex size-6 items-center justify-center rounded-sm bg-sidebar-primary text-sidebar-primary-foreground">
									<Building2 className="size-3" />
								</div>
								<div className="flex flex-1 flex-col">
									<div className="font-medium">{workspace.name}</div>
									<div className="text-xs text-muted-foreground">{plansT(workspace.plan)}</div>
								</div>
								{currentWorkspace.slug === workspace.slug && <Check className="size-4" />}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="cursor-pointer gap-2">
							<div className="flex size-6 items-center justify-center rounded-sm border border-sidebar-border">
								<Plus className="size-3" />
							</div>
							<div className="font-medium">{t('ADD_WORKSPACE')}</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
