#!/bin/bash

# ============================================================================
# BETA RELEASE PREPARATION SCRIPT
# ============================================================================
# PURPOSE: Creates a beta release branch from develop and prepares it for PR
# 
# WHAT IT DOES:
# 1. Creates timestamped branch (release/beta-description-YYYYMMDD-HHMMSS)
# 2. Generates change files using Rush
# 3. Bumps package versions
# 4. Adds -beta.0 suffix to all package versions
# 5. Validates build and tests
# 6. Commits changes ready for PR to beta branch
#
# USAGE: ./scripts/prepare-beta-release.sh "feature-description"
# EXAMPLE: ./scripts/prepare-beta-release.sh "new-react-support"
#
# NEXT STEPS AFTER RUNNING:
# 1. Push the created branch
# 2. Create PR to beta branch
# 3. After PR merge, run: ./scripts/publish-beta.sh
# ============================================================================

set -e

DESCRIPTION=${1:-"beta-release"}
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "🚀 Preparing beta release: ${DESCRIPTION}"

# Ensure we're on develop
echo "📍 Switching to develop branch..."
git checkout develop
git pull origin develop

# Create release branch with timestamp
BRANCH_NAME="release/beta-${DESCRIPTION}-${TIMESTAMP}"
echo "🌿 Creating release branch: $BRANCH_NAME"
git checkout -b $BRANCH_NAME

# Generate change files
echo "📝 Generating change files..."
rush change --target-branch beta

# Version bump
echo "📈 Bumping versions..."
rush version --bump

# Apply beta suffix
echo "🏷️  Applying beta suffix..."
node scripts/apply-beta-suffix.js

# Validate build
echo "🔨 Building and testing..."
rush rebuild --verbose
rush test --verbose

# Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "chore: prepare beta release ${DESCRIPTION}-${TIMESTAMP}"

echo "✅ Beta release prepared!"
echo ""
echo "Next steps:"
echo "1. Push branch: git push origin $BRANCH_NAME"
echo "2. Create PR to beta branch"
echo "3. After merge, run: scripts/publish-beta.sh"
echo ""
echo "Branch: $BRANCH_NAME"
echo "Description: $DESCRIPTION"
echo "Target: beta"
