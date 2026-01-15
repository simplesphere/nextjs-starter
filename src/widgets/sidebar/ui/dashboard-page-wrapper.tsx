import type { DashboardPageWrapperProps } from '@/widgets/sidebar/model/types'
import { DashboardHeader } from '@/widgets/sidebar/ui/dashboard-header'

/**
 * Server component wrapper for dashboard pages.
 * Provides breadcrumb navigation and consistent page layout.
 *
 * @param props - The wrapper props
 * @param props.breadcrumbs - Array of breadcrumb items to display
 * @param props.children - The page content to render
 * @returns The wrapped dashboard page
 *
 * @example
 * ```tsx
 * const breadcrumbs = [
 *   { id: 'home', title: 'Home', url: '/dashboard', 'data-testid': 'breadcrumb-home' },
 *   { id: 'page', title: 'Current Page', 'data-testid': 'breadcrumb-page' }
 * ]
 *
 * <DashboardPageWrapper breadcrumbs={breadcrumbs}>
 *   <Heading>Page Content</Heading>
 * </DashboardPageWrapper>
 * ```
 */
export function DashboardPageWrapper({ breadcrumbs, children }: DashboardPageWrapperProps) {
	return (
		<>
			<DashboardHeader breadcrumbs={breadcrumbs} />
			<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
		</>
	)
}
