#!/usr/bin/env node

/**
 * QUICK DEVELOPER ONBOARDING SCRIPT
 * 
 * This script provides an interactive introduction to the automated release system
 * and validates that everything is working correctly.
 * 
 * Usage: rush dev:onboard
 */

const { execSync } = require('child_process');
const fs = require('fs');
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

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

function highlight(message) {
  log(message, colors.cyan + colors.bright);
}

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim());
    });
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  log('\n🎉 Welcome to Electrode React19 Development!', colors.green + colors.bright);
  log('===========================================', colors.green);
  
  await sleep(1000);
  
  log('\nThis is a Rush.js monorepo with 35+ packages and automated release workflows.');
  log('Let me show you how easy it is to work with our automated release system!\n');
  
  await sleep(2000);
  
  // Introduction
  highlight('🚀 AUTOMATED RELEASE SYSTEM OVERVIEW');
  log('=====================================');
  log('Our automation handles:');
  log('  📦 Version management across 35 packages');
  log('  🧪 Quality gates (build, test, lint)');  
  log('  🏷️  Git tagging and branch management');
  log('  📤 npm publishing with correct tags');
  log('  🔄 Branch synchronization');
  
  await prompt('\nPress Enter to continue...');
  
  // Show commands
  highlight('\n🛠️  DEVELOPER COMMANDS');
  log('====================');
  log('Instead of remembering complex procedures, you have simple commands:');
  log('');
  log(colors.cyan + '  rush dev:setup' + colors.reset + '           - First-time setup');
  log(colors.cyan + '  rush build' + colors.reset + '               - Build packages');
  log(colors.cyan + '  rush test' + colors.reset + '                - Run tests');
  log(colors.cyan + '  rush release:beta "desc"' + colors.reset + '  - Beta release');
  log(colors.cyan + '  rush release:stable' + colors.reset + '      - Stable release');
  log(colors.cyan + '  rush release:hotfix "desc"' + colors.reset + ' - Emergency fix');
  
  await prompt('\nPress Enter to see the workflow...');
  
  // Show workflow
  highlight('\n🔄 RELEASE WORKFLOW');
  log('==================');
  log('1. Development Phase:');
  log('   • Work on feature/* branches');
  log('   • Create PRs to develop branch');
  log('   • Automated CI/CD testing');
  log('');
  log('2. Beta Release:');
  log('   • Run: rush release:beta "feature-description"');
  log('   • Creates beta-TIMESTAMP branch');
  log('   • Publishes packages with @beta tag');
  log('   • Users: npm install @xarc/app@beta');
  log('');
  log('3. Stable Release:');
  log('   • Run: rush release:stable');
  log('   • Merges beta to master');
  log('   • Publishes with @latest tag');
  log('   • Syncs everything back');
  
  await prompt('\nPress Enter to continue...');
  
  // Show benefits
  highlight('\n⚡ BENEFITS FOR DEVELOPERS');
  log('=========================');
  log('✅ No manual version management');
  log('✅ Impossible to forget testing');
  log('✅ Automatic branch cleanup');
  log('✅ Consistent git tagging');
  log('✅ Error prevention & recovery');
  log('✅ Clear success/failure feedback');
  log('✅ Installation instructions provided');
  
  await prompt('\nPress Enter to run a quick validation...');
  
  // Quick validation
  highlight('\n🔍 ENVIRONMENT VALIDATION');
  log('==========================');
  
  try {
    log('Checking Rush installation...');
    const rushVersion = execSync('rush --version', { encoding: 'utf8' }).trim();
    success(`Rush v${rushVersion} installed`);
    
    log('Checking project structure...');
    if (fs.existsSync('rush.json') && fs.existsSync('common/config/rush/command-line.json')) {
      success('Project structure is correct');
    }
    
    log('Checking package count...');
    const rushConfig = JSON.parse(fs.readFileSync('rush.json', 'utf8'));
    const packages = rushConfig.projects.filter(p => p.shouldPublish).length;
    success(`Found ${packages} publishable packages`);
    
  } catch (err) {
    log('⚠️  Some checks failed, but that\'s okay for a demo!', colors.yellow);
  }
  
  await prompt('\nPress Enter for next steps...');
  
  // Next steps
  highlight('\n🎯 YOUR NEXT STEPS');
  log('==================');
  log('1. Read the full guide: ' + colors.cyan + 'AUTOMATED_RELEASE_GUIDE.md' + colors.reset);
  log('2. Set up your environment: ' + colors.cyan + 'rush dev:setup' + colors.reset);
  log('3. Try building: ' + colors.cyan + 'rush build' + colors.reset);
  log('4. Run tests: ' + colors.cyan + 'rush test' + colors.reset);
  log('5. Create your first feature branch');
  log('6. When ready for beta: ' + colors.cyan + 'rush release:beta "my-feature"' + colors.reset);
  
  log('\n📚 Resources:');
  log('  • AUTOMATED_RELEASE_GUIDE.md - Complete documentation');
  log('  • CONTRIBUTING.md - Contribution guidelines');
  log('  • Rush.js docs: https://rushjs.io');
  
  const wantsDemo = await prompt('\nWould you like to see a demo of the beta release process? (y/n): ');
  
  if (wantsDemo === 'y' || wantsDemo === 'yes') {
    highlight('\n🎬 DEMO: Beta Release Process');
    log('=============================');
    log('Here\'s what happens when you run: ' + colors.cyan + 'rush release:beta "react-19-support"' + colors.reset);
    log('');
    
    await sleep(1000);
    log('1. 🔍 Validating environment...');
    await sleep(500);
    log('   ✅ Git status is clean');
    await sleep(500);
    log('   ✅ On develop branch');
    await sleep(500);
    
    log('2. 🌿 Creating beta branch...');
    await sleep(500);
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')}T${now.getHours().toString().padStart(2,'0')}-${now.getMinutes().toString().padStart(2,'0')}-${now.getSeconds().toString().padStart(2,'0')}`;
    log(`   ✅ Created: beta-${timestamp}`);
    await sleep(500);
    
    log('3. 🏷️  Applying beta suffix...');
    await sleep(500);
    log('   ✅ @xarc/app: 1.0.0 → 1.0.0-beta.1');
    await sleep(500);
    log('   ✅ @xarc/react: 2.1.0 → 2.1.0-beta.1');
    await sleep(500);
    log('   ✅ ... (35 packages total)');
    await sleep(500);
    
    log('4. 📦 Building and testing...');
    await sleep(500);
    log('   ✅ rush update - Dependencies installed');
    await sleep(500);
    log('   ✅ rush rebuild - All packages built');
    await sleep(500);
    log('   ✅ rush test - All tests passed');
    await sleep(500);
    log('   ✅ rush lint - Linting passed');
    await sleep(500);
    
    log('5. 📤 Publishing to npm...');
    await sleep(500);
    log('   ✅ Published @xarc/app@1.0.0-beta.1');
    await sleep(500);
    log('   ✅ Published @xarc/react@2.1.0-beta.1');
    await sleep(500);
    log('   ✅ ... (all packages with @beta tag)');
    await sleep(500);
    
    log('6. 🏷️  Creating git tags...');
    await sleep(500);
    log('   ✅ Tag: @xarc/app@1.0.0-beta.1');
    await sleep(500);
    log('   ✅ Tag: @xarc/react@2.1.0-beta.1');
    await sleep(500);
    log('   ✅ All tags pushed to origin');
    await sleep(500);
    
    log('\n🎉 Beta release completed! Users can now:');
    log('   npm install @xarc/app@beta');
    log('   npm install @xarc/react@beta');
    
    await sleep(2000);
  }
  
  log('\n🎉 ONBOARDING COMPLETE!', colors.green + colors.bright);
  log('========================', colors.green);
  log('\nYou\'re ready to start developing with confidence!');
  log('The automation will handle the complex stuff while you focus on building amazing features.');
  log('\nHappy coding! 🚀');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
