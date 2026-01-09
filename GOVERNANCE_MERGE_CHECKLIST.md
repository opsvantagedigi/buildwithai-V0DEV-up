# Merge Checklist — Build With AI

Pre‑PR Checklist

Code Quality
- [ ] Code compiles: `pnpm run build`
- [ ] TypeScript passes: `pnpm exec tsc --noEmit`
- [ ] Tests pass: `pnpm test`
- [ ] Lint passes: `pnpm lint`
- [ ] No console logs left behind
- [ ] No commented‑out code

Dependencies
- [ ] `pnpm-lock.yaml` matches `package.json`
- [ ] No unexpected dependency changes

Security
- [ ] No secrets committed
- [ ] Env vars documented if new ones were added

Docs
- [ ] Docs updated (if applicable)
- [ ] Versioned docs updated (if Operator Payments)

PR Review Checklist
- [ ] PR title is clear and descriptive
- [ ] PR description explains the change
- [ ] Linked to issue or milestone
- [ ] All CI checks are green
- [ ] Vercel preview build succeeded
- [ ] Commits are signed
- [ ] No merge conflicts
- [ ] No unrelated changes included

Merge Checklist
- [ ] Reviewer approval obtained
- [ ] Branch is up‑to‑date with `main`
- [ ] Merge method respects branch protection
- [ ] Post‑merge: delete branch, confirm production deploy, tag release (if applicable)
