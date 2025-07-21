#!/usr/bin/env node

/**
 * Beta Release Validation Script
 * 
 * This script validates the repository state before performing a beta release.
 * It checks for common issues and provides recommendations.
 * 
 * Usage: node scripts/validate-beta-release.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function checkGitStatus() {
  console.log('🔍 Checking git status...');
  
  try {
    const status = execSync('git status --porcelain', { encoding: 'utf8' }).trim();
    if (status) {
      console.log('⚠️  Warning: Working directory is not clean');
      console.log('   Uncommitted changes detected:');
      status.split('\n').forEach(line => console.log(`   ${line}`));
      return false;
    } else {
      console.log('✅ Working directory is clean');
      return true;
    }
  } catch (error) {
    console.error('❌ Error checking git status:', error.message);
    return false;
  }
}

function checkCurrentBranch() {
  console.log('\n🌿 Checking current branch...');
  
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    console.log(`   Current branch: ${branch}`);
    
    if (branch === 'master' || branch === 'main') {
      console.log('⚠️  Warning: You are on the main branch');
      console.log('   Consider creating a feature branch for beta release');
      return false;
    } else {
      console.log('✅ Working on feature branch');
      return true;
    }
  } catch (error) {
    console.error('❌ Error checking current branch:', error.message);
    return false;
  }
}

function checkRushInstallation() {
  console.log('\n🔧 Checking Rush installation...');
  
  try {
    const version = execSync('rush --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Rush version: ${version}`);
    return true;
  } catch (error) {
    console.error('❌ Rush is not installed or not in PATH');
    console.error('   Install Rush: npm install -g @microsoft/rush');
    return false;
  }
}

function checkChangeFiles() {
  console.log('\n📝 Checking for change files...');
  
  const changesDir = path.join(process.cwd(), 'common', 'changes');
  if (!fs.existsSync(changesDir)) {
    console.log('⚠️  No changes directory found');
    return false;
  }

  try {
    const changeFiles = [];
    const readDir = (dir) => {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          readDir(fullPath);
        } else if (item.endsWith('.json')) {
          changeFiles.push(fullPath);
        }
      });
    };

    readDir(changesDir);

    if (changeFiles.length === 0) {
      console.log('⚠️  No change files found');
      console.log('   Run: rush change --target-branch master');
      return false;
    } else {
      console.log(`✅ Found ${changeFiles.length} change file(s)`);
      return true;
    }
  } catch (error) {
    console.error('❌ Error checking change files:', error.message);
    return false;
  }
}

function checkNpmAuthentication() {
  console.log('\n🔐 Checking npm authentication...');
  
  try {
    const whoami = execSync('npm whoami', { encoding: 'utf8' }).trim();
    console.log(`✅ Logged in as: ${whoami}`);
    return true;
  } catch (error) {
    console.log('⚠️  Not logged in to npm');
    console.log('   Run: npm login');
    return false;
  }
}

function checkPackageVersions() {
  console.log('\n📦 Checking package versions...');
  
  try {
    const rushConfig = JSON.parse(fs.readFileSync('./rush.json', 'utf8'));
    let betaCount = 0;
    let stableCount = 0;
    
    rushConfig.projects.forEach(project => {
      if (project.shouldPublish !== false) {
        const packageJsonPath = path.join(project.projectFolder, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          if (pkg.version.includes('-beta')) {
            betaCount++;
          } else {
            stableCount++;
          }
        }
      }
    });

    console.log(`   📊 Beta versions: ${betaCount}`);
    console.log(`   📊 Stable versions: ${stableCount}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error checking package versions:', error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Beta Release Validation\n');
  console.log('=' .repeat(50));

  const checks = [
    checkRushInstallation,
    checkGitStatus,
    checkCurrentBranch,
    checkChangeFiles,
    checkNpmAuthentication,
    checkPackageVersions
  ];

  let passedChecks = 0;
  const totalChecks = checks.length;

  checks.forEach(check => {
    if (check()) {
      passedChecks++;
    }
  });

  console.log('\n' + '=' .repeat(50));
  console.log(`📊 Validation Summary: ${passedChecks}/${totalChecks} checks passed\n`);

  if (passedChecks === totalChecks) {
    console.log('🎉 All validations passed! Ready for beta release.');
    console.log('\n💡 Next steps:');
    console.log('   1. rush version --bump');
    console.log('   2. node scripts/apply-beta-suffix.js');
    console.log('   3. rush rebuild --verbose');
    console.log('   4. rush test --verbose');
    console.log('   5. rush publish --include-all --publish --apply --tag beta');
  } else {
    console.log('⚠️  Some validations failed. Please address the issues above before proceeding.');
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
