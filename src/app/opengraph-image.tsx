import { getTranslations } from 'next-intl/server'
import { ImageResponse } from 'next/og'
import { DEFAULT_LOCALE } from '@/shared/constants/locales'

export const alt = 'Site preview'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Default Open Graph image generated at build time using the localized site
 * name and description. Override per-route by adding `opengraph-image.tsx` in
 * a route segment, or replace by dropping a static `opengraph-image.png` in
 * `src/app/`.
 */
export default async function OpengraphImage() {
	const t = await getTranslations({ locale: DEFAULT_LOCALE, namespace: 'METADATA' })

	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: 80,
				background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
				color: '#fafafa',
				fontFamily: 'system-ui, -apple-system, sans-serif'
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: 16
				}}
			>
				<div
					style={{
						width: 56,
						height: 56,
						borderRadius: 12,
						background: '#fafafa',
						color: '#0a0a0a',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 32,
						fontWeight: 800,
						letterSpacing: -1
					}}
				>
					N
				</div>
				<div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>{t('SITE_NAME')}</div>
			</div>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
				<div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -2, lineHeight: 1.05 }}>{t('TITLE')}</div>
				<div style={{ fontSize: 28, color: '#a1a1a1', maxWidth: 900, lineHeight: 1.4 }}>{t('DESCRIPTION')}</div>
			</div>
		</div>,
		size
	)
}
