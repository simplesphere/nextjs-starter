import { routes } from '@/shared/config/routes'
import type { NavigationCategory, NavigationData, NavigationItem } from '@/widgets/navigation/model/types'

/**
 * Generates navigation data structure with categories and standalone pages.
 *
 * NOTE: Auth links are intentionally absent from public marketing navigation
 * — entry into the auth flow is via the dedicated "Sign in" CTA in the app
 * shell, not via a public dropdown. Add additional categories here as your
 * product grows.
 *
 * @param t - Translation function for navigation keys
 * @returns Navigation data with categories and standalone pages
 *
 * @example
 * ```ts
 * const t = useTranslations('NAVIGATION')
 * const { categories, standalonePages } = getNavigationData(t)
 * ```
 */
export function getNavigationData(t: (key: string) => string): NavigationData {
	const categories: NavigationCategory[] = [
		{
			title: t('DASHBOARD.TITLE'),
			items: [{ href: routes.dashboard.root, label: t('DASHBOARD.HOME') }]
		},
		{
			title: t('LEGAL.TITLE'),
			items: [
				{ href: routes.privacy, label: t('LEGAL.PRIVACY_POLICY') },
				{ href: routes.terms, label: t('LEGAL.TERMS_OF_SERVICE') }
			]
		}
	]

	const standalonePages: NavigationItem[] = [
		{ href: routes.home, label: t('HOME') },
		{ href: routes.about, label: t('ABOUT') },
		{ href: routes.auth.login, label: t('LOGIN') }
	]

	return { categories, standalonePages }
}
