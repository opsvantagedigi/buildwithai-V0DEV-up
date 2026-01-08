#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <branch-to-sign> [base=main]"
  exit 1
fi

BRANCH="$1"
BASE="${2:-main}"
NEW_BRANCH="${BRANCH}-signed"

echo "Fetching latest..."
git fetch origin

echo "Creating new branch $NEW_BRANCH from origin/$BASE"
git checkout -b "$NEW_BRANCH" "origin/$BASE"

COMMITS=$(git rev-list --reverse "origin/$BASE..origin/$BRANCH")
if [ -z "$COMMITS" ]; then
  echo "No commits found between origin/$BASE and origin/$BRANCH"
  exit 0
fi

for c in $COMMITS; do
  echo "Cherry-picking and signing commit $c"
  # Cherry-pick and sign the new commit. This requires local GPG configured and available.
  git cherry-pick -x -S "$c"
done

echo "Pushing signed branch $NEW_BRANCH to origin"
git push -u origin "$NEW_BRANCH"

echo "Done. New signed branch: $NEW_BRANCH"
