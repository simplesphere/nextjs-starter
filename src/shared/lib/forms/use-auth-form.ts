'use client'

import { type FieldValues, type Path, type UseFormReturn } from 'react-hook-form'
import { useEffect } from 'react'

/**
 * Auto-clears the form's `root` error as soon as any tracked field changes.
 *
 * Without this, a server-side error banner ("Invalid credentials") would stay
 * visible forever even after the user starts editing. Plug-and-play for any
 * react-hook-form instance — pass the form and the field names you want to
 * watch for changes.
 *
 * @param form - The `useForm` instance to wire up
 * @param fields - Field names whose changes should clear the root error
 *
 * @example
 * ```tsx
 * const form = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })
 * useClearRootOnChange(form, ['email', 'password'])
 * ```
 */
export function useClearRootOnChange<T extends FieldValues>(form: UseFormReturn<T>, fields: Path<T>[]) {
	const { watch, formState, clearErrors } = form
	const hasRootError = !!formState.errors.root

	useEffect(() => {
		if (!hasRootError) return

		const subscription = watch((_, { name }) => {
			if (name && (fields as string[]).includes(name)) {
				clearErrors('root')
			}
		})

		return () => subscription.unsubscribe()
	}, [watch, hasRootError, fields, clearErrors])
}
