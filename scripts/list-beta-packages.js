#!/usr/bin/env node

/**
 * List Beta Packages Script
 * 
 * This script lists all packages and their current beta status.
 * Useful for checking the current state before or after beta operations.
 * 
 * Usage: node scripts/list-beta-packages.js [options]
 * Options:
 *   --beta-only    Show only packages with beta versions
 *   --json         Output in JSON format
 */

const fs = require('fs');
const path = require('path');

function parseArguments() {
  const args = process.argv.slice(2);
  return {
    betaOnly: args.includes('--beta-only'),
    json: args.includes('--json')
  };
}

function main() {
  const options = parseArguments();
  
  try {
    // Read rush.json to get all projects
    const rushConfigPath = path.join(process.cwd(), 'rush.json');
    if (!fs.existsSync(rushConfigPath)) {
      throw new Error('rush.json not found. Please run this script from the repository root.');
    }

    const rushConfig = JSON.parse(fs.readFileSync(rushConfigPath, 'utf8'));
    const packages = [];
    let betaCount = 0;
    let stableCount = 0;
    let nonPublishCount = 0;

    rushConfig.projects.forEach(project => {
      const packageJsonPath = path.join(process.cwd(), project.projectFolder, 'package.json');
      
      if (!fs.existsSync(packageJsonPath)) {
        return;
      }

      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const isBeta = pkg.version.includes('-beta');
      const isPublishable = project.shouldPublish !== false;

      const packageInfo = {
        name: project.packageName,
        version: pkg.version,
        isBeta: isBeta,
        isPublishable: isPublishable,
        folder: project.projectFolder
      };

      // Count packages
      if (!isPublishable) {
        nonPublishCount++;
      } else if (isBeta) {
        betaCount++;
      } else {
        stableCount++;
      }

      // Filter based on options
      if (options.betaOnly && !isBeta) {
        return;
      }

      packages.push(packageInfo);
    });

    if (options.json) {
      // JSON output
      console.log(JSON.stringify({
        summary: {
          total: packages.length,
          beta: betaCount,
          stable: stableCount,
          nonPublishable: nonPublishCount
        },
        packages: packages
      }, null, 2));
    } else {
      // Human-readable output
      if (!options.betaOnly) {
        console.log('📦 Package Status Summary');
        console.log('=' .repeat(50));
        console.log(`   📊 Total packages: ${packages.length}`);
        console.log(`   🚀 Beta versions: ${betaCount}`);
        console.log(`   ✅ Stable versions: ${stableCount}`);
        console.log(`   🚫 Non-publishable: ${nonPublishCount}`);
        console.log('');
      }

      if (packages.length === 0) {
        console.log('No packages found matching the criteria.');
        return;
      }

      console.log(options.betaOnly ? '🚀 Beta Packages:' : '📦 All Packages:');
      console.log('-' .repeat(50));

      packages.forEach(pkg => {
        const statusIcon = pkg.isBeta ? '🚀' : (pkg.isPublishable ? '✅' : '🚫');
        const versionDisplay = pkg.isBeta ? `${pkg.version} (BETA)` : pkg.version;
        const publishStatus = pkg.isPublishable ? '' : ' (non-publishable)';
        
        console.log(`${statusIcon} ${pkg.name}`);
        console.log(`    Version: ${versionDisplay}${publishStatus}`);
        console.log(`    Path: ${pkg.folder}`);
        console.log('');
      });

      if (!options.betaOnly && betaCount > 0) {
        console.log('💡 Tip: Use --beta-only to show only beta packages');
      }
    }

  } catch (error) {
    console.error('❌ Error listing packages:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
