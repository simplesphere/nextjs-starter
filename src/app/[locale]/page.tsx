import { getTranslations } from 'next-intl/server'
import { Stopwatch } from '@/features/home'
import { Link } from '@/shared/config/i18n'

/**
 * Home page component.
 *
 * @returns The home page
 */
export default async function Home() {
	const t = await getTranslations('HOME')

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-black">
			<main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-zinc-50">
						{t('TITLE')}
					</h1>
					<p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">{t('DESCRIPTION')}</p>
				</div>

				<div className="mt-16 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center">
					<div className="flex-1 space-y-6">
						<div className="space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('FEATURES_TITLE')}</h2>
							<ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
								<li className="flex items-start gap-3">
									<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50" />
									<span>{t('FEATURE_1')}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50" />
									<span>{t('FEATURE_2')}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50" />
									<span>{t('FEATURE_3')}</span>
								</li>
								<li className="flex items-start gap-3">
									<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-50" />
									<span>{t('FEATURE_4')}</span>
								</li>
							</ul>
						</div>

						<div className="pt-6">
							<Link
								href="/about"
								className="inline-flex items-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
							>
								{t('LEARN_MORE')}
							</Link>
						</div>
					</div>

					<div className="flex-1">
						<Stopwatch />
					</div>
				</div>
			</main>
		</div>
	)
}
