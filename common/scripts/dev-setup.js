#!/usr/bin/env node

const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function runCommand(cmd, description) {
  console.log(`\n🔄 ${description}...`);
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`✅ ${description} completed`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} failed:`, error.message);
    return false;
  }
}

async function main() {
  console.log(`
🚀 Welcome to Electrode React 19 Monorepo!
==========================================

This setup will guide you through:
1. Understanding the repository structure
2. Setting up your development environment  
3. Learning the branching and release strategy
4. Validating your setup

`);

  // Check if Rush is installed
  try {
    execSync('rush --version', { stdio: 'pipe' });
    console.log('✅ Rush is installed');
  } catch {
    console.log('❌ Rush not found. Installing Rush...');
    runCommand('npm install -g @microsoft/rush', 'Installing Rush globally');
  }

  // Repository overview
  console.log(`
📁 Repository Structure:
=======================
• packages/ - 35+ Electrode packages (React, Redux, Webpack tools)
• samples/ - Example applications and demos
• common/ - Rush configuration and shared scripts
• scripts/ - Release automation scripts
• .github/workflows/ - CI/CD pipelines

`);

  // Branching strategy
  console.log(`
🌳 Branching Strategy:
====================
master ← beta ← develop ← feature/your-feature

• feature/* : New features and changes
• develop   : Integration branch for testing
• beta      : Pre-release testing branch  
• master    : Stable production releases

`);

  // Ask about their role
  const role = await ask('What best describes your role? (dev/maintainer/new): ');

  if (role === 'new' || role === 'dev') {
    console.log(`
🔧 Developer Workflow:
======================
1. Create feature branch: git checkout -b feature/my-feature
2. Make your changes
3. Run tests: rush test
4. Create PR to 'develop' branch
5. After review → merge to develop
6. Maintainers handle beta/stable releases

`);
  }

  if (role === 'maintainer') {
    console.log(`
🚀 Release Commands Available:
=============================
• rush release:beta    - Create beta release
• rush release:stable  - Promote beta to stable
• rush release:hotfix  - Emergency hotfix release

`);
  }

  // Environment setup
  const setupEnv = await ask('Set up development environment? (y/n): ');
  
  if (setupEnv.toLowerCase() === 'y') {
    console.log('\n🔧 Setting up development environment...');
    
    // Install dependencies
    runCommand('rush install', 'Installing all dependencies');
    
    // Build packages
    const shouldBuild = await ask('Build all packages? This may take a few minutes (y/n): ');
    if (shouldBuild.toLowerCase() === 'y') {
      runCommand('rush build', 'Building all packages');
    }
    
    // Run tests
    const shouldTest = await ask('Run tests to validate setup? (y/n): ');
    if (shouldTest.toLowerCase() === 'y') {
      runCommand('rush test', 'Running tests');
    }
  }

  // Git setup
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  console.log(`\n📍 Current branch: ${currentBranch}`);
  
  if (currentBranch === 'master') {
    console.log('⚠️  You are on master branch. Consider creating a feature branch for development.');
    const createBranch = await ask('Create a new feature branch? (y/n): ');
    if (createBranch.toLowerCase() === 'y') {
      const branchName = await ask('Branch name (feature/): ');
      if (branchName) {
        runCommand(`git checkout -b feature/${branchName}`, `Creating feature branch`);
      }
    }
  }

  console.log(`
✅ Setup Complete!
==================

Next Steps:
• Read CONTRIBUTING.md for contribution guidelines
• Check samples/ directory for example usage
• Join team discussions for questions

Quick Commands:
• rush build      - Build changed packages
• rush test       - Run all tests  
• rush lint       - Run linting
• rush --help     - See all available commands

Happy coding! 🎉
`);

  rl.close();
}

main().catch(console.error);