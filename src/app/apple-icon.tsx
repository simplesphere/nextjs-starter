import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Apple touch icon for iOS add-to-homescreen. Replace by dropping a static
 * `apple-icon.png` in `src/app/` - Next.js prefers the static file.
 */
export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				fontSize: 120,
				background: '#000',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: '#fff',
				fontWeight: 800,
				letterSpacing: -4,
				borderRadius: 36
			}}
		>
			N
		</div>,
		size
	)
}
