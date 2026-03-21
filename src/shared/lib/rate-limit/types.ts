export interface RateLimitConfig {
	maxAttempts: number
	windowMs: number
}

export interface RateLimitResult {
	allowed: boolean
	remaining: number
	retryAfterMs: number
}
