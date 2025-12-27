import type { FormErrorProps } from '@/shared/types'

/**
 * Displays a general form error message.
 *
 * @param props - Error message props
 * @param props.message - Error message to display
 * @returns The error message component
 *
 * @example
 * ```tsx
 * <FormError message="An error occurred" />
 * ```
 */
export function FormError({ message }: FormErrorProps) {
	return (
		<div className="rounded-md bg-red-50 p-3 text-sm text-red-900 dark:bg-red-950 dark:text-red-200">{message}</div>
	)
}
