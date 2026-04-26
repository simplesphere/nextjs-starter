import { afterEach, describe, expect, it } from 'vitest'
import { __resetRateLimitForTests, rateLimit } from '@/shared/lib/rate-limit'

describe('rateLimit', () => {
	afterEach(() => {
		__resetRateLimitForTests()
	})

	it('allows up to maxAttempts within the window', () => {
		const config = { maxAttempts: 3, windowMs: 60_000 }
		expect(rateLimit('user:1', config).allowed).toBe(true)
		expect(rateLimit('user:1', config).allowed).toBe(true)
		expect(rateLimit('user:1', config).allowed).toBe(true)
		const fourth = rateLimit('user:1', config)
		expect(fourth.allowed).toBe(false)
		expect(fourth.retryAfterMs).toBeGreaterThan(0)
	})

	it('decrements remaining count on each call', () => {
		const config = { maxAttempts: 3, windowMs: 60_000 }
		expect(rateLimit('user:2', config).remaining).toBe(2)
		expect(rateLimit('user:2', config).remaining).toBe(1)
		expect(rateLimit('user:2', config).remaining).toBe(0)
	})

	it('resets after the window expires', async () => {
		const config = { maxAttempts: 1, windowMs: 10 }
		expect(rateLimit('user:3', config).allowed).toBe(true)
		expect(rateLimit('user:3', config).allowed).toBe(false)
		await new Promise(resolve => setTimeout(resolve, 15))
		expect(rateLimit('user:3', config).allowed).toBe(true)
	})

	it('isolates buckets by key', () => {
		const config = { maxAttempts: 1, windowMs: 60_000 }
		expect(rateLimit('user:a', config).allowed).toBe(true)
		expect(rateLimit('user:b', config).allowed).toBe(true)
		expect(rateLimit('user:a', config).allowed).toBe(false)
		expect(rateLimit('user:b', config).allowed).toBe(false)
	})
})
