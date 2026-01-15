import type { ReactNode } from 'react'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

export interface HeadingProps {
	as?: HeadingLevel
	size?: HeadingSize
	uppercase?: boolean
	className?: string
	children: ReactNode
}

const sizeClasses: Record<HeadingSize, string> = {
	xs: 'text-sm',
	sm: 'text-base',
	md: 'text-xl',
	lg: 'text-2xl',
	xl: 'text-4xl',
	'2xl': 'text-6xl',
	'3xl': 'text-7xl',
	'4xl': 'text-8xl'
}

const weightClasses: Record<HeadingLevel, string> = {
	h1: 'font-bold',
	h2: 'font-semibold',
	h3: 'font-semibold',
	h4: 'font-semibold',
	h5: 'font-medium',
	h6: 'font-medium'
}

/**
 * Reusable heading component with semantic control and styling options.
 * Uses default foreground color and appropriate font weights based on heading level.
 *
 * @param props - The heading props
 * @param props.as - The semantic HTML element to render (default: 'h1')
 * @param props.size - The size variant (default: 'md')
 * @param props.uppercase - Whether to apply uppercase styling (default: false)
 * @param props.className - Additional CSS classes
 * @param props.children - The heading content
 * @returns The heading component
 *
 * @example
 * ```tsx
 * <Heading as="h2" size="lg">
 *   Section title
 * </Heading>
 * ```
 */
export function Heading({ as = 'h1', size = 'md', uppercase = false, className = '', children }: HeadingProps) {
	const Component = as
	const headingAs = as
	const defaultClasses = [
		'text-foreground',
		weightClasses[headingAs],
		sizeClasses[size],
		uppercase ? 'uppercase' : ''
	].filter(Boolean)
	const classes = [...defaultClasses, className].filter(Boolean).join(' ')

	return <Component className={classes}>{children}</Component>
}
