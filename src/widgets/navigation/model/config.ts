import type { NavigationCategory, NavigationData, NavigationItem } from '@/widgets/navigation/model/types'

/**
 * Generates navigation data structure with categories and standalone pages.
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
			title: t('AUTH.TITLE'),
			items: [
				{ href: '/login', label: t('AUTH.LOGIN') },
				{ href: '/reset-password', label: t('AUTH.RESET_PASSWORD') },
				{ href: '/verify-otp', label: t('AUTH.VERIFY_OTP') },
				{ href: '/forgot-password', label: t('AUTH.FORGOT_PASSWORD') }
			]
		},
		{
			title: t('DASHBOARD.TITLE'),
			items: [{ href: '/dashboard', label: t('DASHBOARD.HOME') }]
		},
		{
			title: t('PRIVACY.TITLE'),
			items: [
				{ href: '/privacy', label: t('PRIVACY.PRIVACY_POLICY') },
				{ href: '/terms', label: t('PRIVACY.TERMS_OF_SERVICE') }
			]
		}
	]

	const standalonePages: NavigationItem[] = [
		{ href: '/', label: t('HOME') },
		{ href: '/about', label: t('ABOUT') }
	]

	return { categories, standalonePages }
}
