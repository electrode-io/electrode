#!/usr/bin/env node

/**
 * AUTOMATED BETA RELEASE SCRIPT
 * 
 * This script automates the beta release process using Rush commands:
 * 1. Validates current branch and git status
 * 2. Creates timestamped beta branch
 * 3. Applies beta suffix to all packages
 * 4. Builds and tests everything
 * 5. Publishes to npm with @beta tag
 * 6. Creates and pushes git tags
 * 
 * Usage: rush release:beta [description]
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
  const description = process.argv[2] || 'automated-beta-release';
  
  log('🚀 Starting Automated Beta Release Process', colors.bright);
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
  
  // Check current branch
  const currentBranch = execSilent('git branch --show-current');
  if (currentBranch !== 'develop') {
    warning(`Current branch is '${currentBranch}', expected 'develop'. Continuing anyway...`);
  }
  
  success('Environment validation passed');
  
  // 2. Create beta branch
  info('Step 2: Creating beta branch...');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const betaBranch = `beta-${timestamp}`;
  
  exec(`git checkout -b ${betaBranch}`);
  success(`Created and switched to branch: ${betaBranch}`);
  
  // 3. Apply beta suffix
  info('Step 3: Applying beta suffix to packages...');
  exec('node scripts/apply-beta-suffix.js');
  success('Beta suffix applied to all packages');
  
  // 4. Install dependencies
  info('Step 4: Installing dependencies...');
  exec('rush update');
  success('Dependencies updated');
  
  // 5. Build everything
  info('Step 5: Building all packages...');
  exec('rush rebuild --verbose');
  success('All packages built successfully');
  
  // 6. Run tests
  info('Step 6: Running tests...');
  exec('rush test --verbose');
  success('All tests passed');
  
  // 7. Run linting
  info('Step 7: Running linting...');
  exec('rush lint');
  success('Linting passed');
  
  // 8. Commit changes
  info('Step 8: Committing beta version changes...');
  exec('git add .');
  exec(`git commit -m "chore: prepare beta release - ${description}"`);
  success('Changes committed');
  
  // 9. Push beta branch (this triggers CI/CD publishing)
  info('Step 9: Pushing beta branch to trigger CI/CD...');
  exec(`git push origin ${betaBranch}`);
  success(`Beta branch pushed to origin: ${betaBranch}`);
  
  // 10. Summary (CI will handle publishing)
  log('\n🎉 BETA RELEASE PREPARATION COMPLETED! 🎉', colors.green + colors.bright);
  log('============================================', colors.green);
  log('\n📋 Summary:', colors.bright);
  log(`   • Branch: ${betaBranch}`);
  log(`   • Description: ${description}`);
  log(`   • Changed packages prepared with beta suffix`);
  log(`   • GitHub Actions will publish packages automatically`);
  
  log('\n🤖 CI/CD Status:', colors.blue);
  log('   • GitHub Actions workflow triggered');
  log('   • Check: https://github.com/your-org/electrode-react19/actions');
  log('   • Publishing will happen automatically with secured credentials');
  
  log('\n📦 After CI completes, users can install:', colors.blue);
  log('   npm install @xarc/app@beta');
  log('   npm install package-name@beta');
  
  log('\n🔄 Next Steps:', colors.yellow);
  log('   1. Monitor CI/CD pipeline for successful publishing');
  log('   2. Test the beta release thoroughly');
  log('   3. When ready for stable: rush release:stable');
  log('   4. Or increment beta: rush release:beta "next-iteration"');
}

if (require.main === module) {
  main();
}

module.exports = { main };
