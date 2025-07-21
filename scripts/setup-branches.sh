#!/bin/bash
# scripts/setup-branches.sh
# Sets up the branch structure for beta release workflow

set -e

echo "🚀 Setting up branch structure for beta release workflow..."

# Ensure we're on master
git checkout master
git pull origin master

# Create develop branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/develop; then
  echo "🌿 Creating develop branch..."
  git checkout -b develop
  git push -u origin develop
else
  echo "✅ Develop branch already exists"
fi

# Create beta branch if it doesn't exist
if ! git show-ref --verify --quiet refs/heads/beta; then
  echo "🌿 Creating beta branch..."
  git checkout -b beta
  git push -u origin beta
else
  echo "✅ Beta branch already exists"
fi

# Return to master
git checkout master

echo ""
echo "✅ Branch structure setup complete!"
echo ""
echo "📋 Branches created:"
echo "  - master (stable releases)"
echo "  - develop (development integration)"
echo "  - beta (beta releases)"
echo ""
echo "🔄 Workflow:"
echo "  feature/* → develop → beta → master"
echo "  hotfix/* → master"
echo ""
echo "📖 Next steps:"
echo "  1. Set up branch protection rules in GitHub"
echo "  2. Update team permissions"
echo "  3. Start using: scripts/prepare-beta-release.sh <version>"
