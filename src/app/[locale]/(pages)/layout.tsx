import type { ReactNode } from 'react'
import { Footer } from '@/shared/ui'

export default function PagesLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<main id="content" className="flex-1">
				{children}
			</main>
			<Footer />
		</div>
	)
}
