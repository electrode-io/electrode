#!/bin/bash

# ============================================================================
# BETA TO STABLE PROMOTION SCRIPT
# ============================================================================
# PURPOSE: Promotes beta releases to stable by merging beta into master
# 
# WHAT IT DOES:
# 1. Creates timestamped stable release branch from master
# 2. Merges beta branch into the release branch
# 3. Removes -beta suffixes from all package versions
# 4. Runs final version bump using Rush
# 5. Validates build and tests
# 6. Commits changes ready for PR to master
#
# USAGE: ./scripts/promote-beta-to-stable.sh
# 
# NEXT STEPS AFTER RUNNING:
# 1. Push the created release branch
# 2. Create PR to master branch
# 3. After PR merge, run: ./scripts/publish-stable.sh
#
# THIS CREATES: release/stable-YYYYMMDD-HHMMSS branch
# ============================================================================

set -e

DESCRIPTION=${1:-"stable-release"}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "🚀 Promoting beta to stable release: ${DESCRIPTION}"

# Ensure we're on master
echo "📍 Switching to master branch..."
git checkout master
git pull origin master

# Create release branch with timestamp
BRANCH_NAME="release/stable-${DESCRIPTION}-${TIMESTAMP}"
echo "🌿 Creating release branch: $BRANCH_NAME"
git checkout -b $BRANCH_NAME

# Merge beta branch
echo "🔀 Merging beta branch..."
git merge beta --no-ff -m "merge: promote beta to stable ${DESCRIPTION}-${TIMESTAMP}"

# Remove beta suffixes
echo "🏷️  Removing beta suffixes..."
node scripts/remove-beta-suffix.js

# Version bump for stable (this should just remove the -beta suffix mostly)
echo "📈 Final version bump..."
rush version --bump

# Validate build
echo "🔨 Building and testing..."
rush rebuild --verbose
rush test --verbose

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "chore: prepare stable release ${DESCRIPTION}-${TIMESTAMP}"

echo "✅ Stable release prepared!"
echo ""
echo "Next steps:"
echo "1. Push branch: git push origin $BRANCH_NAME"
echo "2. Create PR to master branch"
echo "3. After merge, run: scripts/publish-stable.sh"
echo ""
echo "Branch: $BRANCH_NAME"
echo "Description: $DESCRIPTION"
echo "Target: master"
