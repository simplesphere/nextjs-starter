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
- **[Bun](https://bun.sh/docs)** - Package manager and runtime
- **[ESLint 9](https://eslint.org/docs/latest)** + [Prettier](https://prettier.io/docs)
- **[Vitest](https://vitest.dev)** + [Testing Library](https://testing-library.com/react)

## Quick Start

```bash
bun install
bun dev
```

Open http://localhost:3000

> **Node.js fallback**: If not using Bun, ensure Node.js >=22.14.0 (see `.nvmrc`). All scripts work with `node` but Bun
> is the project standard.

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
│       ├── (auth)/          # Authentication pages (dummy)
│       ├── (dashboard)/     # Workspace-based dashboard
│       │   └── dashboard/
│       │       └── [workspace]/  # Dynamic workspace routes
│       └── (privacy)/       # Privacy & Terms pages
├── entities/         # Business entities (FSD layer)
│   ├── user/         # User entity
│   └── workspace/    # Workspace entity (name, slug, plan)
├── features/         # Feature modules (FSD layer)
│   ├── auth/         # Authentication features (dummy)
│   ├── workspace-switcher/  # Workspace navigation
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
└── en.json           # English translations
```

### FSD Architecture Rules

- **Layer dependencies**: `app` → `widgets` → `features` → `entities` → `shared`
- **Import rules**: Use `@/` for all FSD layers, `@shared/` for shadcn component imports. No relative imports.
- **No cross-layer imports**: Lower layers cannot import from higher layers

## Path Aliases

Configured in `tsconfig.json`:

- `@/*` → `./src/*` (canonical alias for all FSD layers)
- `@shared/*` → `./src/shared/*` (used by ShadCN codegen)

## Workspace-based Dashboard

The dashboard routes are workspace-scoped:

- `/[workspace]/dashboard` → workspace overview (e.g. `/acme-corp/dashboard`)
- `/[workspace]/analytics` → workspace analytics (e.g. `/acme-corp/analytics`)

The workspace switcher in the sidebar navigates between workspaces via URL. Workspace data is resolved server-side from
route params — no client-side context needed.

## Authentication (Dummy)

Auth pages (login, forgot password, OTP, reset password) are included as UI scaffolding with form validation. **There is
no real authentication backend.** Routes are not protected.

When replacing with real auth:

- Add session/cookie validation in `proxy.ts` or workspace layout
- Protect dashboard routes server-side, not just via client redirect
- Consider an IdP integration (e.g. Auth.js, Clerk, Supabase Auth)

## Proxy (Next.js 16)

Next.js 16 uses `proxy.ts` (not `middleware.ts`) for request interception. This is where i18n routing and security
headers (CSP, HSTS, etc.) are configured. Do not rename to `middleware.ts`.

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

**Commit format**: `type(scope?): subject` **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`,
`perf`, `ci`, `build`, `revert`, `security`

## Testing

Uses [Vitest](https://vitest.dev) with [React Testing Library](https://testing-library.com/react).

```typescript
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

Uses Bun for building, Node.js for runtime (Next.js standalone output requires Node.js).

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

### Adding a New Locale

1. Add locale to `src/shared/constants/locales.ts`
2. Create `messages/[locale].json` with translations
3. The routing will automatically handle the new locale

## Features

- **Authentication**: Login, forgot password, OTP verification, reset password (dummy — no backend)
- **Dashboard**: Workspace-scoped dashboard with sidebar navigation and workspace switcher
- **Internationalization**: Multi-language support with next-intl
- **Dark Mode**: System-aware theme switching
- **Form Validation**: React Hook Form + Zod schemas
- **SEO**: Comprehensive metadata and OG tags
- **Error Handling**: Global and locale-specific error boundaries
- **Type Safety**: Strict TypeScript with no `any` types
- **Security Headers**: CSP with nonces, HSTS, X-Frame-Options via proxy.ts

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
