import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/**
 * Default favicon generated at build time. Replace with a real asset by
 * dropping a static `icon.png` (or .ico/.svg) in `src/app/` — Next.js will
 * prefer the static file over this generator.
 */
export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				fontSize: 22,
				background: '#000',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: '#fff',
				fontWeight: 700,
				letterSpacing: -1
			}}
		>
			N
		</div>,
		size
	)
}
