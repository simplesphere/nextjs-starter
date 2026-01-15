import { SidebarInset, SidebarProvider } from '@shared/ui/shadcn/sidebar'
import type { LayoutDashboardProps } from '@/shared/types'
import '@/app/globals.css'
import { AppSidebar } from '@/widgets/sidebar'

/**
 * Dashboard layout component.
 * Provides sidebar navigation and main content area.
 * Replaces the default header/footer layout for dashboard routes.
 *
 * @param props - The layout props
 * @param props.children - The child components to render
 * @param props.params - The route parameters
 * @returns The dashboard layout
 */
export default async function LayoutDashboard({ children, params }: LayoutDashboardProps) {
	await params

	return (
		<div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-background">
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset className="flex flex-1 flex-col overflow-auto">{children}</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
