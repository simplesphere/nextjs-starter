import { PageHeader } from '@/widgets/page-header'
import type { DashboardPageWrapperProps } from '@/widgets/sidebar/model/types'
import { DashboardHeader } from '@/widgets/sidebar/ui/dashboard-header'

export function DashboardPageWrapper({ breadcrumbs, pageHeader, children }: DashboardPageWrapperProps) {
	return (
		<>
			<DashboardHeader breadcrumbs={breadcrumbs} />
			<section className="flex flex-1 flex-col p-6 md:p-10">
				<div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
					{pageHeader && <PageHeader {...pageHeader} />}
					{children}
				</div>
			</section>
		</>
	)
}
