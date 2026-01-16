import { getTranslations } from 'next-intl/server'
import type { Metadata, ResolvingMetadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/shared/config/i18n'
import { createPageMetadata } from '@/shared/lib/metadata'
import type { GenerateMetadataProps } from '@/shared/types'
import { Heading } from '@/shared/ui'

export async function generateMetadata(
	{ params }: GenerateMetadataProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { locale } = await params
	return createPageMetadata('METADATA.PRIVACY', locale, parent)
}

/**
 * Privacy policy page component.
 *
 * @returns The privacy policy page
 */
export default async function PrivacyPage() {
	const t = await getTranslations('PRIVACY')

	return (
		<div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
			<Link
				href="/"
				className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
			>
				<ArrowLeft className="h-4 w-4" />
				{t('BACK')}
			</Link>

			<article className="space-y-8">
				<header className="space-y-4">
					<Heading as="h1" size="xl" className="tracking-tight">
						{t('TITLE')}
					</Heading>
					<p className="text-lg">{t('INTRO')}</p>
				</header>

				<div className="prose prose-zinc dark:prose-invert max-w-none">
					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_1_TITLE')}
						</Heading>
						<p>{t('SECTION_1_CONTENT')}</p>
					</section>

					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_2_TITLE')}
						</Heading>
						<p>{t('SECTION_2_CONTENT')}</p>
					</section>

					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_3_TITLE')}
						</Heading>
						<p>{t('SECTION_3_CONTENT')}</p>
					</section>

					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_4_TITLE')}
						</Heading>
						<p>{t('SECTION_4_CONTENT')}</p>
					</section>

					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_5_TITLE')}
						</Heading>
						<p>{t('SECTION_5_CONTENT')}</p>
					</section>

					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_6_TITLE')}
						</Heading>
						<p>{t('SECTION_6_CONTENT')}</p>
					</section>

					<section className="space-y-4">
						<Heading as="h2" size="lg">
							{t('SECTION_7_TITLE')}
						</Heading>
						<p>{t('SECTION_7_CONTENT')}</p>
					</section>
				</div>
			</article>
		</div>
	)
}
