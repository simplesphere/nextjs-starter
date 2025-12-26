'use client'

import { AlertCircle, Check, Copy } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import type { ErrorDisplayProps } from '@/shared/types'

/**
 * Displays an error message with optional error ID, copy functionality, and action buttons.
 *
 * @param props - The error display configuration
 * @param props.error - The error object with optional digest
 * @param props.reset - Function to reset the error boundary
 * @param props.title - Error title text
 * @param props.description - Error description text
 * @param props.errorIdLabel - Label for the error ID section
 * @param props.tryAgainLabel - Label for the try again button
 * @param props.goHomeLabel - Label for the go home button
 * @param props.copyLabel - Label for the copy button
 * @param props.copiedLabel - Label shown when error ID is copied
 * @param props.showErrorId - Whether to show the error ID section
 * @param props.showCopyButton - Whether to show the copy button
 * @param props.showGoHome - Whether to show the go home button
 * @param props.onCopy - Callback when copy button is clicked
 * @param props.isCopied - Whether the error ID has been copied
 * @param props.showDevMessage - Whether to show development error message
 * @param props.devMessage - Development error message to display
 * @returns The error display component
 *
 * @example
 * ```tsx
 * <ErrorDisplay
 *   error={error}
 *   reset={reset}
 *   title="Something went wrong"
 *   description="An error occurred"
 *   errorIdLabel="Error ID"
 *   tryAgainLabel="Try again"
 *   goHomeLabel="Go home"
 *   copyLabel="Copy"
 *   copiedLabel="Copied"
 * />
 * ```
 */
export function ErrorDisplay({
	error,
	reset,
	title,
	description,
	errorIdLabel,
	tryAgainLabel,
	goHomeLabel,
	copyLabel,
	copiedLabel,
	showErrorId = true,
	showCopyButton = true,
	showGoHome = true,
	onCopy,
	isCopied = false,
	showDevMessage = false,
	devMessage
}: ErrorDisplayProps) {
	return (
		<div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-black">
			<div className="w-full max-w-md space-y-6">
				<div className="flex justify-center">
					<AlertCircle className="h-12 w-12 text-red-600 dark:text-red-500" strokeWidth={1.5} />
				</div>
				<div className="space-y-4 text-center">
					<h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{title}</h1>
					<p className="text-zinc-600 dark:text-zinc-400">{description}</p>
				</div>
				{showDevMessage && devMessage && (
					<div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
						<p className="text-sm text-red-900 dark:text-red-200">{devMessage}</p>
					</div>
				)}
				{showErrorId && error.digest && (
					<div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
						<div className="flex-1">
							<p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{errorIdLabel}</p>
							<p className="font-mono text-sm text-zinc-900 dark:text-zinc-50">{error.digest}</p>
						</div>
						{showCopyButton && onCopy && (
							<button
								onClick={onCopy}
								className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-800"
							>
								{isCopied ? (
									<>
										<Check className="h-3.5 w-3.5" />
										{copiedLabel}
									</>
								) : (
									<>
										<Copy className="h-3.5 w-3.5" />
										{copyLabel}
									</>
								)}
							</button>
						)}
					</div>
				)}
				<div className="flex gap-3">
					<button
						onClick={reset}
						className="flex-1 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
					>
						{tryAgainLabel}
					</button>
					{showGoHome && (
						<Link
							href="/"
							className="flex-1 rounded-lg border border-zinc-300 px-4 py-2.5 text-center text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
						>
							{goHomeLabel}
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
