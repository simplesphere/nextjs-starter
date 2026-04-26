import { cn } from '@/shared/lib/utils'
import type {
	HeadingLeading,
	HeadingLevel,
	HeadingProps,
	HeadingSize,
	HeadingTracking,
	HeadingWeight
} from '@/shared/types'

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

const weightClasses: Record<HeadingWeight, string> = {
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold'
}

const trackingClasses: Record<HeadingTracking, string> = {
	tighter: 'tracking-tighter',
	tight: 'tracking-tight',
	normal: 'tracking-normal',
	wide: 'tracking-wide'
}

const leadingClasses: Record<HeadingLeading, string> = {
	none: 'leading-none',
	tight: 'leading-tight',
	snug: 'leading-snug',
	normal: 'leading-normal',
	relaxed: 'leading-relaxed'
}

const defaultWeightFor: Record<HeadingLevel, HeadingWeight> = {
	h1: 'bold',
	h2: 'semibold',
	h3: 'semibold',
	h4: 'semibold',
	h5: 'medium',
	h6: 'medium'
}

/**
 * Polymorphic heading component. Decouples semantic level (`as`) from
 * visual size, weight, tracking, and leading so layout decisions don't
 * dictate document outline. Color is inherited from the parent — wrap in a
 * colored container to override.
 *
 * @param props - Heading configuration
 * @param props.as - Semantic heading element (default: `h1`)
 * @param props.size - Visual size token (default: `md`)
 * @param props.weight - Optional weight override (defaults to a sensible value per level)
 * @param props.tracking - Letter-spacing token
 * @param props.leading - Line-height token
 * @param props.uppercase - Apply uppercase transform
 * @param props.className - Additional Tailwind classes
 * @param props.children - Heading content
 * @returns A heading element of the requested level with the requested styling
 *
 * @example
 * ```tsx
 * <Heading as="h2" size="xl" weight="bold" tracking="tight">Welcome</Heading>
 * ```
 */
export function Heading({
	as = 'h1',
	size = 'md',
	weight,
	tracking,
	leading,
	uppercase = false,
	className,
	children
}: HeadingProps) {
	const Component = as
	const resolvedWeight = weight ?? defaultWeightFor[as]

	return (
		<Component
			className={cn(
				weightClasses[resolvedWeight],
				sizeClasses[size],
				tracking && trackingClasses[tracking],
				leading && leadingClasses[leading],
				uppercase && 'uppercase',
				className
			)}
		>
			{children}
		</Component>
	)
}
