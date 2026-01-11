# Signed‑Commit Recovery Workflow

## Context
The repository may enforce:
- Signed commits
- Protected `main`
- PR-only merges

If a branch contains unsigned commits that block merge, use this workflow.

---

## 1. Check Commit Signatures
```bash
git log --show-signature <branch-name>
```
Identify unsigned commits that must be rewritten or replaced.

## 2. Option A — Interactive Rebase with Signing (preferred)
From the feature branch:

```bash
git checkout <branch-name>
git fetch origin
git rebase -i origin/main
```

In the interactive editor: mark commits as `edit` where you need to re-sign.

For each edit stop:

```bash
git commit --amend -S
git rebase --continue
```

When done:

```bash
git push --force-with-lease origin <branch-name>
```

## 3. Option B — Recreate a Signed Branch from main
If history is messy or many commits are unsigned:

```bash
git checkout main
git pull origin main

git checkout -b <branch-name-signed>
git cherry-pick <sha1> <sha2> <sha3> ...  # in order, with -S if possible
git push origin <branch-name-signed>
```

Open a PR from `<branch-name-signed>` to `main`.

## 4. Option C — Use GitHub’s “Rebase and Merge” (if allowed)
If branch commits are unsigned but the merge method produces a signed final commit and branch protection allows it, use “Rebase and Merge” or “Squash and Merge” with a signed final commit.

## 5. Safety Rules
- Never rewrite `main`
- Never force-push to `main`
- Only force-push feature branches you own
- Document any history rewrites in the PR

## 6. Checklist
- [ ] All required commits are signed
- [ ] Branch rebased on latest `main`
- [ ] CI green
- [ ] PR ready to merge
