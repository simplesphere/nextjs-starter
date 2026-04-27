'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@shared/ui/shadcn/dialog'
import { Input } from '@shared/ui/shadcn/input'
import { Label } from '@shared/ui/shadcn/label'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { type ReactNode, useMemo, useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import { type CreateWorkspaceFormData, createWorkspaceSchema } from '@/features/workspace-switcher/model/schema'
import { siteUrl } from '@/shared/config/site'
import { translateError } from '@/shared/lib/i18n'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/shadcn/button'

const MAX_AVATAR_BYTES = 1024 * 1024 * 2
const ACCEPTED_AVATAR_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp']

interface CreateWorkspaceDialogProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	trigger?: ReactNode
}

function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
}

function getSlugPrefix(): string {
	try {
		return new URL(siteUrl).host
	} catch {
		return siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
	}
}

export function CreateWorkspaceDialog({ open, onOpenChange, trigger }: CreateWorkspaceDialogProps) {
	const t = useTranslations('SIDEBAR.WORKSPACE_SWITCHER.DIALOG')

	const [avatar, setAvatar] = useState<string | null>(null)
	const [avatarError, setAvatarError] = useState<string | null>(null)
	const [slugTouched, setSlugTouched] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const slugPrefix = useMemo(() => getSlugPrefix(), [])

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<CreateWorkspaceFormData>({
		resolver: zodResolver(createWorkspaceSchema),
		defaultValues: { name: '', slug: '' }
	})

	const nameRegister = register('name', {
		onChange: event => {
			if (!slugTouched) setValue('slug', slugify(event.target.value), { shouldValidate: false })
		}
	})
	const slugRegister = register('slug', {
		onChange: () => setSlugTouched(true)
	})

	function handleAvatarPick(event: React.ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0]
		event.target.value = ''
		setAvatarError(null)
		if (!file) return
		if (!ACCEPTED_AVATAR_TYPES.includes(file.type)) {
			setAvatarError('AVATAR_INVALID_TYPE')
			return
		}
		if (file.size > MAX_AVATAR_BYTES) {
			setAvatarError('AVATAR_TOO_LARGE')
			return
		}
		const reader = new FileReader()
		reader.onload = () => {
			if (typeof reader.result === 'string') setAvatar(reader.result)
		}
		reader.readAsDataURL(file)
	}

	function resetForm() {
		reset({ name: '', slug: '' })
		setAvatar(null)
		setAvatarError(null)
		setSlugTouched(false)
	}

	function handleOpenChange(next: boolean) {
		onOpenChange(next)
		if (!next) resetForm()
	}

	const onSubmit = async () => {
		// TODO: replace with real workspace creation (server action that uploads
		// the avatar, persists the workspace, and redirects to its dashboard).
		await new Promise(resolve => setTimeout(resolve, 300))
		onOpenChange(false)
		resetForm()
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			{trigger}
			<DialogContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<DialogHeader className="items-center text-center sm:text-center">
						<DialogTitle className="text-lg font-semibold tracking-tight">{t('TITLE')}</DialogTitle>
						<DialogDescription className="text-balance">
							{t('DESCRIPTION')}{' '}
							<a
								href="#"
								className="font-medium text-muted-foreground underline underline-offset-2 hover:text-foreground"
							>
								{t('LEARN_MORE')}
							</a>
						</DialogDescription>
					</DialogHeader>

					<div className="space-y-2">
						<Label htmlFor="workspace-name" className="text-sm font-medium">
							{t('NAME_LABEL')}
						</Label>
						<Input
							id="workspace-name"
							placeholder={t('NAME_PLACEHOLDER')}
							autoComplete="off"
							aria-invalid={!!errors.name}
							className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
							{...nameRegister}
						/>
						{errors.name && (
							<p role="alert" className="text-sm text-destructive">
								{translateError(t, errors.name.message)}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="workspace-slug" className="text-sm font-medium">
							{t('SLUG_LABEL')}
						</Label>
						<div
							className={cn(
								'flex overflow-hidden rounded-md border border-input bg-transparent shadow-xs focus-within:ring-2 focus-within:ring-ring',
								errors.slug && 'border-destructive focus-within:ring-destructive'
							)}
						>
							<span className="flex shrink-0 items-center bg-muted px-3 text-sm text-muted-foreground select-none">
								{slugPrefix}
							</span>
							<Input
								id="workspace-slug"
								placeholder="acme-corp"
								autoComplete="off"
								aria-invalid={!!errors.slug}
								className="border-0 shadow-none focus-visible:ring-0"
								{...slugRegister}
							/>
						</div>
						{errors.slug ? (
							<p role="alert" className="text-sm text-destructive">
								{translateError(t, errors.slug.message)}
							</p>
						) : (
							<p className="text-xs text-muted-foreground">{t('SLUG_HINT')}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label className="text-sm font-medium">{t('LOGO_LABEL')}</Label>
						<div className="flex items-start gap-3">
							<button
								type="button"
								onClick={() => fileInputRef.current?.click()}
								aria-label={avatar ? t('AVATAR_CHANGE') : t('AVATAR_UPLOAD')}
								className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-dashed border-border bg-muted/40 text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
							>
								{avatar ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img src={avatar} alt="" className="size-full object-cover" />
								) : (
									<UploadCloud className="size-4" />
								)}
							</button>
							<div className="flex flex-col items-start gap-1">
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => fileInputRef.current?.click()}
									className="w-fit"
								>
									{avatar ? t('AVATAR_CHANGE') : t('AVATAR_UPLOAD')}
								</Button>
								{avatarError ? (
									<p role="alert" className="text-xs text-destructive">
										{translateError(t, avatarError)}
									</p>
								) : (
									<p className="text-xs text-muted-foreground">{t('AVATAR_HINT')}</p>
								)}
							</div>
						</div>
						<input
							ref={fileInputRef}
							type="file"
							accept={ACCEPTED_AVATAR_TYPES.join(',')}
							className="sr-only"
							onChange={handleAvatarPick}
						/>
					</div>

					<Button type="submit" disabled={isSubmitting} className="w-full">
						{isSubmitting ? t('SUBMIT_LOADING') : t('SUBMIT')}
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}
