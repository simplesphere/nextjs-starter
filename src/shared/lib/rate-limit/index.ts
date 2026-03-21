import type { RateLimitConfig, RateLimitResult } from '@/shared/lib/rate-limit/types'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const MAX_ENTRIES = 10_000
const CLEANUP_INTERVAL = 50
let callsSinceCleanup = 0

/**
 * Removes expired entries from the rate limit map to prevent memory leaks.
 * Runs periodically based on CLEANUP_INTERVAL.
 */
function cleanup() {
	const now = Date.now()
	for (const [key, entry] of rateLimitMap) {
		if (now > entry.resetTime) {
			rateLimitMap.delete(key)
		}
	}
}

/**
 * Simple in-memory rate limiter for server actions.
 * Uses a fixed window approach per key with automatic cleanup of expired entries.
 *
 * NOTE: This is per-instance only. For multi-instance deployments,
 * replace with a Redis-backed solution (e.g. @upstash/ratelimit).
 */
export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
	callsSinceCleanup++
	if (callsSinceCleanup >= CLEANUP_INTERVAL || rateLimitMap.size > MAX_ENTRIES) {
		cleanup()
		callsSinceCleanup = 0
	}

	const now = Date.now()
	const entry = rateLimitMap.get(key)

	if (!entry || now > entry.resetTime) {
		rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs })
		return { allowed: true, remaining: config.maxAttempts - 1, retryAfterMs: 0 }
	}

	if (entry.count >= config.maxAttempts) {
		return { allowed: false, remaining: 0, retryAfterMs: entry.resetTime - now }
	}

	entry.count++
	return { allowed: true, remaining: config.maxAttempts - entry.count, retryAfterMs: 0 }
}
