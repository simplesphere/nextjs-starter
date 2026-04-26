import { SidebarProvider } from '@shared/ui/shadcn/sidebar'
import { TooltipProvider } from '@shared/ui/shadcn/tooltip'
import type { LayoutDashboardProps } from '@/shared/types'

export default function LayoutDashboard({ children }: Omit<LayoutDashboardProps, 'params'>) {
	return (
		<div className="flex min-h-screen w-full text-[15px] subpixel-antialiased">
			<TooltipProvider delayDuration={0}>
				<SidebarProvider>{children}</SidebarProvider>
			</TooltipProvider>
		</div>
	)
}
