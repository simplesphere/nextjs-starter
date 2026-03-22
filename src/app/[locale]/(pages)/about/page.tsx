import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { GenerateMetadataProps } from '@/shared/types'
import { Heading } from '@/shared/ui'

const SECTION_KEYS = ['1', '2', '3'] as const

export async function generateMetadata(
	{ params }: GenerateMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale } = await params
	return createPageMetadata('METADATA.ABOUT', locale, parent)
}

export default async function AboutPage() {
	const t = await getTranslations('ABOUT')

	return (
		<div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
			<Link
				href="/"
				className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4" />
				{t('BACK')}
			</Link>

			<article className="space-y-4">
				<Heading as="h1" size="xl" className="tracking-tight">
					{t('TITLE')}
				</Heading>
				<p className="text-lg leading-7 text-muted-foreground">{t('SUBTITLE')}</p>
			</article>

			<div className="mt-10 space-y-10">
				{SECTION_KEYS.map(key => (
					<section key={key} className="space-y-4">
						<Heading as="h2" size="lg">
							{t(`SECTION_${key}_TITLE`)}
						</Heading>
						<p className="leading-7">{t(`SECTION_${key}_CONTENT`)}</p>
					</section>
				))}
			</div>
		</div>
	)
}
