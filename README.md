# Next.js 16 Starter

Production-ready Next.js starter with TypeScript, Tailwind CSS v4, and comprehensive tooling.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19
- **Language**: TypeScript 5 (strict mode + additional checks)
- **Styling**: Tailwind CSS v4 (CSS-based config)
- **Runtime**: Node.js >=22.14.0 (npm/yarn/pnpm/bun supported)
- **Linting**: ESLint 9 (flat config) + Prettier 3.7
- **Git Hooks**: Husky 9 + lint-staged + commitlint

## Quick Start

```bash
# Install dependencies (use your preferred package manager)
npm install
# or: yarn install / pnpm install / bun install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open http://localhost:3000

## Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run analyze      # Analyze bundle size (opens browser)
```

### Code Quality

```bash
npm run lint              # Run TypeScript + ESLint
npm run lint:fix          # Auto-fix ESLint errors
npm run type-check        # TypeScript type checking only
npm run prettier          # Format all files
npm run prettier:check    # Check formatting without fixing
npm run validate          # Run all checks (recommended before committing)
```

### Maintenance

```bash
npm run reset             # Remove .next and node_modules
npm run clean:macos       # Remove macOS files (._* and .DS_Store)
npm run git-clean         # Git clean build artifacts
```

## Project Structure

```
├── src/
│   └── app/                  # Next.js App Router
│       ├── globals.css       # Global styles + Tailwind config
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Home page
├── .husky/                   # Git hooks (pre-commit, commit-msg)
├── .vscode/                  # VSCode settings + recommended extensions
├── .editorconfig             # Editor consistency configuration
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore patterns
├── .nvmrc                    # Node.js version (22.14.0)
├── .prettierignore           # Prettier ignore patterns
├── commitlint.config.mjs     # Commit message rules
├── eslint.config.mjs        # ESLint configuration
├── lint-staged.config.mjs    # Staged files linting
├── next.config.ts            # Next.js configuration
├── postcss.config.mjs        # PostCSS configuration
├── prettier.config.mjs       # Code formatting rules
└── tsconfig.json             # TypeScript configuration
```

## Configuration

### TypeScript

Strict mode with additional safety checks:

- `noUncheckedIndexedAccess` - Safer array/object access
- `noImplicitOverride` - Explicit override keyword required
- `noFallthroughCasesInSwitch` - Prevent missing breaks
- `noUnusedLocals` - Flag unused variables
- `noUnusedParameters` - Flag unused function parameters

**Path Aliases** (configured in `tsconfig.json`):

- `@/*` → `./src/*`
- `@constants/*` → `./src/constants/*`
- `@components/*` → `./src/components/*`
- `@features/*` → `./src/features/*`
- `@lib/*` → `./src/lib/*`
- `@providers/*` → `./src/providers/*`
- `@types/*` → `./src/types/*`
- `@utils/*` → `./src/utils/*`

### ESLint

- Next.js recommended rules (core-web-vitals + TypeScript)
- Automatic unused imports removal
- Prettier integration
- Custom code quality rules (no-console, no-var, etc.)

### Prettier

- Automatic import sorting (`@trivago/prettier-plugin-sort-imports`)
- Tailwind class sorting (`prettier-plugin-tailwindcss`)
- Tabs for indentation, single quotes, no semicolons

### Git Hooks

- **pre-commit**: Runs lint-staged (formats + lints staged files only)
- **commit-msg**: Validates commit messages against conventional commits

## Commit Message Format

This project enforces [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope?): subject
```

**Valid types**: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`,
`security`

**Examples**:

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve navigation bug"
git commit -m "docs: update setup instructions"
git commit -m "refactor(auth): simplify token validation"
```

## VSCode Setup

Install recommended extensions (auto-suggested when opening the project):

- **Prettier** - Code formatting
- **ESLint** - Linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **EditorConfig** - Consistent coding styles
- **Error Lens** - Inline error highlighting
- **Pretty TypeScript Errors** - Better TS error messages
- **Bun for VSCode** - Bun support

Workspace configured for:

- Auto-format on save (Prettier)
- Auto-fix ESLint issues on save
- Tailwind CSS autocomplete

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Add your environment variables to `.env.local` (gitignored by default).

## Tailwind CSS v4

This project uses Tailwind CSS v4 which has a different configuration approach:

- No `tailwind.config.js` file
- Configuration done via CSS in `src/app/globals.css`
- Uses `@theme` directive for customization
- Faster build times and smaller bundle

Example customization in `globals.css`:

```css
@theme inline {
	--color-primary: #3b82f6;
	--font-sans: 'Inter', sans-serif;
}
```

## Bundle Analysis

Analyze your application's bundle size to identify optimization opportunities:

```bash
npm run analyze
```

This will:

1. Build your application for production
2. Generate interactive visualizations of your bundle
3. Automatically open two HTML reports in your browser:
   - Client bundle analysis
   - Server bundle analysis

**What to look for:**

- Large dependencies that could be replaced with lighter alternatives
- Code that could be lazy-loaded or code-split
- Duplicate dependencies in different parts of your bundle
- Unexpected imports bloating your bundle size

The analyzer is powered by `@next/bundle-analyzer` and only runs when explicitly invoked (won't affect normal builds).

## Additional Notes

- **Node.js version**: Use Node.js 22.14.0 (specified in `.nvmrc`). Use `nvm use` to switch versions automatically.
- **Package manager**: Supports npm, yarn, pnpm, or bun. No lock-in to a specific manager.
- **Image optimization**: `ignoreScripts` and `trustedDependencies` are configured for `sharp` and `unrs-resolver`
  (Next.js dependencies)
- **Pre-commit optimized**: Only staged files are checked (full validation via `npm run validate`)
- **PostCSS**: Configured with `@tailwindcss/postcss` for Tailwind CSS v4 processing

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Bun Documentation](https://bun.sh/docs)
