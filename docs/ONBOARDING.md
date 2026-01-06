Build With AI — Onboarding Guide
================================

Overview
--------
Build With AI is an autonomous AI Website Builder and Operator automation platform. This guide helps new engineers set up the dev environment, run services, and get started.

Quick Links
-----------
- Repo root: `.`
- Apps: `apps/builder`, `apps/operator`
- Services: `services/payments-api`, `services/marz-orchestrator`
- Packages: `packages/db`, `packages/lib-auth`, `packages/lib-mail`

Prerequisites
-------------
- Node.js 20+
- pnpm v7+ (v10 recommended)
- PostgreSQL 15+ (Docker recommended)
- Redis (Docker)
- Docker & Docker Compose (Mailcow)
- Vercel CLI (optional)
- GitHub CLI (optional)

Quick start
-----------
1. Clone repo

   git clone git@github.com:opsvantagedigi/buildwithai-V0DEV-up.git
   cd buildwithai-V0DEV-up

2. Install

   pnpm install

3. Environment

- Copy `.env.example` → `.env.local` and fill required variables for Postgres, Redis, SMTP, Vercel.

4. Start local infra (example)

   docker-compose -f infra/docker-compose.mailcow.yml up -d

5. Run apps in dev

   pnpm -w dev

Database
--------
- Migrations live in `packages/db/migrations` (SQL or Prisma based). See `packages/db/README.md` for commands.

Coding standards
----------------
- TypeScript only
- ESLint + Prettier enforced in CI
- Use migrations for schema changes

Branching & PRs
---------------
- `main` is protected; open PRs from feature branches
- Require tests and 2 reviewers for production changes

Where to find docs
------------------
- RFCs: `docs/RFC.md`
- Roadmap: `docs/ROADMAP.md`
- Milestones: `docs/MILESTONES.md`
