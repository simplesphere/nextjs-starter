import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Activity } from 'lucide-react'
import { OverviewStats, OverviewStatsSkeleton } from '@/features/overview'
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
	return createPageMetadata('METADATA.DASHBOARD', locale, parent, { path: `/${workspace}/dashboard` })
}

export default async function DashboardPage({ params }: WorkspacePageProps) {
	const { workspace: workspaceSlug } = await params
	const workspace = getWorkspaceBySlug(workspaceSlug)

	if (!workspace) {
		notFound()
	}
	const t = await getTranslations('DASHBOARD')

	const breadcrumbs: DashboardBreadcrumb[] = [
		{
			id: 'overview',
			title: t('BREADCRUMB.OVERVIEW'),
			'data-testid': 'breadcrumb-overview'
		}
	]

	return (
		<DashboardPageWrapper
			breadcrumbs={breadcrumbs}
			pageHeader={{
				headline: t('WELCOME', { name: workspace.name }),
				subheadline: t('WELCOME_DESCRIPTION')
			}}
		>
			<Suspense fallback={<OverviewStatsSkeleton />}>
				<OverviewStats />
			</Suspense>

			<CardBlock title={t('RECENT_ACTIVITY')} subtitle={t('RECENT_ACTIVITY_SUBTITLE')}>
				<EmptyState
					icon={<Activity className="size-5" />}
					title={t('EMPTY.ACTIVITY_TITLE')}
					description={t('EMPTY.ACTIVITY_DESCRIPTION')}
					className="h-[320px]"
				/>
			</CardBlock>
		</DashboardPageWrapper>
	)
}
