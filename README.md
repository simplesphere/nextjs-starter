# Next.js 16 Starter

Production-ready Next.js starter with TypeScript, Tailwind CSS v4, and comprehensive tooling.

## Tech Stack

- **[Next.js 16](https://nextjs.org/docs)** (App Router) + [React 19](https://react.dev)
- **[TypeScript 5](https://www.typescriptlang.org/docs)** (strict mode)
- **[Tailwind CSS v4](https://tailwindcss.com/docs)**
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

```
src/
├── app/              # Next.js App Router
│   └── [locale]/     # Internationalized routes
├── shared/           # Shared layer (FSD)
│   ├── ui/           # Components
│   ├── constants/    # Constants
│   ├── lib/          # Utilities
│   ├── types/        # TypeScript types
│   └── config/       # Configuration
└── features/         # Feature modules (FSD)
```

## Path Aliases

Configured in `tsconfig.json`:

- `@/*` → `./src/*`
- `@shared/*` → `./src/shared/*`
- `@features/*` → `./src/features/*`
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

Uses npm in Docker (included with Node.js). For local development, Bun is preferred.

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Bun Docs](https://bun.sh/docs)
- [Vitest Docs](https://vitest.dev/guide)
- [Testing Library](https://testing-library.com/react)
- [ESLint Docs](https://eslint.org/docs/latest)
- [Prettier Docs](https://prettier.io/docs)
