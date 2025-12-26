'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import type { ErrorBoundaryProps } from '@/shared/types'
import { ErrorDisplay } from '@/shared/ui/error-display'

/**
 * Error boundary component for locale-specific error handling.
 *
 * @param props - The error boundary props
 * @param props.error - The error object with optional digest
 * @param props.reset - Function to reset the error boundary
 * @returns The error display component
 *
 * @example
 * Automatically rendered by Next.js when an error occurs in the locale route.
 */
export default function Error({ error, reset }: ErrorBoundaryProps) {
	const t = useTranslations('ERROR')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		console.error('Application error:', error)
	}, [error])

	const copyErrorId = () => {
		if (error.digest) {
			navigator.clipboard.writeText(error.digest)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

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
			onCopy={copyErrorId}
			isCopied={copied}
			showDevMessage={process.env.NODE_ENV === 'development' && !!error.message}
			devMessage={error.message}
		/>
	)
}
