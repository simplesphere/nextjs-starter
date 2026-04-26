'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Controller, useForm } from 'react-hook-form'
import { useCallback, useEffect, useRef, useState, useTransition } from 'react'
import { verifyOtpAction } from '@/features/auth/verify-otp/api/actions'
import { resendOtpAction } from '@/features/auth/verify-otp/api/resend'
import { type VerifyOtpFormData, verifyOtpSchema } from '@/features/auth/verify-otp/model/schema'
import { useClearRootOnChange } from '@/shared/lib/forms'
import { translateError } from '@/shared/lib/i18n'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, FormError, OtpInput } from '@/shared/ui'

const OTP_LENGTH = 6

/**
 * OTP verification form component.
 * Auto-submits when all 6 digits are filled and offers a rate-limited resend.
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
	const form = useForm<VerifyOtpFormData>({
		resolver: zodResolver(verifyOtpSchema),
		defaultValues: { otp: '' }
	})
	const {
		control,
		handleSubmit,
		setError,
		watch,
		formState: { errors }
	} = form

	const [isPending, startTransition] = useTransition()
	const [resendState, setResendState] = useState<'idle' | 'sent'>('idle')
	const [isResending, startResendTransition] = useTransition()
	const autoSubmitted = useRef(false)

	useClearRootOnChange(form, ['otp'])

	// React Compiler flags `watch` as non-memoizable; that's expected for RHF
	// and the value is consumed only inside the effect below.
	// eslint-disable-next-line react-hooks/incompatible-library
	const otpValue = watch('otp')

	/**
	 * Handles form submission. The server action redirects on success, so only
	 * failure paths land back here.
	 *
	 * @param data - Validated OTP form data
	 */
	const onSubmit = useCallback(
		(data: VerifyOtpFormData) => {
			startTransition(async () => {
				const result = await verifyOtpAction(data)
				if (result && !result.success) {
					autoSubmitted.current = false
					setError('root', { message: result.error })
				}
			})
		},
		[setError]
	)

	useEffect(() => {
		// Auto-submit once the user fills the final digit; reset the gate when
		// the value drops back below full so a corrected entry can re-submit.
		if (otpValue?.length === OTP_LENGTH && !autoSubmitted.current && !isPending) {
			autoSubmitted.current = true
			handleSubmit(onSubmit)()
		}
		if ((otpValue?.length ?? 0) < OTP_LENGTH) {
			autoSubmitted.current = false
		}
	}, [otpValue, isPending, handleSubmit, onSubmit])

	const handleResend = () => {
		startResendTransition(async () => {
			const result = await resendOtpAction()
			if (result.success) {
				setResendState('sent')
				// Re-enable the link shortly so the user can resend again on next failure.
				setTimeout(() => setResendState('idle'), 4_000)
			} else {
				setError('root', { message: result.error ?? 'GENERAL' })
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

					<div className="space-y-2">
						<label htmlFor="otp" className="text-sm leading-none font-medium">
							{t('OTP_LABEL')}
							<span className="ml-0.5 text-destructive">*</span>
						</label>
						<Controller
							name="otp"
							control={control}
							render={({ field }) => (
								<OtpInput
									value={field.value || ''}
									onChange={field.onChange}
									disabled={isPending}
									length={OTP_LENGTH}
								/>
							)}
						/>
						{errors.otp && (
							<p role="alert" className="text-sm text-destructive">
								{translateError(t, errors.otp.message)}
							</p>
						)}
						<p className="text-sm text-muted-foreground">{t('HELP_TEXT')}</p>
					</div>

					<Button type="submit" className="w-full" disabled={isPending}>
						{isPending ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>

					<p className="text-center text-sm text-muted-foreground">
						{t('RESEND_PROMPT')}{' '}
						<button
							type="button"
							onClick={handleResend}
							disabled={isResending || resendState === 'sent'}
							className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
						>
							{resendState === 'sent' ? t('RESEND_SENT') : t('RESEND')}
						</button>
					</p>
				</form>
			</CardContent>
		</Card>
	)
}
