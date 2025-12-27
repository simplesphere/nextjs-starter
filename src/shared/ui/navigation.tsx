'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import { cn } from '@/shared/lib/utils'

/**
 * Navigation menu component with pages dropdown.
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
	const [isOpen, setIsOpen] = useState(false)

	const pages = [
		{ href: '/', label: t('HOME') },
		{ href: '/about', label: t('ABOUT') },
		{ href: '/privacy', label: t('PRIVACY') },
		{ href: '/terms', label: t('TERMS') }
	]

	return (
		<nav className="relative">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
				aria-expanded={isOpen}
				aria-haspopup="true"
			>
				{t('PAGES')}
				<ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} aria-hidden="true" />
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
					<ul
						className="absolute top-full right-0 z-50 mt-2 min-w-[200px] rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
						role="menu"
					>
						{pages.map(page => (
							<li key={page.href} role="none">
								<Link
									href={page.href}
									onClick={() => setIsOpen(false)}
									className="block px-4 py-2 text-sm text-zinc-900 transition-colors hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
									role="menuitem"
								>
									{page.label}
								</Link>
							</li>
						))}
					</ul>
				</>
			)}
		</nav>
	)
}
