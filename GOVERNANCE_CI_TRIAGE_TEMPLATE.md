# CI Failure Triage Template

## PR / Branch
- **PR URL:**
- **Branch:**
- **Author:**
- **Date:**

---

## 1. Summary of Failure
- **Workflow name:**
- **Job name:**
- **Step failing:**
- **Error snippet (copy/paste):**
  ```text

  ```

## 2. Classification
- [ ] Build failure (Next.js / TS)
- [ ] TypeScript type error
- [ ] Test failure
- [ ] Lint failure
- [ ] Workflow/YAML error
- [ ] Env/config issue
- [ ] External service (Vercel, provider, etc.)
- [ ] Flaky / transient

## 3. Impact Assessment
Blocking merge? Yes / No

Affects production? Yes / No

Scope: (single app / multiple apps / workflows only)

## 4. Root Cause Hypothesis
Likely cause:

Files involved:

Recent changes touching this area:

## 5. Proposed Fix
Change type: (code / config / workflow / test)

Files to modify:

Risk level: Low / Medium / High

Requires migration? Yes / No

## 6. Implementation Plan

## 7. Validation Plan
Commands to run locally:

```bash
pnpm install --frozen-lockfile
pnpm exec tsc --noEmit
pnpm run build
pnpm test
pnpm lint
```

Additional checks:

- [ ] Vercel preview build

- [ ] Manual smoke test (if needed)

## 8. Outcome
Status: Fixed / Partially fixed / Not fixed

Follow-up issues created: (links)

Notes:
