#!/bin/bash
# scripts/create-hotfix.sh
# Creates a hotfix branch from master for emergency fixes

set -e

DESCRIPTION=$1
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

if [ -z "$DESCRIPTION" ]; then
  echo "Usage: $0 <description>"
  echo "Example: $0 'fix-critical-security-issue'"
  exit 1
fi

echo "🚨 Creating hotfix: ${DESCRIPTION}"

# Create hotfix branch from master
echo "📍 Switching to master branch..."
git checkout master
git pull origin master

BRANCH_NAME="hotfix/${DESCRIPTION}-${TIMESTAMP}"
echo "🌿 Creating hotfix branch: $BRANCH_NAME"
git checkout -b "$BRANCH_NAME"

echo ""
echo "✅ Hotfix branch created!"
echo ""
echo "📋 Next steps:"
echo "1. Make your fixes"
echo "2. Test thoroughly: rush rebuild --verbose && rush test --verbose"
echo "3. Generate change files: rush change --target-branch master"
echo "4. Commit your changes"
echo "5. Push branch: git push origin $BRANCH_NAME"
echo "6. Create PR to master"
echo "7. After merge, run: scripts/publish-stable.sh"
echo "8. Cherry-pick to beta if needed: git checkout beta && git cherry-pick <commit-hash>"
echo ""
echo "Branch: $BRANCH_NAME"
echo "Description: $DESCRIPTION"
echo "Target: master"
