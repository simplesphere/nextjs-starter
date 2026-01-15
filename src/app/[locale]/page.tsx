import { getTranslations } from 'next-intl/server'
import { Stopwatch } from '@/features/home'
import { Link } from '@/shared/config/i18n'
import { Footer, Heading, ThemeToggle } from '@/shared/ui'
import { Navigation } from '@/widgets/navigation'

/**
 * Home page component.
 *
 * @returns The home page
 */
export default async function Home() {
	const t = await getTranslations('HOME')

	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
				<div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-4 py-4 sm:px-6 lg:px-8">
					<ThemeToggle />
					<Navigation />
				</div>
			</header>
			<main className="flex-1">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
					<div className="text-center">
						<Heading as="h1" size="xl" className="tracking-tight sm:text-6xl">
							{t('TITLE')}
						</Heading>
						<p className="mt-6 text-lg leading-8">{t('DESCRIPTION')}</p>
					</div>

					<div className="mt-16 flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-center">
						<div className="flex-1 space-y-6">
							<div className="space-y-4">
								<Heading as="h2" size="lg">
									{t('FEATURES_TITLE')}
								</Heading>
								<ul className="space-y-3">
									<li className="flex items-start gap-3">
										<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
										<span>{t('FEATURE_1')}</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
										<span>{t('FEATURE_2')}</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
										<span>{t('FEATURE_3')}</span>
									</li>
									<li className="flex items-start gap-3">
										<span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-foreground" />
										<span>{t('FEATURE_4')}</span>
									</li>
								</ul>
							</div>

							<div className="pt-6">
								<Link
									href="/about"
									className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
								>
									{t('LEARN_MORE')}
								</Link>
							</div>
						</div>

						<div className="flex-1">
							<Stopwatch />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	)
}
