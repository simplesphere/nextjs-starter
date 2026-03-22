import { SidebarInset } from '@shared/ui/shadcn/sidebar'
import { notFound } from 'next/navigation'
import type { WorkspaceLayoutProps } from '@/shared/types'
import { getWorkspaceBySlug, workspaceData } from '@/entities/workspace'
import { AppSidebar } from '@/widgets/sidebar'

export function generateStaticParams() {
	return workspaceData.map(w => ({ workspace: w.slug }))
}

export default async function WorkspaceLayout({ children, params }: WorkspaceLayoutProps) {
	const { workspace: workspaceSlug } = await params
	const workspace = getWorkspaceBySlug(workspaceSlug)

	if (!workspace) {
		notFound()
	}

	return (
		<>
			<AppSidebar workspace={workspace} />
			<SidebarInset className="flex flex-1 flex-col overflow-auto">{children}</SidebarInset>
		</>
	)
}
