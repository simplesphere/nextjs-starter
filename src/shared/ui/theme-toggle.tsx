'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@shared/ui/shadcn/dropdown-menu'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { Button } from '@/shared/ui/shadcn/button'

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

/**
 * Theme toggle component for switching between light, dark, and system modes.
 * Hydration-safe via a mount gate: next-themes resolves the theme synchronously
 * on the client (from storage / the injected script) but it is unavailable
 * during SSR, so we render neutral icon styles until after hydration to avoid
 * a server/client style mismatch.
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
	const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

	const isDark = mounted && resolvedTheme === 'dark'

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" size="icon" className="relative h-9 w-9" aria-label={t('ARIA_LABEL')} />}
			>
				<Sun
					className="h-4 w-4 transition-all"
					style={{
						opacity: mounted && !isDark ? 1 : 0,
						transform: isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0) scale(1)'
					}}
				/>
				<Moon
					className="absolute h-4 w-4 transition-all"
					style={{
						opacity: mounted && isDark ? 1 : 0,
						transform: isDark ? 'rotate(0) scale(1)' : 'rotate(90deg) scale(0)'
					}}
				/>
				<span className="sr-only">{t('ARIA_LABEL')}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')} aria-checked={theme === 'light'} role="menuitemradio">
					<Sun className="mr-2 h-4 w-4" />
					{t('LIGHT')}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')} aria-checked={theme === 'dark'} role="menuitemradio">
					<Moon className="mr-2 h-4 w-4" />
					{t('DARK')}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')} aria-checked={theme === 'system'} role="menuitemradio">
					<Monitor className="mr-2 h-4 w-4" />
					{t('SYSTEM')}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
