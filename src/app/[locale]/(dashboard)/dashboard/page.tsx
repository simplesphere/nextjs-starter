import { getTranslations } from 'next-intl/server'
import { Heading } from '@/shared/ui'
import { type BreadcrumbItem, DashboardPageWrapper } from '@/widgets/sidebar'

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
