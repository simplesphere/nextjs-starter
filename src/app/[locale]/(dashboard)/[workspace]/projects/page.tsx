import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { FolderOpen } from 'lucide-react'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { WorkspaceMetadataProps, WorkspacePageProps } from '@/shared/types'
import { CardBlock, EmptyState } from '@/shared/ui'
import { getWorkspaceBySlug } from '@/entities/workspace'
import { type DashboardBreadcrumb, DashboardPageWrapper } from '@/widgets/sidebar'

export async function generateMetadata(
	{ params }: WorkspaceMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale, workspace } = await params
	return createPageMetadata('METADATA.PROJECTS', locale, parent, { path: `/${workspace}/projects` })
}

export default async function ProjectsPage({ params }: WorkspacePageProps) {
	const { workspace: workspaceSlug } = await params
	if (!getWorkspaceBySlug(workspaceSlug)) notFound()

	const t = await getTranslations('PROJECTS')

	const breadcrumbs: DashboardBreadcrumb[] = [
		{
			id: 'projects',
			icon: 'FolderOpen',
			title: t('TITLE'),
			'data-testid': 'breadcrumb-projects'
		}
	]

	return (
		<DashboardPageWrapper
			breadcrumbs={breadcrumbs}
			pageHeader={{ headline: t('TITLE'), subheadline: t('DESCRIPTION') }}
		>
			<CardBlock title={t('TITLE')}>
				<EmptyState
					icon={<FolderOpen className="size-5" />}
					title={t('EMPTY_TITLE')}
					description={t('EMPTY_DESCRIPTION')}
					className="h-[320px]"
				/>
			</CardBlock>
		</DashboardPageWrapper>
	)
}
