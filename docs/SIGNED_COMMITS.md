Signed Commits helper
======================

Purpose
-------
This document describes how to recreate a feature branch with GPG-signed commits so it satisfies repository branch-protection rules that require signed commits.

Prerequisites
-------------
- GPG (>=2.x) installed and a signing key configured.
- `git config --global user.signingkey <KEYID>` set, and `git config commit.gpgSign true` if desired.

Usage (automatic)
------------------
1. Ensure your local repo is up-to-date: `git fetch origin`
2. Run the helper script:

```bash
./scripts/recreate-signed-branch.sh deploy/add-vercel-domain main
```

This creates a new branch `deploy/add-vercel-domain-signed` based on `main`, cherry-picks each commit from the feature branch, signing the recreated commits with your GPG key, and pushes the new branch to origin.

Notes & caveats
---------------
- The helper requires that your GPG agent is available and unlocked when the script runs.
- If a cherry-pick conflicts, resolve the conflict, `git cherry-pick --continue`, and the script will proceed.
- After pushing the signed branch you can open a PR from the signed branch to `main` or replace the existing PR's head branch.
