# Post‑Merge Cleanup Plan

Applies after merging a feature branch into `main`.

---

## 1. Verify Merge
- [ ] Confirm PR is merged into `main`
- [ ] Confirm `main` is up-to-date locally:

```bash
git checkout main
git pull origin main
```

## 2. Verify Production Deployment
- [ ] Vercel production deployment succeeded

- [ ] Key flows smoke-tested:

- [ ] AI Website Builder homepage loads

- [ ] Identity flow (email verification) works

- [ ] Payments test path (if applicable) works

- [ ] Operator dashboard loads

## 3. Delete Feature Branches
- [ ] Delete remote branch in GitHub UI

- [ ] Delete local branch:

```bash
git branch -d <branch-name>
```

## 4. Clean Local Environment
- [ ] Remove stale branches:

```bash
git fetch --prune
```

- [ ] Optionally run cleanup script:

```bash
./scripts/cleanup-branches.sh
```

## 5. Update Tracking Artifacts
- [ ] Close related GitHub issues
- [ ] Move cards to “Done” on project board
- [ ] Update milestone status

## 6. Retrospective (optional but recommended)
- [ ] What went well?
- [ ] What was painful?
- [ ] What should we automate next?
