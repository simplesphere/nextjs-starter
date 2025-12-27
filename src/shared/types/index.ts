import type { ReactNode } from 'react'
import type * as React from 'react'

export interface RootLayoutProps {
	readonly children: ReactNode
}

export interface LocaleLayoutParams {
	locale: string
}

export interface LocaleLayoutProps {
	children: ReactNode
	params: Promise<LocaleLayoutParams>
}

export interface ErrorWithDigest extends Error {
	digest?: string
}

export interface ErrorBoundaryProps {
	error: ErrorWithDigest
	reset: () => void
}

export interface NotFoundDisplayProps {
	title: string
	heading: string
	description: string
	goHomeLabel: string
}

export interface ErrorDisplayProps extends ErrorBoundaryProps {
	title: string
	description: string
	errorIdLabel: string
	tryAgainLabel: string
	goHomeLabel: string
	copyLabel: string
	copiedLabel: string
	showErrorId?: boolean
	showCopyButton?: boolean
	showGoHome?: boolean
	onCopy?: () => void
	isCopied?: boolean
	showDevMessage?: boolean
	devMessage?: string
}

export interface LoadingSpinnerProps {
	message: string
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export interface FormFieldProps {
	label: string
	error?: string
	required?: boolean
	inputProps: InputProps & { id: string; name: string }
}

export interface FormErrorProps {
	message: string
}

export interface OtpInputProps {
	length?: number
	value: string
	onChange: (value: string) => void
	disabled?: boolean
	className?: string
}
