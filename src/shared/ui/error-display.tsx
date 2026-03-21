'use client'

import { AlertCircle, Check, Copy } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import type { ErrorDisplayProps } from '@/shared/types'
import { Button } from '@/shared/ui/shadcn/button'

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
		<div className="flex min-h-screen items-center justify-center bg-background px-4">
			<div className="w-full max-w-md space-y-6">
				<div className="flex justify-center">
					<AlertCircle className="h-12 w-12 text-destructive" strokeWidth={1.5} />
				</div>
				<div className="space-y-4 text-center">
					<h1 className="text-2xl font-semibold text-foreground">{title}</h1>
					<p className="text-muted-foreground">{description}</p>
				</div>
				{showDevMessage && devMessage && (
					<div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4">
						<p className="text-sm text-destructive">{devMessage}</p>
					</div>
				)}
				{showErrorId && error.digest && (
					<div className="flex items-center justify-between rounded-lg border border-border bg-muted px-4 py-3">
						<div className="flex-1">
							<p className="text-xs font-medium text-muted-foreground">{errorIdLabel}</p>
							<p className="font-mono text-sm text-foreground">{error.digest}</p>
						</div>
						{showCopyButton && onCopy && (
							<button
								onClick={onCopy}
								className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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
					<Button onClick={reset} className="flex-1">
						{tryAgainLabel}
					</Button>
					{showGoHome && (
						<Button variant="outline" className="flex-1" asChild>
							<Link href="/">{goHomeLabel}</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
