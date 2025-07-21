#!/usr/bin/env node

/**
 * AUTOMATED HOTFIX RELEASE SCRIPT
 * 
 * This script automates the hotfix release process using Rush commands:
 * 1. Creates hotfix branch from master
 * 2. Guides developer through making fixes
 * 3. Builds and tests everything
 * 4. Publishes hotfix release
 * 5. Merges back to master and develop
 * 
 * Usage: rush release:hotfix "description"
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  const description = process.argv[2];
  
  if (!description) {
    error('Hotfix description is required. Usage: rush release:hotfix "description"');
  }
  
  log('🚀 Starting Automated Hotfix Release Process', colors.bright);
  log('==============================================', colors.bright);
  
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
  
  success('Environment validation passed');
  
  // 2. Create hotfix branch from master
  info('Step 2: Creating hotfix branch from master...');
  exec('git checkout master');
  exec('git pull origin master');
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const hotfixBranch = `hotfix-${timestamp}`;
  
  exec(`git checkout -b ${hotfixBranch}`);
  success(`Created and switched to branch: ${hotfixBranch}`);
  
  // 3. Guide developer through making fixes
  log('\n🛠️  MANUAL INTERVENTION REQUIRED', colors.yellow + colors.bright);
  log('================================', colors.yellow);
  log('Please make your hotfix changes now:', colors.bright);
  log('1. Edit the necessary files to fix the issue');
  log('2. Test your changes locally');
  log('3. Come back here when ready');
  
  await prompt('\nPress Enter when you have completed your hotfix changes...');
  
  // 4. Validate changes were made
  info('Step 3: Validating changes...');
  const changesAfterFix = execSilent('git status --porcelain');
  if (!changesAfterFix) {
    error('No changes detected. Please make your hotfix changes before continuing.');
  }
  success('Changes detected');
  
  // 5. Install dependencies
  info('Step 4: Installing dependencies...');
  exec('rush update');
  success('Dependencies updated');
  
  // 6. Build everything
  info('Step 5: Building all packages...');
  exec('rush rebuild --verbose');
  success('All packages built successfully');
  
  // 7. Run tests
  info('Step 6: Running tests...');
  exec('rush test --verbose');
  success('All tests passed');
  
  // 8. Run linting
  info('Step 7: Running linting...');
  exec('rush lint');
  success('Linting passed');
  
  // 9. Generate change files
  info('Step 8: Generating change files...');
  exec('rush change --target-branch master');
  success('Change files generated');
  
  // 10. Bump versions
  info('Step 9: Bumping package versions...');
  exec('rush version --bump');
  success('Package versions bumped');
  
  // 11. Commit changes
  info('Step 10: Committing hotfix changes...');
  exec('git add .');
  exec(`git commit -m "hotfix: ${description}"`);
  success('Changes committed');
  
  // 12. Push hotfix branch
  info('Step 11: Pushing hotfix branch...');
  exec(`git push origin ${hotfixBranch}`);
  success(`Hotfix branch pushed to origin: ${hotfixBranch}`);
  
  // 13. Publish to npm
  info('Step 12: Publishing hotfix packages to npm...');
  exec('rush publish --include-all --publish --apply');
  success('Hotfix packages published to npm');
  
  // 14. Create and push tags
  info('Step 13: Creating and pushing git tags...');
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
  
  // 15. Merge back to master
  info('Step 14: Merging hotfix back to master...');
  exec('git checkout master');
  exec(`git merge ${hotfixBranch} --no-ff -m "hotfix: merge ${description}"`);
  exec('git push origin master');
  success('Hotfix merged to master');
  
  // 16. Merge to develop
  info('Step 15: Merging hotfix to develop...');
  exec('git checkout develop');
  exec('git pull origin develop');
  exec(`git merge ${hotfixBranch} --no-ff -m "hotfix: merge ${description} to develop"`);
  exec('git push origin develop');
  success('Hotfix merged to develop');
  
  // 17. Clean up hotfix branch
  info('Step 16: Cleaning up hotfix branch...');
  exec(`git branch -d ${hotfixBranch}`);
  exec(`git push origin --delete ${hotfixBranch}`);
  success('Hotfix branch cleaned up');
  
  // 18. Summary
  log('\n🎉 HOTFIX RELEASE COMPLETED SUCCESSFULLY! 🎉', colors.green + colors.bright);
  log('===========================================', colors.green);
  log('\n📋 Summary:', colors.bright);
  log(`   • Hotfix: ${description}`);
  log(`   • Branch: ${hotfixBranch} (merged and cleaned up)`);
  log(`   • Packages published with latest tag`);
  log(`   • Master and develop branches updated`);
  
  log('\n📦 Users can now install:', colors.blue);
  log('   npm install @xarc/app@latest');
  log('   npm install package-name@latest');
  
  log('\n🔄 Next Steps:', colors.yellow);
  log('   1. Monitor for any issues with the hotfix');
  log('   2. Continue development on develop branch');
  log('   3. Consider if additional fixes are needed');
}

if (require.main === module) {
  main().catch(error);
}

module.exports = { main };
