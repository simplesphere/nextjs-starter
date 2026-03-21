import { cn } from '@/shared/lib/utils'
import type { HeadingLevel, HeadingProps, HeadingSize } from '@/shared/types'

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

export function Heading({ as = 'h1', size = 'md', uppercase = false, className, children }: HeadingProps) {
	const Component = as

	return (
		<Component
			className={cn('text-foreground', weightClasses[as], sizeClasses[size], uppercase && 'uppercase', className)}
		>
			{children}
		</Component>
	)
}
