# Branch Lifecycle Policy — Build With AI

Purpose
To ensure Build With AI maintains a clean, deterministic, production‑safe Git history with minimal branch drift and zero accidental overwrites.

Branch Types

1. `main` (protected)
   - Single source of truth.
   - Always deployable.
   - Only updated via PR merges.
   - Requires: Passing CI, signed commits, no merge conflicts, successful Vercel preview build, at least one reviewer.

2. Feature Branches
   - Short‑lived branches for a single task.
   - Naming convention: `feature/<name>`, `fix/<name>`, `chore/<name>`, `docs/<name>`.
   - Must be deleted after merge.

3. Long‑Lived Branches (rare)
   - Only for major multi‑week features, release branches, or isolated hotfixes.
   - Naming: `release/<version>`, `hotfix/<issue>`.

Branch Lifecycle

1. Create
   - `git checkout -b feature/<name>`

2. Develop
   - Commit frequently, keep changes small and signed.
   - Rebase onto `main` regularly to avoid drift.

3. Validate (before opening PR)
   - `pnpm install --frozen-lockfile`
   - `pnpm run build`
   - `pnpm exec tsc --noEmit`
   - `pnpm test`
   - `pnpm lint`

4. PR → Review → Merge
   - PR must be CI‑green, signed, and reviewed.
   - Merge using Squash & Merge or Rebase & Merge.
   - Never force‑push to `main`.

5. Delete Branch
   - Delete the branch on GitHub and locally after merge.
