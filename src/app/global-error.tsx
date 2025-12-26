'use client'

import { NextIntlClientProvider, useTranslations } from 'next-intl'
import { DEFAULT_LOCALE } from '@/shared/constants/locales'
import { defaultMessages } from '@/shared/constants/messages'
import type { ErrorBoundaryProps } from '@/shared/types'
import { ErrorDisplay } from '@/shared/ui/error-display'

/**
 * Global error content component that displays error information.
 *
 * @param props - The error boundary props
 * @param props.error - The error object with optional digest
 * @param props.reset - Function to reset the error boundary
 * @returns The error display component
 */
function GlobalErrorContent({ error, reset }: ErrorBoundaryProps) {
	const t = useTranslations('GLOBAL_ERROR')

	return (
		<ErrorDisplay
			error={error}
			reset={reset}
			title={t('TITLE')}
			description={t('DESCRIPTION')}
			errorIdLabel={t('ERROR_ID')}
			tryAgainLabel={t('TRY_AGAIN')}
			goHomeLabel={t('GO_HOME')}
			copyLabel={t('COPY')}
			copiedLabel={t('COPIED')}
			showGoHome={false}
			showCopyButton={false}
		/>
	)
}

/**
 * Global error boundary component for root-level error handling.
 * This component wraps the error in a full HTML document structure.
 *
 * @param props - The error boundary props
 * @param props.error - The error object with optional digest
 * @param props.reset - Function to reset the error boundary
 * @returns The global error page with HTML structure
 *
 * @example
 * Automatically rendered by Next.js when a critical error occurs at the root level.
 */
export default function GlobalError({ error, reset }: ErrorBoundaryProps) {
	return (
		<html lang={DEFAULT_LOCALE}>
			<body>
				<NextIntlClientProvider locale={DEFAULT_LOCALE} messages={defaultMessages}>
					<GlobalErrorContent error={error} reset={reset} />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
