#!/usr/bin/env node

/**
 * ============================================================================
 * RELEASE SUMMARY SCRIPT  
 * ============================================================================
 * PURPOSE: Shows current versions of all publishable packages in the monorepo
 * 
 * WHAT IT DOES:
 * 1. Reads rush.json to find all publishable packages
 * 2. Displays package names and current versions
 * 3. Counts total packages and beta vs stable
 * 4. Suggests branch names based on current state
 * 
 * USAGE:
 *   node scripts/get-release-summary-simple.js
 *   node scripts/get-release-summary-simple.js --beta
 * 
 * USE CASES:
 * - Check current package versions before release
 * - Verify what packages have beta versions  
 * - Generate branch name suggestions
 * - Understand the scope of a release
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

function getPackagesFromDirectory() {
  const packages = [];
  const packagesDir = './packages';
  
  if (!fs.existsSync(packagesDir)) {
    console.error('packages directory not found');
    return packages;
  }
  
  const dirs = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  dirs.forEach(dir => {
    const packageJsonPath = path.join(packagesDir, dir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packages.push({
          name: pkg.name,
          version: pkg.version,
          folder: `packages/${dir}`,
          isBeta: pkg.version.includes('-beta'),
          isPublishable: pkg.private !== true
        });
      } catch (e) {
        console.warn(`Warning: Could not parse ${packageJsonPath}: ${e.message}`);
      }
    }
  });
  
  return packages;
}

function parseArguments() {
  const args = process.argv.slice(2);
  return {
    beta: args.includes('--beta'),
    changed: args.includes('--changed'),
    json: args.includes('--json'),
    format: args.includes('--format') ? args[args.indexOf('--format') + 1] : 'summary'
  };
}

function displaySummary(packages, options) {
  let filteredPackages = packages.filter(pkg => pkg.isPublishable);
  
  if (options.beta) {
    filteredPackages = filteredPackages.filter(pkg => pkg.isBeta);
  }
  
  if (options.json) {
    console.log(JSON.stringify(filteredPackages, null, 2));
    return;
  }
  
  console.log('\n📦 Package Release Summary\n');
  console.log('═'.repeat(60));
  
  if (filteredPackages.length === 0) {
    console.log('No packages found matching criteria.');
    return;
  }
  
  filteredPackages.forEach(pkg => {
    const betaIndicator = pkg.isBeta ? ' (BETA)' : '';
    console.log(`${pkg.name}@${pkg.version}${betaIndicator}`);
  });
  
  console.log('═'.repeat(60));
  console.log(`Total packages: ${filteredPackages.length}`);
  
  const betaCount = filteredPackages.filter(pkg => pkg.isBeta).length;
  const stableCount = filteredPackages.length - betaCount;
  
  console.log(`Beta packages: ${betaCount}`);
  console.log(`Stable packages: ${stableCount}`);
  
  if (options.format === 'summary') {
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '-');
    console.log(`\nSuggested branch name: release/${options.beta ? 'beta' : 'stable'}-${timestamp}`);
  }
}

function main() {
  const options = parseArguments();
  const packages = getPackagesFromDirectory();
  
  displaySummary(packages, options);
}

if (require.main === module) {
  main();
}

module.exports = { getPackagesFromDirectory, displaySummary };
