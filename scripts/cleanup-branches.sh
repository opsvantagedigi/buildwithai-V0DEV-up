#!/bin/bash

# Cleanup script for Build With AI local branches
# Deletes all local branches that have already been merged into main

set -e

echo "Fetching latest remote branches..."
git fetch --all --prune

echo "Switching to main..."
git checkout main
git pull origin main

echo "Finding merged branches..."
merged=$(git branch --merged main | grep -v "main" | grep -v "\*")

if [ -z "$merged" ]; then
  echo "No merged branches to delete."
  exit 0
fi

echo "The following branches will be deleted:"
echo "$merged"
echo

read -p "Proceed with deletion? (y/N): " confirm
if [[ "$confirm" != "y" ]]; then
  echo "Aborted."
  exit 1
fi

echo "Deleting merged branches..."
echo "$merged" | xargs git branch -d

echo "Cleanup complete."
