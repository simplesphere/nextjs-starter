import { NextResponse } from 'next/server'

/**
 * Liveness/health probe. Returns the app version and current timestamp so
 * uptime monitors and orchestrators (k8s, ECS, fly.io, etc.) can verify the
 * process is alive and reachable.
 *
 * Keep this endpoint cheap - no DB queries, no external calls. Add a
 * separate `/api/readiness` route if you need dependency checks.
 *
 * @returns 200 OK with `{ ok, version, time }`
 */
export const dynamic = 'force-dynamic'
export const revalidate = 0

export function GET() {
	return NextResponse.json(
		{
			ok: true,
			version: process.env.npm_package_version ?? null,
			time: new Date().toISOString()
		},
		{
			headers: {
				'Cache-Control': 'no-store, max-age=0'
			}
		}
	)
}
