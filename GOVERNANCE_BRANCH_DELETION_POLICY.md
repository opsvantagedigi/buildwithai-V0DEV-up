# Branch Deletion Policy

## Purpose
Keep the repository clean, reduce confusion, and avoid long-lived, stale branches.

---

## When to Delete a Branch
A branch SHOULD be deleted when:

- It has been merged into `main`
- CI is green on the merge commit
- Production deployment (if applicable) is successful

---

## When to Keep a Branch
A branch MAY be kept when:

- It is a release branch (e.g., `release/v1.0.0`)
- It is a hotfix branch awaiting deployment
- It is a long-running experiment explicitly documented

---

## What Deletion Means
- Deleting a branch does NOT delete its commits
- The merge commit and full history remain in `main`
- GitHub can restore deleted branches if needed

---

## Process
1. After PR merge:
   - Delete branch in GitHub UI
2. Locally:
```bash
git fetch --prune
git branch -d <branch-name>
```

Periodic cleanup:

```bash
./scripts/cleanup-branches.sh
```

## Prohibited Practices
- Keeping merged feature branches indefinitely
- Force-pushing to main
- Deleting branches that are not merged without explicit decision
