import type { DashboardPageWrapperProps } from '@/widgets/sidebar/model/types'
import { DashboardHeader } from '@/widgets/sidebar/ui/dashboard-header'

export function DashboardPageWrapper({ breadcrumbs, children }: DashboardPageWrapperProps) {
	return (
		<>
			<DashboardHeader breadcrumbs={breadcrumbs} />
			<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
		</>
	)
}
