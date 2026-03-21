'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@shared/ui/shadcn/breadcrumb'
import { Separator } from '@shared/ui/shadcn/separator'
import { SidebarTrigger } from '@shared/ui/shadcn/sidebar'
import { Link } from '@/shared/config/i18n'
import type { DashboardHeaderProps } from '@/widgets/sidebar/model/types'

/**
 * Dashboard header component with sidebar trigger and breadcrumb navigation.
 * Client component required for SidebarTrigger interactivity.
 *
 * @param props - The header props
 * @param props.breadcrumbs - Array of breadcrumb items to display
 * @returns The dashboard header component
 *
 * @example
 * ```tsx
 * const breadcrumbs = [
 *   { id: 'home', title: 'Home', url: '/dashboard' },
 *   { id: 'page', title: 'Current Page' }
 * ]
 * <DashboardHeader breadcrumbs={breadcrumbs} />
 * ```
 */
export function DashboardHeader({ breadcrumbs }: DashboardHeaderProps) {
	return (
		<header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1 size-6 [&>svg]:size-3.5" />
			<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-3.5" />
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map((item, index) => {
						const isLast = index === breadcrumbs.length - 1

						return (
							<BreadcrumbItem key={item.id} className={index === 0 ? 'hidden md:block' : ''}>
								{isLast ? (
									<BreadcrumbPage data-testid={item['data-testid']}>{item.title}</BreadcrumbPage>
								) : (
									<>
										<BreadcrumbLink asChild>
											<Link href={item.url ?? '#'} data-testid={item['data-testid']}>
												{item.title}
											</Link>
										</BreadcrumbLink>
										<BreadcrumbSeparator className="hidden md:block" />
									</>
								)}
							</BreadcrumbItem>
						)
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	)
}
