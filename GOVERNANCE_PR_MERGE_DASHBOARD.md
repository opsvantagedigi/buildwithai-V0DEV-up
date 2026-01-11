# PR Merge Readiness Dashboard

Use this checklist for each PR before merging into `main`.

---

## 1. PR Metadata
- [ ] Clear title
- [ ] Descriptive summary
- [ ] Linked issue / milestone
- [ ] Labels applied (area, type, priority)

---

## 2. CI Status
- [ ] All GitHub Actions workflows green
- [ ] Vercel preview deployment succeeded
- [ ] No required checks skipped

---

## 3. Code Health
- [ ] `pnpm run build` passes
- [ ] `pnpm exec tsc --noEmit` passes
- [ ] `pnpm test` passes (or tests explicitly documented as pending)
- [ ] `pnpm lint` passes
- [ ] No console.log / debug code
- [ ] No commented-out blocks of dead code

---

## 4. Dependencies & Lockfile
- [ ] `pnpm-lock.yaml` matches `package.json`
- [ ] No unexpected dependency upgrades/downgrades
- [ ] New dependencies justified in PR description

---

## 5. Security & Secrets
- [ ] No secrets in code
- [ ] New env vars documented
- [ ] Sensitive config handled via Vercel / GitHub secrets

---

## 6. Docs & Governance
- [ ] Docs updated (if behavior changed)
- [ ] Versioned docs updated (if Operator/Payments changed)
- [ ] Runbooks updated (if operational behavior changed)
- [ ] RFC updated or referenced (if architectural)

---

## 7. Review & Approval
- [ ] At least one reviewer approved
- [ ] Comments addressed
- [ ] No unresolved conversations

---

## 8. Merge & Post-Merge
- [ ] Merge method respects branch protection
- [ ] Branch deleted after merge
- [ ] Production deploy confirmed
- [ ] Monitoring checked for regressions
