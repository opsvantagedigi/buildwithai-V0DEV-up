# Build With AI Monorepo

Marketing site and operator dashboard now live in a single pnpm workspace.

## Monorepo layout
- apps/marketing → public marketing site (Next.js, Tailwind), deployed to **buildwithai.digital**
- apps/operator → internal operator dashboard (Next.js), deployed to **operator.buildwithai.digital**
- pnpm-workspace.yaml → workspace package map
- vercel.json → Vercel multi-project config with rootDirectory mappings

## Local development
- Install dependencies at the repo root: `pnpm install`
- Run marketing app (dev): `pnpm dev:marketing`
- Run operator app (dev): `pnpm dev:operator`
- Build marketing app: `pnpm build:marketing`
- Build operator app: `pnpm build:operator`
- Build both apps: `pnpm build`

## Deployment & domains
- Vercel projects
	- Marketing project → `apps/marketing` (rootDirectory) → domain **buildwithai.digital**
	- Operator project → `apps/operator` (rootDirectory) → domain **operator.buildwithai.digital**
- Ensure required environment variables are configured separately for each project in Vercel.

## Notes
- Tailwind/PostCSS/Next configs for marketing live in `apps/marketing`.
- Root `tsconfig.json` uses project references to `apps/marketing` and `apps/operator`; each app also has its own tsconfig.
