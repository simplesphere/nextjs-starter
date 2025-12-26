import { googleSans } from '@/shared/config/fonts'
import type { RootLayoutProps } from '@/shared/types'
import '@/app/globals.css'

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={googleSans.variable}>
			<body className="antialiased">{children}</body>
		</html>
	)
}
