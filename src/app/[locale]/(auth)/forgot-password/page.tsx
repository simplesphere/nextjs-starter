import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { ForgotPasswordForm } from '@/features/auth'
import { Link } from '@/shared/config/i18n'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { GenerateMetadataProps } from '@/shared/types'

export async function generateMetadata(
	{ params }: GenerateMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale } = await params
	return createPageMetadata('METADATA.FORGOT_PASSWORD', locale, parent, { path: '/forgot-password' })
}

/**
 * Forgot password page component.
 *
 * @returns The forgot password page
 */
export default async function ForgotPasswordPage() {
	const t = await getTranslations('AUTH.FORGOT_PASSWORD')

	return (
		<>
			<Link
				href="/login"
				className="inline-flex items-center gap-2 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
			>
				<ArrowLeft className="h-4 w-4" />
				{t('BACK')}
			</Link>

			<div className="flex justify-center">
				<ForgotPasswordForm />
			</div>
		</>
	)
}
