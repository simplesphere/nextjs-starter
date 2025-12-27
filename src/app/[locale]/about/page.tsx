import { getTranslations } from 'next-intl/server'
import { ArrowLeft } from 'lucide-react'
import { Link } from '@/shared/config/i18n'

/**
 * About page component with lorem ipsum content.
 *
 * @returns The about page
 */
export default async function About() {
	const t = await getTranslations('ABOUT')

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
						<p className="text-lg text-zinc-600 dark:text-zinc-400">{t('SUBTITLE')}</p>
					</header>

					<div className="prose prose-zinc dark:prose-invert max-w-none">
						<section className="space-y-4 text-zinc-700 dark:text-zinc-300">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
								dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
								ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
								fugiat nulla pariatur.
							</p>
							<p>
								Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
								laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
								laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae
								vitae dicta sunt explicabo.
							</p>
							<p>
								Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
								dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
								dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
								et dolore magnam aliquam quaerat voluptatem.
							</p>
						</section>

						<section className="mt-8 space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_TITLE')}</h2>
							<p className="text-zinc-700 dark:text-zinc-300">
								Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
								aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
								quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
							</p>
							<p className="text-zinc-700 dark:text-zinc-300">
								At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
								deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
								provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
							</p>
						</section>

						<section className="mt-8 space-y-4">
							<h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">{t('SECTION_TITLE_2')}</h2>
							<p className="text-zinc-700 dark:text-zinc-300">
								Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
								eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas
								assumenda est, omnis dolor repellendus.
							</p>
							<p className="text-zinc-700 dark:text-zinc-300">
								Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
								voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
								delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
								repellat.
							</p>
						</section>
					</div>
				</article>
			</div>
		</div>
	)
}
