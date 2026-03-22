import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode } from 'react'

export interface RootLayoutProps {
	readonly children: ReactNode
}

export interface LocaleLayoutParams {
	locale: string
}

export interface WorkspaceLayoutParams extends LocaleLayoutParams {
	workspace: string
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

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export interface HeadingProps {
	as?: HeadingLevel
	size?: HeadingSize
	uppercase?: boolean
	className?: string
	children: ReactNode
}

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

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

export interface LayoutDashboardProps {
	children: ReactNode
	params: Promise<LocaleLayoutParams>
}

export interface WorkspaceLayoutProps {
	children: ReactNode
	params: Promise<WorkspaceLayoutParams>
}

export interface WorkspacePageProps {
	params: Promise<WorkspaceLayoutParams>
}

/**
 * Props for generateMetadata function in page components.
 * Follows Next.js 16 metadata API conventions.
 */
export interface GenerateMetadataProps {
	params: Promise<LocaleLayoutParams>
	searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export interface WorkspaceMetadataProps {
	params: Promise<WorkspaceLayoutParams>
	searchParams?: Promise<Record<string, string | string[] | undefined>>
}

export interface StatsCardProps {
	title: string
	value: string | number
	icon: ReactNode
	tooltip?: string
}

export interface StatsCardTooltipProps {
	content: string
}
