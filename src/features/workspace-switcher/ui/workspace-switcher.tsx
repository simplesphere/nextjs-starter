'use client'

import { DialogTrigger } from '@shared/ui/shadcn/dialog'
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
import { useState } from 'react'
import { Check, ChevronDown, Plus } from 'lucide-react'
import type { WorkspaceSwitcherProps } from '@/features/workspace-switcher/model/types'
import { CreateWorkspaceDialog } from '@/features/workspace-switcher/ui/create-workspace-dialog'
import { useRouter } from '@/shared/config/i18n'
import { type Workspace, workspaceData } from '@/entities/workspace'

/**
 * Returns up to two uppercase initials derived from a workspace name so the
 * avatar tile reads as distinct per workspace (e.g. "Acme Corp" → "AC",
 * "Personal" → "P"). Falls back to "?" when the name is empty.
 */
function getWorkspaceInitials(name: string): string {
	const words = name.trim().split(/\s+/).filter(Boolean)
	if (words.length === 0) return '?'
	if (words.length === 1) return words[0]!.charAt(0).toUpperCase()
	return (words[0]!.charAt(0) + words[words.length - 1]!.charAt(0)).toUpperCase()
}

export function WorkspaceSwitcher({ currentWorkspace }: WorkspaceSwitcherProps) {
	const t = useTranslations('SIDEBAR.WORKSPACE_SWITCHER')
	const router = useRouter()

	const [createOpen, setCreateOpen] = useState(false)

	function handleSwitch(workspace: Workspace) {
		if (workspace.slug !== currentWorkspace.slug) {
			router.push(`/${workspace.slug}/dashboard`)
		}
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<CreateWorkspaceDialog
					open={createOpen}
					onOpenChange={setCreateOpen}
					trigger={
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<SidebarMenuButton className="h-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" />
								}
							>
								<div
									aria-hidden
									className="flex size-6 items-center justify-center rounded-sm bg-sidebar-primary text-[10px] font-semibold text-sidebar-primary-foreground"
								>
									{getWorkspaceInitials(currentWorkspace.name)}
								</div>
								<span className="truncate text-sm font-semibold">{currentWorkspace.name}</span>
								<ChevronDown className="ml-auto size-3.5 opacity-50" />
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) text-sm" align="start">
								<DropdownMenuGroup>
									<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
										{t('WORKSPACES')}
									</DropdownMenuLabel>
								</DropdownMenuGroup>
								{workspaceData.map(workspace => {
									const isActive = currentWorkspace.slug === workspace.slug
									return (
										<DropdownMenuItem
											key={workspace.slug}
											onClick={() => handleSwitch(workspace)}
											className="cursor-pointer gap-2"
										>
											<div
												aria-hidden
												className="flex size-6 items-center justify-center rounded-sm bg-sidebar-primary text-[10px] font-semibold text-sidebar-primary-foreground"
											>
												{getWorkspaceInitials(workspace.name)}
											</div>
											<span className="flex-1 truncate font-normal">{workspace.name}</span>
											{isActive && <Check className="size-4 text-muted-foreground" />}
										</DropdownMenuItem>
									)
								})}
								<DropdownMenuSeparator />
								<DialogTrigger
									render={<DropdownMenuItem onSelect={() => setCreateOpen(true)} className="cursor-pointer gap-2" />}
								>
									<div className="flex size-6 items-center justify-center rounded-sm border border-sidebar-border text-muted-foreground">
										<Plus className="size-3" />
									</div>
									<span className="flex-1 truncate font-normal">{t('ADD_WORKSPACE')}</span>
								</DialogTrigger>
							</DropdownMenuContent>
						</DropdownMenu>
					}
				/>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
