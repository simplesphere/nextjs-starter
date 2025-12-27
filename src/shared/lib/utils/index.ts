import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names with Tailwind CSS conflict resolution.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * import { cn } from '@/shared/lib/utils'
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * ```
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
