import { SidebarProvider } from '@shared/ui/shadcn/sidebar'
import type { ReactNode } from 'react'

export default function LayoutDashboard({ children }: { children: ReactNode }) {
	return (
		<div className="fixed inset-0 z-50 flex h-screen w-screen overflow-hidden bg-background">
			<SidebarProvider>{children}</SidebarProvider>
		</div>
	)
}
