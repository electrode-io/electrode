#!/usr/bin/env node

/**
 * Apply Beta Suffix Script
 * 
 * This script adds a "-beta.0" suffix to packages that have changes according to Rush.
 * It uses Rush's change detection to only modify packages that actually need to be released.
 * 
 * Usage: node scripts/apply-beta-suffix.js [--all]
 * 
 * Options:
 *   --all    Apply beta suffix to ALL publishable packages (not recommended)
 *   default  Apply beta suffix only to packages with changes (recommended)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getChangedPackages() {
  try {
    // Use Rush to detect which packages have changes
    console.log('🔍 Detecting changed packages using Rush...\n');
    
    // First, check if we have change files in common/changes
    const changesDir = path.join(process.cwd(), 'common', 'changes');
    if (!fs.existsSync(changesDir)) {
      console.log('⚠️  No changes directory found. Creating change files...');
      // Generate change files for modified packages
      execSync('rush change --verify || true', { stdio: 'inherit' });
    }

    // Get list of change files
    const changeFiles = fs.readdirSync(changesDir).filter(f => f.endsWith('.json'));
    
    if (changeFiles.length === 0) {
      console.log('📝 No change files found. No packages have changes to release.');
      return [];
    }

    // Extract package names from change files
    const changedPackages = new Set();
    changeFiles.forEach(file => {
      try {
        const changeData = JSON.parse(fs.readFileSync(path.join(changesDir, file), 'utf8'));
        if (changeData.changes) {
          changeData.changes.forEach(change => {
            changedPackages.add(change.packageName);
          });
        }
      } catch (error) {
        console.warn(`⚠️  Could not parse change file ${file}:`, error.message);
      }
    });

    console.log(`Found ${changedPackages.size} packages with changes:`);
    changedPackages.forEach(pkg => console.log(`   📦 ${pkg}`));
    console.log('');

    return Array.from(changedPackages);
    
  } catch (error) {
    console.error('❌ Error detecting changed packages:', error.message);
    console.log('💡 Tip: Run "rush change" first to generate change files');
    return [];
  }
}

function main() {
  console.log('🚀 Applying beta suffix to package versions...\n');

  const forceAll = process.argv.includes('--all');
  
  try {
    // Read rush.json to get all projects
    const rushConfigPath = path.join(process.cwd(), 'rush.json');
    if (!fs.existsSync(rushConfigPath)) {
      throw new Error('rush.json not found. Please run this script from the repository root.');
    }

    const rushConfig = JSON.parse(fs.readFileSync(rushConfigPath, 'utf8'));
    
    // Get changed packages (unless --all is specified)
    let targetPackages;
    if (forceAll) {
      console.log('⚠️  --all flag specified. Applying beta suffix to ALL publishable packages.\n');
      targetPackages = rushConfig.projects
        .filter(p => p.shouldPublish !== false)
        .map(p => p.packageName);
    } else {
      targetPackages = getChangedPackages();
      if (targetPackages.length === 0) {
        console.log('✅ No packages need beta suffix. All packages are up to date.');
        return;
      }
    }

    let updatedCount = 0;
    let skippedCount = 0;

    console.log(`Processing ${rushConfig.projects.length} total projects...\n`);

    rushConfig.projects.forEach(project => {
      // Skip projects that are not published
      if (project.shouldPublish === false) {
        return;
      }

      // Skip projects that haven't changed (unless --all)
      if (!forceAll && !targetPackages.includes(project.packageName)) {
        return;
      }

      const packageJsonPath = path.join(process.cwd(), project.projectFolder, 'package.json');
      
      if (!fs.existsSync(packageJsonPath)) {
        console.log(`⚠️  Warning: package.json not found for ${project.packageName} at ${packageJsonPath}`);
        skippedCount++;
        return;
      }

      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const originalVersion = pkg.version;

        let newVersion;
        if (pkg.version.includes('-beta.')) {
          // Increment existing beta version
          const [baseVersion, betaPart] = pkg.version.split('-beta.');
          const betaNumber = parseInt(betaPart, 10) || 0;
          newVersion = `${baseVersion}-beta.${betaNumber + 1}`;
          console.log(`🔄 Incrementing ${project.packageName}: ${originalVersion} → ${newVersion}`);
        } else {
          // Add initial beta suffix
          newVersion = `${pkg.version}-beta.0`;
          console.log(`✅ Adding beta suffix ${project.packageName}: ${originalVersion} → ${newVersion}`);
        }

        // Update version
        pkg.version = newVersion;

        // Write back to file with proper formatting
        fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
        updatedCount++;

      } catch (error) {
        console.error(`❌ Error processing ${project.packageName}:`, error.message);
        skippedCount++;
      }
    });

    console.log('\n📊 Summary:');
    console.log(`   ✅ Updated: ${updatedCount} packages`);
    console.log(`   ⏭️  Skipped: ${skippedCount} packages`);
    
    if (updatedCount > 0) {
      console.log('\n🎉 Beta suffix applied successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. Review the changes: git diff');
      console.log('   2. Commit the changes: git add . && git commit -m "chore: apply beta suffix to changed packages"');
      console.log('   3. Proceed with beta publishing: rush publish --apply --publish --tag beta');
    } else {
      console.log('\n📝 No packages were updated. This might be because:');
      console.log('   • No packages have changes requiring release');
      console.log('   • All packages already have beta suffixes');
      console.log('   • Run "rush change" first to create change files');
      console.log('   • Use --all flag to force update all packages');
    }

  } catch (error) {
    console.error('❌ Error applying beta suffix:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
