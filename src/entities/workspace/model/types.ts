export type WorkspacePlan = 'ENTERPRISE' | 'PRO' | 'FREE'

export interface Workspace {
	name: string
	slug: string
	plan: WorkspacePlan
}
