'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { forgotPasswordAction } from '@/features/auth/forgot-password/api/actions'
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/features/auth/forgot-password/model/schema'
import { useRouter } from '@/shared/config/i18n'
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
	const router = useRouter()
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<ForgotPasswordFormData>({
		resolver: zodResolver(forgotPasswordSchema)
	})

	/**
	 * Handles form submission with validated email data.
	 *
	 * @param data - Validated forgot password form data
	 */
	const onSubmit = async (data: ForgotPasswordFormData) => {
		const result = await forgotPasswordAction(data)

		if (result.success) {
			router.push('/verify-otp')
		} else {
			setError('root', { message: result.error })
		}
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
							placeholder: t('EMAIL_PLACEHOLDER'),
							disabled: isSubmitting,
							...register('email')
						}}
					/>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
