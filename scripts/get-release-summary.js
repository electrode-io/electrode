#!/usr/bin/env node

/**
 * Get Release Summary Script
 * 
 * This script provides a summary of packages and their versions,
 * useful for understanding what will be released or what was released.
 * 
 * Usage: node scripts/get-release-summary.js [options]
 * Options:
 *   --beta        Show only beta packages
 *   --changed     Show only packages with pending changes
 *   --json        Output in JSON format
 *   --format      Format for branch names (default: summary)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function parseArguments() {
  const args = process.argv.slice(2);
  return {
    beta: args.includes('--beta'),
    changed: args.includes('--changed'),
    json: args.includes('--json'),
    format: args.includes('--format') ? args[args.indexOf('--format') + 1] : 'summary'
  };
}

function getPackageInfo() {
  try {
    // Read rush.json and strip comments before parsing
    const rushContent = fs.readFileSync('./rush.json', 'utf8');
    // Remove single-line and multi-line comments
    const cleanContent = rushContent
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove /* */ comments
      .replace(/\/\/.*$/gm, ''); // Remove // comments
    
    const rushConfig = JSON.parse(cleanContent);
    const packages = [];
    
    rushConfig.projects.forEach(project => {
      if (project.shouldPublish !== false) {
        const packageJsonPath = path.join(project.projectFolder, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          try {
            const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
            const pkg = JSON.parse(packageContent);
            packages.push({
              name: pkg.name,
              version: pkg.version,
              folder: project.projectFolder,
              isBeta: pkg.version.includes('-beta'),
              isPublishable: true
            });
          } catch (e) {
            console.warn(`Warning: Could not parse ${packageJsonPath}: ${e.message}`);
            // Skip invalid package.json files
          }
        }
      }
    });
    
    return packages;
  } catch (error) {
    console.error('Error reading package information:', error.message);
    process.exit(1);
  }
}

function getChangedPackages() {
  try {
    // Get packages that have change files
    const changesDir = './common/changes';
    if (!fs.existsSync(changesDir)) {
      return [];
    }
    
    const changedPackages = new Set();
    
    function scanChanges(dir) {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          scanChanges(fullPath);
        } else if (item.endsWith('.json')) {
          try {
            const changeFile = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
            if (changeFile.packageName) {
              changedPackages.add(changeFile.packageName);
            }
          } catch (e) {
            // Skip invalid change files
          }
        }
      });
    }
    
    scanChanges(changesDir);
    return Array.from(changedPackages);
  } catch (error) {
    console.error('❌ Error reading change files:', error.message);
    return [];
  }
}

function generateBranchName(packages, format) {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  
  switch (format) {
    case 'beta':
      const betaCount = packages.filter(p => p.isBeta).length;
      return `release/beta-${betaCount}pkgs-${timestamp}`;
    
    case 'stable':
      const stableCount = packages.filter(p => !p.isBeta).length;
      return `release/stable-${stableCount}pkgs-${timestamp}`;
    
    case 'changed':
      const changedPackages = getChangedPackages();
      return `release/update-${changedPackages.length}pkgs-${timestamp}`;
    
    default:
      return `release/summary-${packages.length}pkgs-${timestamp}`;
  }
}

function main() {
  const options = parseArguments();
  
  try {
    let packages = getPackageInfo();
    const changedPackages = options.changed ? getChangedPackages() : [];
    
    // Filter packages based on options
    if (options.beta) {
      packages = packages.filter(p => p.isBeta);
    }
    
    if (options.changed) {
      packages = packages.filter(p => changedPackages.includes(p.name));
    }
    
    // Generate statistics
    const stats = {
      total: packages.length,
      beta: packages.filter(p => p.isBeta).length,
      stable: packages.filter(p => !p.isBeta).length,
      changed: changedPackages.length,
      branchName: generateBranchName(packages, options.format)
    };
    
    if (options.json) {
      // JSON output
      console.log(JSON.stringify({
        summary: stats,
        packages: packages,
        changedPackages: changedPackages
      }, null, 2));
    } else {
      // Human-readable output
      console.log('📦 Release Summary');
      console.log('=' .repeat(50));
      console.log(`   📊 Total packages: ${stats.total}`);
      console.log(`   🚀 Beta versions: ${stats.beta}`);
      console.log(`   ✅ Stable versions: ${stats.stable}`);
      if (options.changed) {
        console.log(`   📝 Changed packages: ${stats.changed}`);
      }
      console.log('');
      
      if (packages.length === 0) {
        console.log('No packages found matching the criteria.');
        return;
      }
      
      console.log('📋 Package Details:');
      console.log('-' .repeat(50));
      
      packages.forEach(pkg => {
        const statusIcon = pkg.isBeta ? '🚀' : '✅';
        const changeStatus = changedPackages.includes(pkg.name) ? ' (CHANGED)' : '';
        
        console.log(`${statusIcon} ${pkg.name}`);
        console.log(`    Version: ${pkg.version}${changeStatus}`);
        console.log(`    Path: ${pkg.folder}`);
        console.log('');
      });
      
      console.log('🌿 Suggested branch name:');
      console.log(`   ${stats.branchName}`);
      console.log('');
      
      if (stats.changed > 0) {
        console.log('💡 Changed packages (have pending change files):');
        changedPackages.forEach(name => {
          console.log(`   • ${name}`);
        });
        console.log('');
      }
      
      console.log('💡 Tips:');
      console.log('   • Use --beta to show only beta packages');
      console.log('   • Use --changed to show only packages with pending changes');
      console.log('   • Use --json for machine-readable output');
      console.log('   • Use --format <type> to customize branch name format');
    }
    
  } catch (error) {
    console.error('❌ Error generating release summary:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
