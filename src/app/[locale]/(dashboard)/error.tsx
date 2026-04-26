'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { logger } from '@/shared/lib/logger'
import type { ErrorBoundaryProps } from '@/shared/types'
import { ErrorDisplay } from '@/shared/ui/error-display'

/**
 * Error boundary scoped to the authenticated dashboard segment.
 *
 * Renders inside the SidebarProvider so the sidebar/header chrome stays
 * intact when a single dashboard page throws — the user can still navigate
 * to a different workspace section instead of bouncing to a full-screen error.
 *
 * @param props - The error boundary props
 * @param props.error - The error object with optional digest
 * @param props.reset - Function to reset the error boundary
 * @returns The error display component
 */
export default function DashboardError({ error, reset }: ErrorBoundaryProps) {
	const t = useTranslations('ERROR')
	const [copied, setCopied] = useState(false)

	useEffect(() => {
		logger.error('Dashboard error boundary triggered', { digest: error.digest, message: error.message })
	}, [error])

	const copyErrorId = () => {
		if (error.digest) {
			navigator.clipboard.writeText(error.digest)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	return (
		<div className="flex flex-1 items-center justify-center p-6">
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
				showGoHome={false}
				showDevMessage={process.env.NODE_ENV === 'development' && !!error.message}
				devMessage={error.message}
			/>
		</div>
	)
}
