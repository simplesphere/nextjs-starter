import type { RateLimitConfig, RateLimitResult } from '@/shared/lib/rate-limit/types'

interface RateLimitEntry {
	count: number
	resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const MAX_ENTRIES = 10_000
const CLEANUP_INTERVAL = 50
let callsSinceCleanup = 0

/**
 * Removes expired entries from the rate limit map to prevent memory leaks.
 * Falls back to evicting the oldest entry when the cap is reached without
 * any expirations to reclaim - keeps the map bounded under sustained load.
 */
function cleanup(now: number) {
	for (const [key, entry] of rateLimitMap) {
		if (now > entry.resetTime) {
			rateLimitMap.delete(key)
		}
	}

	if (rateLimitMap.size > MAX_ENTRIES) {
		// Evict the oldest insertion(s) - Map preserves insertion order, so the
		// first entry is always the oldest seen. Drop until we're back under cap.
		const overflow = rateLimitMap.size - MAX_ENTRIES
		const iterator = rateLimitMap.keys()
		for (let i = 0; i < overflow; i++) {
			const next = iterator.next()
			if (next.done) break
			rateLimitMap.delete(next.value)
		}
	}
}

/**
 * Simple in-memory rate limiter for server actions.
 * Uses a fixed-window strategy per key with periodic cleanup of expired
 * entries and oldest-first eviction when the cap is exceeded.
 *
 * NOTE: This is per-instance only. For multi-instance deployments,
 * replace with a Redis-backed solution (e.g. @upstash/ratelimit).
 *
 * @param key - Stable identifier for the bucket (e.g. `login:${ip}`)
 * @param config - Window size and max attempts
 * @returns Whether the request is allowed plus telemetry
 */
export function rateLimit(key: string, config: RateLimitConfig): RateLimitResult {
	const now = Date.now()

	callsSinceCleanup++
	if (callsSinceCleanup >= CLEANUP_INTERVAL || rateLimitMap.size > MAX_ENTRIES) {
		cleanup(now)
		callsSinceCleanup = 0
	}

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

/**
 * Test-only hook to reset the in-memory state between tests.
 * Not exported from the package barrel.
 */
export function __resetRateLimitForTests(): void {
	rateLimitMap.clear()
	callsSinceCleanup = 0
}
