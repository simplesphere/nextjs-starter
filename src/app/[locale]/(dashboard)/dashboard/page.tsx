import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { GenerateMetadataProps } from '@/shared/types'
import { Heading } from '@/shared/ui'
import { type BreadcrumbItem, DashboardPageWrapper } from '@/widgets/sidebar'

export async function generateMetadata(
	{ params }: GenerateMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale } = await params
	return createPageMetadata('METADATA.DASHBOARD', locale, parent)
}

/**
 * Dashboard page component.
 *
 * @returns The dashboard page
 */
export default async function DashboardPage() {
	const t = await getTranslations('DASHBOARD')

	const breadcrumbs: BreadcrumbItem[] = [
		{
			id: 'home',
			title: t('BREADCRUMB.HOME'),
			url: '/dashboard',
			'data-testid': 'breadcrumb-home'
		}
	]

	return (
		<DashboardPageWrapper breadcrumbs={breadcrumbs}>
			<div className="grid auto-rows-min gap-4 md:grid-cols-3">
				<div className="aspect-video rounded-xl border border-border bg-card p-6">
					<Heading as="h2" size="lg">
						{t('TITLE')}
					</Heading>
					<p className="mt-2">{t('DESCRIPTION')}</p>
				</div>
			</div>
		</DashboardPageWrapper>
	)
}
