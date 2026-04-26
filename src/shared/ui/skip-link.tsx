import { getTranslations } from 'next-intl/server'

/**
 * Visually-hidden anchor that becomes visible on focus. Lets keyboard users
 * jump past site chrome (header, nav) directly to the main content region.
 *
 * Pages must render a `<main id="content">` (or pass a custom `targetId`) for
 * this link to work.
 *
 * @param props - Optional config
 * @param props.targetId - The id of the element to jump to (default: `content`)
 * @returns The skip link
 */
export async function SkipLink({ targetId = 'content' }: { targetId?: string } = {}) {
	const t = await getTranslations('SKIP_LINK')

	return (
		<a
			href={`#${targetId}`}
			className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
		>
			{t('LABEL')}
		</a>
	)
}
