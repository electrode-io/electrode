#!/usr/bin/env node

/**
 * AUTOMATED STABLE RELEASE SCRIPT
 * 
 * This script automates the stable release process using Rush commands:
 * 1. Validates beta branch state
 * 2. Merges beta to master
 * 3. Runs rush version to bump versions
 * 4. Builds and tests everything  
 * 5. Publishes to npm with latest tag
 * 6. Syncs master back to develop
 * 7. Cleans up beta branch
 * 
 * Usage: rush release:stable
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ERROR: ${message}`, colors.red);
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function warning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function exec(command, options = {}) {
  try {
    log(`📦 Running: ${command}`, colors.cyan);
    return execSync(command, { 
      stdio: 'inherit', 
      cwd: process.cwd(),
      ...options 
    });
  } catch (err) {
    error(`Command failed: ${command}\n${err.message}`);
  }
}

function execSilent(command) {
  try {
    return execSync(command, { encoding: 'utf8', cwd: process.cwd() }).trim();
  } catch (err) {
    return null;
  }
}

function main() {
  log('🚀 Starting Automated Stable Release Process', colors.bright);
  log('===============================================', colors.bright);
  
  // 1. Validate environment
  info('Step 1: Validating environment...');
  
  // Check if we're in the right directory
  if (!fs.existsSync('rush.json')) {
    error('rush.json not found. Please run this from the repository root.');
  }
  
  // Check git status
  const gitStatus = execSilent('git status --porcelain');
  if (gitStatus) {
    error('Working directory is not clean. Please commit or stash your changes.');
  }
  
  // Check current branch - should be on a beta branch
  const currentBranch = execSilent('git branch --show-current');
  if (!currentBranch.startsWith('beta-')) {
    error(`Expected to be on a beta branch, but currently on '${currentBranch}'`);
  }
  
  success('Environment validation passed');
  
  // 2. Verify beta branch is up to date
  info('Step 2: Verifying beta branch state...');
  exec('git fetch origin');
  
  const localCommit = execSilent('git rev-parse HEAD');
  const remoteCommit = execSilent(`git rev-parse origin/${currentBranch}`);
  
  if (localCommit !== remoteCommit) {
    error('Local branch is not up to date with remote. Please pull latest changes.');
  }
  
  success('Beta branch is up to date');
  
  // 3. Switch to master and merge beta
  info('Step 3: Merging beta to master...');
  exec('git checkout master');
  exec('git pull origin master');
  exec(`git merge ${currentBranch} --no-ff -m "chore: merge ${currentBranch} for stable release"`);
  success('Beta branch merged to master');
  
  // 4. Generate change files if needed
  info('Step 4: Checking for change files...');
  const changeFiles = execSilent('find common/changes -name "*.json" 2>/dev/null | wc -l');
  if (parseInt(changeFiles) === 0) {
    warning('No change files found. Generating change files...');
    exec('rush change --target-branch master --bulk');
  }
  success('Change files ready');
  
  // 5. Bump versions
  info('Step 5: Bumping package versions...');
  exec('rush version --bump');
  success('Package versions bumped');
  
  // 6. Install dependencies
  info('Step 6: Installing dependencies...');
  exec('rush update');
  success('Dependencies updated');
  
  // 7. Build everything
  info('Step 7: Building all packages...');
  exec('rush rebuild --verbose');
  success('All packages built successfully');
  
  // 8. Run tests
  info('Step 8: Running tests...');
  exec('rush test --verbose');
  success('All tests passed');
  
  // 9. Run linting
  info('Step 9: Running linting...');
  exec('rush lint');
  success('Linting passed');
  
  // 10. Commit version changes
  info('Step 10: Committing version bump...');
  exec('git add .');
  exec('git commit -m "chore: bump versions for stable release"');
  success('Version changes committed');
  
  // 11. Publish to npm
  info('Step 11: Publishing stable packages to npm...');
  exec('rush publish --include-all --publish --apply');
  success('Stable packages published to npm');
  
  // 12. Create and push tags
  info('Step 12: Creating and pushing git tags...');
  const rushConfig = JSON.parse(fs.readFileSync('rush.json', 'utf8'));
  
  rushConfig.projects.forEach(project => {
    if (project.shouldPublish) {
      const packageJsonPath = path.join(project.projectFolder, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const tagName = `${packageJson.name}@${packageJson.version}`;
        exec(`git tag "${tagName}"`);
      }
    }
  });
  
  exec('git push origin --tags');
  success('Git tags created and pushed');
  
  // 13. Push master
  info('Step 13: Pushing master branch...');
  exec('git push origin master');
  success('Master branch pushed');
  
  // 14. Sync master back to develop
  info('Step 14: Syncing master back to develop...');
  exec('git checkout develop');
  exec('git pull origin develop');
  exec('git merge master --no-ff -m "chore: sync stable release back to develop"');
  exec('git push origin develop');
  success('Changes synced back to develop');
  
  // 15. Clean up beta branch
  info('Step 15: Cleaning up beta branch...');
  exec(`git branch -d ${currentBranch}`);
  exec(`git push origin --delete ${currentBranch}`);
  success('Beta branch cleaned up');
  
  // 16. Summary
  log('\n🎉 STABLE RELEASE COMPLETED SUCCESSFULLY! 🎉', colors.green + colors.bright);
  log('============================================', colors.green);
  log('\n📋 Summary:', colors.bright);
  log(`   • Beta branch ${currentBranch} merged and cleaned up`);
  log(`   • Packages published with latest tag`);
  log(`   • Master and develop branches synced`);
  
  log('\n📦 Users can now install:', colors.blue);
  log('   npm install @xarc/app');
  log('   npm install package-name@latest');
  
  log('\n🔄 Next Steps:', colors.yellow);
  log('   1. Monitor npm downloads and user feedback');
  log('   2. Continue development on develop branch');
  log('   3. For hotfixes: rush release:hotfix "description"');
}

if (require.main === module) {
  main();
}

module.exports = { main };
