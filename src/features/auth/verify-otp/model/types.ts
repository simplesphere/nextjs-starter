/**
 * Server action result type for OTP verification operation.
 */
export type VerifyOtpResult =
	| { success: true; data: { message: string; resetToken?: string } }
	| { success: false; error: string }
