import { getTranslations } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/shared/config/i18n'

/**
 * Terms of service page component.
 *
 * @returns The terms of service page
 */
export default async function TermsPage() {
	const t = await getTranslations('TERMS')

	return (
		<div className="bg-zinc-50 dark:bg-black">
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
						<h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{t('TITLE')}</h1>
						<p className="text-lg text-zinc-600 dark:text-zinc-400">{t('INTRO')}</p>
					</header>

					<div className="prose prose-zinc dark:prose-invert max-w-none">
						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_1_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_1_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_2_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_2_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_3_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_3_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_4_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_4_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_5_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_5_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_6_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_6_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_7_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_7_CONTENT')}</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_8_TITLE')}</h2>
							<p className="text-zinc-600 dark:text-zinc-400">{t('SECTION_8_CONTENT')}</p>
						</section>
					</div>
				</article>
			</div>
		</div>
	)
}
