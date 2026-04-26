'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { forgotPasswordAction } from '@/features/auth/forgot-password/api/actions'
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/features/auth/forgot-password/model/schema'
import { useClearRootOnChange } from '@/shared/lib/forms'
import { translateError } from '@/shared/lib/i18n'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormError, FormField } from '@/shared/ui'

/**
 * Forgot password form component with email validation.
 *
 * @returns The forgot password form component
 *
 * @example
 * ```tsx
 * <ForgotPasswordForm />
 * ```
 */
export function ForgotPasswordForm() {
	const t = useTranslations('AUTH.FORGOT_PASSWORD')
	const form = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema)
	})
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = form
	const [isPending, startTransition] = useTransition()

	useClearRootOnChange(form, ['email'])

	/**
	 * Handles form submission with validated email data.
	 * Server action redirects on success — only failures land here.
	 *
	 * @param data - Validated forgot password form data
	 */
	const onSubmit = (data: ForgotPasswordFormData) => {
		startTransition(async () => {
			const result = await forgotPasswordAction(data)
			if (result && !result.success) {
				setError('root', { message: result.error })
			}
		})
	}

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">{t('TITLE')}</CardTitle>
				<CardDescription>{t('DESCRIPTION')}</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{errors.root && <FormError message={translateError(t, errors.root.message) || t('ERRORS.GENERAL')} />}

					<FormField
						label={t('EMAIL_LABEL')}
						error={translateError(t, errors.email?.message)}
						required
						inputProps={{
							id: 'email',
							type: 'email',
							autoComplete: 'email',
							placeholder: t('EMAIL_PLACEHOLDER'),
							disabled: isPending,
							...register('email')
						}}
					/>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
