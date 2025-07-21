#!/usr/bin/env node

/**
 * Remove Beta Suffix Script
 * 
 * This script removes the beta suffix from all packages that currently have one,
 * converting them back to stable release versions.
 * For example: 1.2.0-beta.3 → 1.2.0
 * 
 * Usage: node scripts/remove-beta-suffix.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🧹 Removing beta suffixes from package versions...\n');

  try {
    // Read rush.json to get all projects
    const rushConfigPath = path.join(process.cwd(), 'rush.json');
    if (!fs.existsSync(rushConfigPath)) {
      throw new Error('rush.json not found. Please run this script from the repository root.');
    }

    const rushConfig = JSON.parse(fs.readFileSync(rushConfigPath, 'utf8'));
    let updatedCount = 0;
    let skippedCount = 0;

    console.log(`Found ${rushConfig.projects.length} projects in rush.json\n`);

    rushConfig.projects.forEach(project => {
      // Skip projects that are not published
      if (project.shouldPublish === false) {
        console.log(`⏭️  Skipping ${project.packageName} (shouldPublish: false)`);
        skippedCount++;
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

        // Skip if doesn't have beta suffix
        if (!pkg.version.includes('-beta')) {
          console.log(`⏭️  Skipping ${project.packageName} (no beta suffix: ${pkg.version})`);
          skippedCount++;
          return;
        }

        // Remove beta suffix
        pkg.version = pkg.version.split('-beta')[0];

        // Write back to file with proper formatting
        fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
        
        console.log(`✅ Updated ${project.packageName}: ${originalVersion} → ${pkg.version}`);
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
      console.log('\n🎉 Beta suffixes removed successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. Review the changes: git diff');
      console.log('   2. Commit the changes: git add . && git commit -m "chore: remove beta suffixes for stable release"');
      console.log('   3. Follow standard release process with: rush version --bump');
      console.log('   4. Publish stable release: rush publish --include-all --publish --apply');
    } else {
      console.log('\n📝 No packages were updated. This might be because:');
      console.log('   • No packages currently have beta suffixes');
      console.log('   • All packages have shouldPublish: false');
    }

  } catch (error) {
    console.error('❌ Error removing beta suffixes:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
