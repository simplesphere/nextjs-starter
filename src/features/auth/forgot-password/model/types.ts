/**
 * Server action result type for forgot password operation.
 */
export type ForgotPasswordResult = { success: true; data: { message: string } } | { success: false; error: string }
