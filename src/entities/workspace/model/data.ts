import type { Workspace } from '@/entities/workspace/model/types'

export const workspaceData: Workspace[] = [
	{
		name: 'Acme Corp',
		slug: 'acme-corp',
		plan: 'ENTERPRISE'
	},
	{
		name: 'Startup Inc',
		slug: 'startup-inc',
		plan: 'PRO'
	},
	{
		name: 'Personal',
		slug: 'personal',
		plan: 'FREE'
	}
]

export const DEFAULT_WORKSPACE_SLUG = workspaceData[0]!.slug

export function getWorkspaceBySlug(slug: string): Workspace | undefined {
	return workspaceData.find(w => w.slug === slug)
}
