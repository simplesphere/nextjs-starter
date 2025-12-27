/**
 * Translates zod error keys to localized error messages.
 *
 * @param t - Translation function from useTranslations or getTranslations
 * @param errorKey - Error key from zod schema (e.g., 'EMAIL_REQUIRED')
 * @param fallbackKey - Fallback error key if translation fails (default: 'GENERAL')
 * @returns Translated error message or undefined if no error
 *
 * @example
 * ```tsx
 * const t = useTranslations('AUTH.LOGIN')
 * const errorMessage = translateError(t, errors.email?.message)
 * ```
 */
export function translateError(
	t: (key: string) => string,
	errorKey: string | undefined,
	fallbackKey = 'GENERAL'
): string | undefined {
	if (!errorKey) return undefined

	try {
		return t(`ERRORS.${errorKey}`)
	} catch {
		try {
			return t(`ERRORS.${fallbackKey}`)
		} catch {
			return errorKey
		}
	}
}
