# Next.js 16 Starter

Production-ready Next.js starter with TypeScript, Tailwind CSS v4, and comprehensive tooling.

## Tech Stack

- **[Next.js 16](https://nextjs.org/docs)** (App Router) + [React 19](https://react.dev)
- **[TypeScript 5](https://www.typescriptlang.org/docs)** (strict mode)
- **[Tailwind CSS v4](https://tailwindcss.com/docs)**
- **[next-intl](https://next-intl-docs.vercel.app)** - Internationalization (i18n)
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode support
- **[ShadCN UI](https://ui.shadcn.com)** - UI component library
- **[React Hook Form](https://react-hook-form.com)** + **[Zod](https://zod.dev)** - Form validation
- **[Zustand](https://zustand-demo.pmnd.rs)** - State management
- **[Bun](https://bun.sh/docs)** (preferred) or Node.js >=22.14.0
- **[ESLint 9](https://eslint.org/docs/latest)** + [Prettier](https://prettier.io/docs)
- **[Vitest](https://vitest.dev)** + [Testing Library](https://testing-library.com/react)

## Quick Start

```bash
# Install dependencies
bun install  # or: npm install / yarn install

# Start development server
bun dev      # or: npm run dev / yarn dev
```

**Note**: If using Node.js directly, ensure you're using Node.js >=22.14.0 (see `.nvmrc` for version).

Open http://localhost:3000

## Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `bun dev`           | Start development server       |
| `bun build`         | Build for production           |
| `bun start`         | Start production server        |
| `bun lint`          | Run TypeScript + ESLint        |
| `bun lint:fix`      | Auto-fix ESLint errors         |
| `bun type-check`    | TypeScript type checking       |
| `bun prettier`      | Format all files               |
| `bun validate`      | Run all checks (before commit) |
| `bun test`          | Run tests (watch mode)         |
| `bun test:ui`       | Run tests with Vitest UI       |
| `bun test:coverage` | Generate coverage report       |
| `bun analyze`       | Analyze bundle size            |

## Project Structure

This project follows [Feature-Sliced Design (FSD)](https://feature-sliced.design/) architecture:

```
src/
├── app/              # Next.js App Router (pages & routes)
│   └── [locale]/     # Internationalized routes
│       ├── (auth)/    # Authentication pages
│       ├── (dashboard)/ # Dashboard pages
│       └── (privacy)/  # Privacy & Terms pages
├── entities/         # Business entities (FSD layer)
│   ├── user/         # User entity
│   └── account/      # Account entity
├── features/         # Feature modules (FSD layer)
│   ├── auth/         # Authentication features
│   ├── account-switcher/
│   ├── home/         # Home page features
│   └── user-menu/
├── widgets/          # Composite UI blocks (FSD layer)
│   ├── navigation/   # Navigation widget
│   └── sidebar/      # Sidebar widget
└── shared/           # Shared utilities (FSD layer)
    ├── ui/           # UI components (ShadCN)
    ├── constants/    # Constants
    ├── lib/          # Utilities
    ├── types/        # TypeScript types
    ├── config/       # Configuration (i18n, fonts)
    └── providers/    # React providers (theme, etc.)

messages/              # Translation files
├── en.json           # English translations
└── [locale].json     # Other locale files
```

### FSD Architecture Rules

- **Layer dependencies**: `app` → `widgets` → `features` → `entities` → `shared`
- **Import rules**: Use path aliases (`@shared/*`, `@features/*`, etc.), no relative imports
- **No cross-layer imports**: Lower layers cannot import from higher layers

## Path Aliases

Configured in `tsconfig.json`:

- `@/*` → `./src/*`
- `@entities/*` → `./src/entities/*`
- `@features/*` → `./src/features/*`
- `@widgets/*` → `./src/widgets/*`
- `@shared/*` → `./src/shared/*`
- `@assets/*` → `./src/shared/assets/*`
- `@config/*` → `./src/shared/config/*`
- `@constants/*` → `./src/shared/constants/*`
- `@components/*` → `./src/shared/ui/*`
- `@ui/*` → `./src/shared/ui/*`
- `@lib/*` → `./src/shared/lib/*`
- `@providers/*` → `./src/shared/providers/*`
- `@types/*` → `./src/shared/types/*`
- `@utils/*` → `./src/shared/lib/utils/*`

## Configuration

### ESLint

- Next.js recommended rules
- Automatic unused imports removal
- Prettier integration
- Custom quality rules

### Prettier

- Import sorting ([@trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports))
- Tailwind class sorting ([prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss))
- Tabs, single quotes, no semicolons

### Git Hooks

- **pre-commit**: Lint-staged (formats + lints staged files)
- **commit-msg**: [Conventional Commits](https://www.conventionalcommits.org/) validation

**Commit format**: `type(scope?): subject`  
**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`, `security`

## Testing

Uses [Vitest](https://vitest.dev) with [React Testing Library](https://testing-library.com/react).

```typescript
// Example test
import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

test('renders component', () => {
  render(<Component />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

**Note**: Vitest doesn't support async Server Components. Use E2E tests for those.

## Bundle Analysis

```bash
bun analyze
```

Opens interactive bundle visualizations powered by
[@next/bundle-analyzer](https://github.com/vercel/next.js/tree/canary/packages/next-bundle-analyzer).

## Docker

```bash
docker-compose up
```

Uses Bun for building in Docker, Node.js for runtime (Next.js standalone output requires Node.js). For local
development, Bun is preferred.

## Internationalization (i18n)

This project uses [next-intl](https://next-intl-docs.vercel.app) for internationalization.

### Adding Translations

1. Add translation keys to `messages/[locale].json`:

```json
{
	"MY_SECTION": {
		"TITLE": "My Title",
		"DESCRIPTION": "My description"
	}
}
```

2. Use translations in components:

```typescript
// Server Component
import { getTranslations } from 'next-intl/server'

const t = await getTranslations('MY_SECTION')
return <h1>{t('TITLE')}</h1>

// Client Component
import { useTranslations } from 'next-intl'

const t = useTranslations('MY_SECTION')
return <h1>{t('TITLE')}</h1>
```

3. Use translations in metadata:

```typescript
export async function generateMetadata({ params }: Props) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'METADATA.MY_PAGE' })

	return {
		title: t('TITLE'),
		description: t('DESCRIPTION')
	}
}
```

### Adding a New Locale

1. Add locale to `src/shared/constants/locales.ts`
2. Create `messages/[locale].json` with translations
3. The routing will automatically handle the new locale

## Metadata & SEO

All pages include:

- Translated page titles and descriptions
- Open Graph (OG) tags for social sharing
- Twitter Card tags
- Dynamic metadata generation

Metadata is configured in each page's `generateMetadata` function and uses translations from `messages/[locale].json`.

## Features

- ✅ **Authentication**: Login, forgot password, OTP verification, reset password
- ✅ **Dashboard**: Protected dashboard with sidebar navigation
- ✅ **Internationalization**: Multi-language support with next-intl
- ✅ **Dark Mode**: System-aware theme switching
- ✅ **Form Validation**: React Hook Form + Zod schemas
- ✅ **SEO**: Comprehensive metadata and OG tags
- ✅ **Error Handling**: Global and locale-specific error boundaries
- ✅ **Type Safety**: Strict TypeScript with no `any` types

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [ShadCN UI](https://ui.shadcn.com)
- [Bun Docs](https://bun.sh/docs)
- [Vitest Docs](https://vitest.dev/guide)
- [Testing Library](https://testing-library.com/react)
- [ESLint Docs](https://eslint.org/docs/latest)
- [Prettier Docs](https://prettier.io/docs)
