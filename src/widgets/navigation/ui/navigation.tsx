'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from '@shared/ui/shadcn/dropdown-menu'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import { getNavigationData } from '@/widgets/navigation/model/config'

/**
 * Navigation component with dropdown menu for page navigation.
 * Displays standalone pages and categorized navigation items.
 *
 * @returns The navigation component
 *
 * @example
 * ```tsx
 * <Navigation />
 * ```
 */
export function Navigation() {
	const t = useTranslations('NAVIGATION')

	const { categories, standalonePages } = getNavigationData(t)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
					aria-label={t('PAGES')}
				>
					{t('PAGES')}
					<ChevronDown className="h-4 w-4" aria-hidden="true" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[200px]">
				{standalonePages.map(page => (
					<DropdownMenuItem key={page.href} asChild>
						<Link href={page.href}>{page.label}</Link>
					</DropdownMenuItem>
				))}
				{categories.map(category => (
					<DropdownMenuSub key={category.title}>
						<DropdownMenuSubTrigger>{category.title}</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							{category.items.map(item => (
								<DropdownMenuItem key={item.href} asChild>
									<Link href={item.href}>{item.label}</Link>
								</DropdownMenuItem>
							))}
						</DropdownMenuSubContent>
					</DropdownMenuSub>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
