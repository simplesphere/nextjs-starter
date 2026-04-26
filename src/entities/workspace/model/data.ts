import type { Workspace } from '@/entities/workspace/model/types'

/**
 * MOCK DATA — replace with the real workspace lookup once persistence is
 * wired up (e.g. fetch from your DB based on the authenticated user). The
 * `[workspace]` route layout currently calls `generateStaticParams` over
 * this list; remove that call when these become dynamic.
 */
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

/**
 * Default workspace slug used by the post-login redirect target. Replace this
 * derivation with "the user's last visited workspace" once persistence exists.
 */
export const DEFAULT_WORKSPACE_SLUG = workspaceData[0]!.slug

/**
 * Looks up a workspace by its URL slug.
 *
 * @param slug - The workspace slug from the route segment
 * @returns The matching workspace, or `undefined` when not found
 */
export function getWorkspaceBySlug(slug: string): Workspace | undefined {
	return workspaceData.find(w => w.slug === slug)
}
