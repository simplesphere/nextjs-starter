import { redirect } from 'next/navigation'
import { DEFAULT_LOCALE } from '@/shared/constants/locales'

export default function GlobalNotFound() {
	redirect(`/${DEFAULT_LOCALE}`)
}
