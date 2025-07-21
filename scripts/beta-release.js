#!/usr/bin/env node

/**
 * Beta Release Automation Script
 * 
 * This script automates the complete beta release process, combining all the individual
 * scripts into a single workflow. It provides interactive prompts and safety checks.
 * 
 * Usage: node scripts/beta-release.js [options]
 * Options:
 *   --dry-run    Perform a dry run without making any changes
 *   --force      Skip interactive confirmations
 *   --increment  Increment existing beta version instead of creating new one
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Import our utility scripts
const { main: validateBetaRelease } = require('./validate-beta-release');
const { main: applyBetaSuffix } = require('./apply-beta-suffix');
const { main: incrementBeta } = require('./increment-beta');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve);
  });
}

function execCommand(command, options = {}) {
  console.log(`🔧 Executing: ${command}`);
  try {
    const result = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    return { success: true, output: result };
  } catch (error) {
    console.error(`❌ Command failed: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function confirmAction(message, defaultAnswer = false) {
  const defaultText = defaultAnswer ? '[Y/n]' : '[y/N]';
  const answer = await question(`${message} ${defaultText}: `);
  
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    return true;
  } else if (answer.toLowerCase() === 'n' || answer.toLowerCase() === 'no') {
    return false;
  } else {
    return defaultAnswer;
  }
}

function parseArguments() {
  const args = process.argv.slice(2);
  return {
    dryRun: args.includes('--dry-run'),
    force: args.includes('--force'),
    increment: args.includes('--increment')
  };
}

function detectCurrentBetaVersions() {
  try {
    const rushConfig = JSON.parse(fs.readFileSync('./rush.json', 'utf8'));
    const betaPackages = [];
    
    rushConfig.projects.forEach(project => {
      if (project.shouldPublish !== false) {
        const packageJsonPath = path.join(project.projectFolder, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          if (pkg.version.includes('-beta')) {
            betaPackages.push({
              name: project.packageName,
              version: pkg.version
            });
          }
        }
      }
    });

    return betaPackages;
  } catch (error) {
    console.error('❌ Error detecting beta versions:', error.message);
    return [];
  }
}

async function main() {
  const options = parseArguments();
  
  console.log('🚀 Beta Release Automation');
  console.log('=' .repeat(50));
  
  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No changes will be made\n');
  }

  try {
    // Step 1: Validation
    console.log('\n📋 Step 1: Pre-release Validation');
    console.log('-' .repeat(30));
    
    if (!options.force) {
      const proceed = await confirmAction('Run validation checks?', true);
      if (!proceed) {
        console.log('❌ Validation skipped by user');
        process.exit(1);
      }
    }

    validateBetaRelease();

    // Step 2: Detect current state
    console.log('\n🔍 Step 2: Analyzing Current State');
    console.log('-' .repeat(30));

    const betaPackages = detectCurrentBetaVersions();
    
    if (betaPackages.length > 0 && !options.increment) {
      console.log(`\n⚠️  Found ${betaPackages.length} packages with beta versions:`);
      betaPackages.slice(0, 5).forEach(pkg => {
        console.log(`   • ${pkg.name}: ${pkg.version}`);
      });
      if (betaPackages.length > 5) {
        console.log(`   ... and ${betaPackages.length - 5} more`);
      }
      
      if (!options.force) {
        const shouldIncrement = await confirmAction(
          'Do you want to increment existing beta versions instead of creating new ones?',
          true
        );
        options.increment = shouldIncrement;
      }
    }

    // Step 3: Version bumping
    console.log('\n📈 Step 3: Version Management');
    console.log('-' .repeat(30));

    if (!options.increment) {
      console.log('Running rush version --bump...');
      if (!options.dryRun) {
        const versionResult = execCommand('rush version --bump');
        if (!versionResult.success) {
          throw new Error('Version bump failed');
        }
      }

      console.log('Applying beta suffixes...');
      if (!options.dryRun) {
        applyBetaSuffix();
      }
    } else {
      console.log('Incrementing existing beta versions...');
      if (!options.dryRun) {
        incrementBeta();
      }
    }

    // Step 4: Build and test
    console.log('\n🔨 Step 4: Build and Test');
    console.log('-' .repeat(30));

    if (!options.force) {
      const shouldTest = await confirmAction('Run full build and test suite?', true);
      if (shouldTest && !options.dryRun) {
        console.log('Installing dependencies...');
        execCommand('rush install --purge');
        
        console.log('Building all packages...');
        execCommand('rush rebuild --verbose');
        
        console.log('Running tests...');
        execCommand('rush test --verbose');
      }
    }

    // Step 5: Publishing
    console.log('\n📦 Step 5: Publishing');
    console.log('-' .repeat(30));

    if (!options.dryRun) {
      if (!options.force) {
        const shouldPublish = await confirmAction('Proceed with beta publishing?', false);
        if (!shouldPublish) {
          console.log('❌ Publishing cancelled by user');
          process.exit(0);
        }
      }

      console.log('Cleaning local tags...');
      execCommand('git tag -d $(git tag) 2>/dev/null || true', { silent: true });

      console.log('Publishing beta release...');
      const publishResult = execCommand('rush publish --include-all --publish --apply --tag beta');
      
      if (!publishResult.success) {
        throw new Error('Publishing failed');
      }
    }

    // Step 6: Git operations
    console.log('\n📝 Step 6: Git Operations');
    console.log('-' .repeat(30));

    if (!options.dryRun) {
      console.log('Pushing changes and tags...');
      const branch = execCommand('git rev-parse --abbrev-ref HEAD', { silent: true }).output.trim();
      
      execCommand(`git push origin ${branch}`);
      execCommand('git push origin --tags');
    }

    console.log('\n🎉 Beta Release Complete!');
    console.log('=' .repeat(50));
    console.log('\n💡 Next steps:');
    console.log('   • Create GitHub release with beta tag');
    console.log('   • Update documentation');
    console.log('   • Notify stakeholders');
    console.log('   • Monitor feedback channels');

  } catch (error) {
    console.error('\n❌ Beta release failed:', error.message);
    console.log('\n🔧 Recovery suggestions:');
    console.log('   • Check error messages above');
    console.log('   • Reset with: git reset --hard HEAD && git clean -fd');
    console.log('   • Run individual scripts manually');
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the script if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = { main };
