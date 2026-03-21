'use client'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '@shared/ui/shadcn/breadcrumb'
import { type ComponentType, Fragment } from 'react'
import { BarChart3, FolderOpen, Home, LayoutDashboard, Settings, Users } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import type { BreadcrumbIconName, DashboardHeaderProps } from '@/widgets/sidebar/model/types'

const iconMap: Record<BreadcrumbIconName, ComponentType<{ className?: string }>> = {
	LayoutDashboard,
	BarChart3,
	FolderOpen,
	Users,
	Settings,
	Home
}

export function DashboardHeader({ breadcrumbs }: DashboardHeaderProps) {
	return (
		<header className="flex h-12 shrink-0 items-center border-b px-4">
			<Breadcrumb>
				<BreadcrumbList>
					{breadcrumbs.map((item, index) => {
						const isLast = index === breadcrumbs.length - 1
						const Icon = item.icon ? iconMap[item.icon] : null

						return (
							<Fragment key={item.id}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage className="flex items-center gap-1.5" data-testid={item['data-testid']}>
											{Icon && <Icon className="size-3.5" />}
											{item.title}
										</BreadcrumbPage>
									) : (
										<BreadcrumbLink asChild>
											<Link
												href={item.url ?? '#'}
												className="flex items-center gap-1.5"
												data-testid={item['data-testid']}
											>
												{Icon && <Icon className="size-3.5" />}
												{item.title}
											</Link>
										</BreadcrumbLink>
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</Fragment>
						)
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	)
}
