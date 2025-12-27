'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'

/**
 * Theme toggle component for switching between light and dark modes.
 *
 * @returns The theme toggle component
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
	const { theme, setTheme, resolvedTheme } = useTheme()
	const t = useTranslations('THEME_TOGGLE')

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => {
				if (resolvedTheme) {
					setTheme(theme === 'dark' ? 'light' : 'dark')
				}
			}}
			className={cn('relative h-9 w-9')}
			aria-label={t('ARIA_LABEL')}
			suppressHydrationWarning
		>
			<Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<span className="sr-only">{t('ARIA_LABEL')}</span>
		</Button>
	)
}
