#!/bin/bash

# ============================================================================
# BETA PUBLISHING SCRIPT
# ============================================================================
# PURPOSE: Publishes beta packages to npm with beta tag
# 
# WHAT IT DOES:
# 1. Ensures you're on the beta branch
# 2. Cleans local git tags to avoid conflicts
# 3. Uses Rush to publish all changed packages with @beta tag
# 4. Creates per-package git tags (e.g., @xarc/app@12.1.0-beta.1)
# 5. Pushes all tags to origin
# 6. Shows installation examples
#
# USAGE: ./scripts/publish-beta.sh
# 
# PREREQUISITES: 
# - Must be run after beta release PR is merged to beta branch
# - npm authentication must be configured
# - Must have publishing rights to all packages
#
# WHAT USERS CAN DO AFTER:
# - npm install @xarc/app@beta
# - npm install package-name@beta
# ============================================================================

set -e

echo "🚀 Publishing beta release..."

# Ensure we're on beta branch
echo "📍 Ensuring we're on beta branch..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "beta" ]; then
  echo "⚠️  Switching to beta branch..."
  git checkout beta
fi

git pull origin beta

# Clean local tags to avoid conflicts
echo "🧹 Cleaning local tags..."
git tag -d $(git tag) 2>/dev/null || true

# Validate before publishing
echo "🔍 Running final validation..."
rush rebuild --verbose
rush test --verbose

# Publish beta
echo "📦 Publishing to npm with beta tag..."
rush publish --include-all --publish --apply --tag beta

# Get list of published packages and their versions
echo "📋 Getting published package versions..."
PACKAGE_VERSIONS=$(node -e "
  const rushConfig = require('./rush.json');
  const publishedPackages = [];
  rushConfig.projects.forEach(project => {
    if (project.shouldPublish !== false) {
      try {
        const pkg = require('./' + project.projectFolder + '/package.json');
        if (pkg.version.includes('-beta')) {
          publishedPackages.push({name: pkg.name, version: pkg.version});
        }
      } catch (e) {
        // Skip if package.json not found
      }
    }
  });
  console.log(JSON.stringify(publishedPackages, null, 2));
")

# Create tags for each published package
echo "🏷️  Creating git tags for published packages..."
echo "$PACKAGE_VERSIONS" | node -e "
  const packages = JSON.parse(require('fs').readFileSync(0, 'utf8'));
  const { execSync } = require('child_process');
  
  packages.forEach(pkg => {
    const tagName = \`\${pkg.name}@\${pkg.version}\`;
    try {
      execSync(\`git tag \\\"\${tagName}\\\"\`, { stdio: 'inherit' });
      console.log(\`✅ Tagged: \${tagName}\`);
    } catch (error) {
      console.log(\`⚠️  Tag already exists: \${tagName}\`);
    }
  });
"

# Push all tags
git push origin --tags

# Get release summary
RELEASE_SUMMARY=$(echo "$PACKAGE_VERSIONS" | node -e "
  const packages = JSON.parse(require('fs').readFileSync(0, 'utf8'));
  const timestamp = new Date().toISOString().slice(0, 19);
  console.log(\`Beta Release \${timestamp}\`);
  console.log('');
  console.log('Published packages:');
  packages.forEach(pkg => {
    console.log(\`  • \${pkg.name}: \${pkg.version}\`);
  });
")

echo ""
echo "✅ Beta release published successfully!"
echo ""
echo "$RELEASE_SUMMARY"
echo ""
echo "📦 Install with:"
echo "   npm install @xarc/app@beta"
echo ""
echo "🔗 View published packages:"
echo "   npm view @xarc/app versions --json | grep beta"
