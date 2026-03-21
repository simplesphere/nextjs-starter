import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { WorkspaceMetadataProps, WorkspacePageProps } from '@/shared/types'
import { Heading } from '@/shared/ui'
import { getWorkspaceBySlug } from '@/entities/workspace'
import { type DashboardBreadcrumb, DashboardPageWrapper } from '@/widgets/sidebar'

export async function generateMetadata(
	{ params }: WorkspaceMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale } = await params
	return createPageMetadata('METADATA.DASHBOARD', locale, parent)
}

export default async function DashboardPage({ params }: WorkspacePageProps) {
	const { workspace: workspaceSlug } = await params
	const workspace = getWorkspaceBySlug(workspaceSlug)
	const t = await getTranslations('DASHBOARD')

	const breadcrumbs: DashboardBreadcrumb[] = [
		{
			id: 'dashboard',
			icon: 'LayoutDashboard',
			title: t('TITLE'),
			url: `/dashboard/${workspaceSlug}`,
			'data-testid': 'breadcrumb-dashboard'
		},
		{
			id: 'overview',
			title: t('BREADCRUMB.OVERVIEW'),
			'data-testid': 'breadcrumb-overview'
		}
	]

	return (
		<DashboardPageWrapper breadcrumbs={breadcrumbs}>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl border border-border bg-card p-6">
					<Heading as="h2" size="lg">
						{workspace?.name} — {t('TITLE')}
					</Heading>
					<p className="mt-2">{t('DESCRIPTION')}</p>
				</div>
			</div>
		</DashboardPageWrapper>
	)
}
