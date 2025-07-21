#!/bin/bash
# scripts/publish-stable.sh
# Publishes a stable release from the master branch

set -e

echo "🚀 Publishing stable release..."

# Ensure we're on master
echo "📍 Ensuring we're on master branch..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "master" ]; then
  echo "⚠️  Switching to master branch..."
  git checkout master
fi

git pull origin master

# Validate before publishing
echo "🔍 Running final validation..."
rush rebuild --verbose
rush test --verbose

# Publish stable (uses 'latest' tag by default)
echo "📦 Publishing to npm with latest tag..."
rush publish --include-all --publish --apply

# Get list of published packages and their versions
echo "📋 Getting published package versions..."
PACKAGE_VERSIONS=$(node -e "
  const rushConfig = require('./rush.json');
  const publishedPackages = [];
  rushConfig.projects.forEach(project => {
    if (project.shouldPublish !== false) {
      try {
        const pkg = require('./' + project.projectFolder + '/package.json');
        publishedPackages.push({name: pkg.name, version: pkg.version});
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
  console.log(\`Stable Release \${timestamp}\`);
  console.log('');
  console.log('Published packages:');
  packages.forEach(pkg => {
    console.log(\`  • \${pkg.name}: \${pkg.version}\`);
  });
")

# Merge back to develop to keep it in sync
echo "🔀 Merging master back to develop..."
git checkout develop
git pull origin develop
git merge master --no-ff -m "merge: sync master stable release to develop"
git push origin develop

# Also merge to beta to keep it in sync
echo "🔀 Merging master back to beta..."
git checkout beta
git pull origin beta
git merge master --no-ff -m "merge: sync master stable release to beta"
git push origin beta

# Return to master
git checkout master

echo ""
echo "✅ Stable release published successfully!"
echo ""
echo "$RELEASE_SUMMARY"
echo ""
echo "📦 Install with:"
echo "   npm install @xarc/app"
echo ""
echo "🔗 View published packages:"
echo "   npm view @xarc/app versions --json"
echo ""
echo "🔄 Branches synced:"
echo "   - develop updated with stable release"
echo "   - beta updated with stable release"
