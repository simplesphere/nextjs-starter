import { redirect } from 'next/navigation'
import { DEFAULT_WORKSPACE_SLUG } from '@/entities/workspace'

export default function DashboardIndexPage() {
	redirect(`/dashboard/${DEFAULT_WORKSPACE_SLUG}`)
}
