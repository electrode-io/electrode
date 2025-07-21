#!/bin/bash
# scripts/increment-beta.sh
# Increments beta version for subsequent beta releases (beta.0 -> beta.1)

set -e

echo "🔢 Incrementing beta version..."

# Ensure we're on beta branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "beta" ]; then
  echo "⚠️  This script should be run from the beta branch"
  echo "Current branch: $CURRENT_BRANCH"
  echo "Switching to beta branch..."
  git checkout beta
  git pull origin beta
fi

# Run the increment beta script
node scripts/increment-beta.js

# Get summary of incremented packages
PACKAGE_SUMMARY=$(node -e "
  const rushConfig = require('./rush.json');
  const updatedPackages = [];
  rushConfig.projects.forEach(project => {
    if (project.shouldPublish !== false) {
      try {
        const pkg = require('./' + project.projectFolder + '/package.json');
        if (pkg.version.includes('-beta')) {
          updatedPackages.push({name: pkg.name, version: pkg.version});
        }
      } catch (e) {
        // Skip if package.json not found
      }
    }
  });
  
  console.log('Updated packages:');
  updatedPackages.forEach(pkg => {
    console.log(\`  • \${pkg.name}: \${pkg.version}\`);
  });
  
  return updatedPackages.length > 0 ? updatedPackages[0].version : 'beta';
")

echo "📈 Incremented packages:"
echo "$PACKAGE_SUMMARY"

# Validate build
echo "🔨 Building and testing..."
rush rebuild --verbose
rush test --verbose

# Commit the version increment
echo "💾 Committing version increment..."
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
git add .
git commit -m "chore: increment beta versions ${TIMESTAMP}"

echo ""
echo "✅ Beta versions incremented successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push changes: git push origin beta"
echo "2. Publish: scripts/publish-beta.sh"
echo ""
echo "Or run all at once:"
echo "  git push origin beta && scripts/publish-beta.sh"
