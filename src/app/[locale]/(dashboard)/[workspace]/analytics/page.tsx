import { Button } from '@shared/ui/shadcn/button'
import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { Download, FileText, LineChart, Plus, RefreshCw, Target } from 'lucide-react'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { WorkspaceMetadataProps } from '@/shared/types'
import { CardBlock, EmptyState } from '@/shared/ui'
import { type DashboardBreadcrumb, DashboardPageWrapper } from '@/widgets/sidebar'

export async function generateMetadata(
	{ params }: WorkspaceMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale, workspace } = await params
	return createPageMetadata('METADATA.ANALYTICS', locale, parent, { path: `/${workspace}/analytics` })
}

export default async function AnalyticsPage() {
	const t = await getTranslations('ANALYTICS')

	const breadcrumbs: DashboardBreadcrumb[] = [
		{
			id: 'analytics',
			icon: 'LineChart',
			title: t('TITLE'),
			'data-testid': 'breadcrumb-analytics'
		}
	]

	return (
		<DashboardPageWrapper
			breadcrumbs={breadcrumbs}
			pageHeader={{
				headline: t('TITLE'),
				subheadline: t('DESCRIPTION'),
				actions: (
					<div className="flex gap-2">
						<Button variant="outline" size="icon">
							<RefreshCw className="size-4" />
						</Button>
						<Button>
							<Download className="size-4" />
							{t('EXPORT')}
						</Button>
					</div>
				)
			}}
		>
			<CardBlock title={t('TRAFFIC_OVERVIEW')} subtitle={t('TRAFFIC_OVERVIEW_SUBTITLE')}>
				<EmptyState
					icon={<LineChart className="size-5" />}
					title={t('EMPTY.TRAFFIC_TITLE')}
					description={t('EMPTY.TRAFFIC_DESCRIPTION')}
					className="h-[320px]"
					actions={
						<Button variant="outline">
							<Plus className="size-4" />
							{t('EMPTY.TRAFFIC_ACTION')}
						</Button>
					}
				/>
			</CardBlock>

			<div className="grid gap-6 md:grid-cols-2">
				<CardBlock title={t('TOP_PAGES')} subtitle={t('TOP_PAGES_SUBTITLE')}>
					<EmptyState
						icon={<FileText className="size-5" />}
						title={t('EMPTY.PAGES_TITLE')}
						description={t('EMPTY.PAGES_DESCRIPTION')}
						className="h-[280px]"
					/>
				</CardBlock>
				<CardBlock title={t('CONVERSIONS')} subtitle={t('CONVERSIONS_SUBTITLE')}>
					<EmptyState
						icon={<Target className="size-5" />}
						title={t('EMPTY.CONVERSIONS_TITLE')}
						description={t('EMPTY.CONVERSIONS_DESCRIPTION')}
						className="h-[280px]"
					/>
				</CardBlock>
			</div>
		</DashboardPageWrapper>
	)
}
