/**
 * Minimal structured-logger seam. Defaults to `console` in dev/test and a
 * silent-by-default emitter in production until you swap in Sentry, Datadog,
 * or similar.
 *
 * Replace `productionEmitter` with your real reporter - keep the shape so
 * call sites don't change.
 *
 * @example
 * ```ts
 * import { logger } from '@/shared/lib/logger'
 * logger.error('Login failed', { error, ip })
 * ```
 */
type LogContext = Record<string, unknown>

interface LogEmitter {
	info(message: string, context?: LogContext): void
	warn(message: string, context?: LogContext): void
	error(message: string, context?: LogContext): void
}

const consoleEmitter: LogEmitter = {
	info: (message, context) => console.info(message, context ?? ''),
	warn: (message, context) => console.warn(message, context ?? ''),
	error: (message, context) => console.error(message, context ?? '')
}

// In production, default to console as well so failures aren't silent before
// the user wires up a real reporter. Swap this constant for your integration.
const productionEmitter: LogEmitter = consoleEmitter

export const logger: LogEmitter = process.env.NODE_ENV === 'production' ? productionEmitter : consoleEmitter
