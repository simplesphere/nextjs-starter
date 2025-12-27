'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Controller, useForm } from 'react-hook-form'
import { verifyOtpAction } from '@/features/auth/verify-otp/api/actions'
import { type VerifyOtpFormData, verifyOtpSchema } from '@/features/auth/verify-otp/model/schema'
import { useRouter } from '@/shared/config/i18n'
import { translateError } from '@/shared/lib/i18n'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormError, OtpInput } from '@/shared/ui'

/**
 * OTP verification form component.
 *
 * @returns The OTP verification form component
 *
 * @example
 * ```tsx
 * <VerifyOtpForm />
 * ```
 */
export function VerifyOtpForm() {
	const t = useTranslations('AUTH.VERIFY_OTP')
	const router = useRouter()
	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting }
	} = useForm<VerifyOtpFormData>({
		resolver: zodResolver(verifyOtpSchema)
	})

	/**
	 * Handles form submission with validated OTP data.
	 *
	 * @param data - Validated OTP form data
	 */
	const onSubmit = async (data: VerifyOtpFormData) => {
		const result = await verifyOtpAction(data)

		if (result.success) {
			router.push('/reset-password')
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

					<div className="space-y-2">
						<label htmlFor="otp" className="text-sm leading-none font-medium">
							{t('OTP_LABEL')}
							<span className="ml-0.5 text-red-500">*</span>
						</label>
						<Controller
							name="otp"
							control={control}
							render={({ field }) => (
								<OtpInput value={field.value || ''} onChange={field.onChange} disabled={isSubmitting} length={6} />
							)}
						/>
						{errors.otp && (
							<p className="text-sm text-red-600 dark:text-red-400">{translateError(t, errors.otp.message)}</p>
						)}
						<p className="text-sm text-zinc-600 dark:text-zinc-400">{t('HELP_TEXT')}</p>
					</div>

					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
