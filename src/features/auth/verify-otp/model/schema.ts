import { z } from 'zod'

export const verifyOtpSchema = z.object({
	otp: z.string().length(6, 'OTP_REQUIRED')
})

export type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>
