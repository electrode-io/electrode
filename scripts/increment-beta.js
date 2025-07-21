#!/usr/bin/env node

/**
 * Increment Beta Version Script
 * 
 * This script increments the beta version number for all packages that currently have a beta suffix.
 * For example: 1.2.0-beta.0 → 1.2.0-beta.1
 * 
 * Usage: node scripts/increment-beta.js
 */

const fs = require('fs');
const path = require('path');

function main() {
  console.log('🔄 Incrementing beta versions...\n');

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
        if (!pkg.version.includes('-beta.')) {
          console.log(`⏭️  Skipping ${project.packageName} (no beta suffix: ${pkg.version})`);
          skippedCount++;
          return;
        }

        // Parse and increment beta version
        const betaMatch = pkg.version.match(/^(.+)-beta\.(\d+)$/);
        if (!betaMatch) {
          console.log(`⚠️  Warning: Invalid beta version format for ${project.packageName}: ${pkg.version}`);
          skippedCount++;
          return;
        }

        const [, baseVersion, betaNumber] = betaMatch;
        const newBetaNumber = parseInt(betaNumber, 10) + 1;
        pkg.version = `${baseVersion}-beta.${newBetaNumber}`;

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
      console.log('\n🎉 Beta versions incremented successfully!');
      console.log('\n💡 Next steps:');
      console.log('   1. Review the changes: git diff');
      console.log('   2. Commit the changes: git add . && git commit -m "chore: increment beta versions"');
      console.log('   3. Proceed with beta publishing');
    } else {
      console.log('\n📝 No packages were updated. This might be because:');
      console.log('   • No packages currently have beta suffixes');
      console.log('   • All packages have shouldPublish: false');
      console.log('   • Invalid beta version formats detected');
    }

  } catch (error) {
    console.error('❌ Error incrementing beta versions:', error.message);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  main();
}

module.exports = { main };
