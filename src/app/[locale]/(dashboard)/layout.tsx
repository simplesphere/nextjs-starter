import { SidebarProvider } from '@shared/ui/shadcn/sidebar'
import type { LayoutDashboardProps } from '@/shared/types'

export default function LayoutDashboard({ children }: Omit<LayoutDashboardProps, 'params'>) {
	return (
		<div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-background text-[15px] subpixel-antialiased">
			<SidebarProvider>{children}</SidebarProvider>
		</div>
	)
}
