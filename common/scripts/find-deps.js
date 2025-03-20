#!/usr/bin/env node

const path = require("node:path");
const {
	findRushJson,
	parseRushConfig,
	findDependentPackages,
} = require("./find-dependencies-utils");

// Parse command line arguments
const args = process.argv.slice(2);
let packageName = "";

for (let i = 0; i < args.length; i++) {
	if (args[i] === "--package" && i + 1 < args.length) {
		packageName = args[i + 1];
		break;
	}
}

if (!packageName) {
	console.error(
		"Error: Please provide a package name using --package <package-name>",
	);
	process.exit(1);
}

// Get the root of the repository
const rushJsonPath = findRushJson(process.cwd());
if (!rushJsonPath) {
	console.error(
		"Error: Could not find rush.json in current directory or any parent directory",
	);
	process.exit(1);
}

const repoRoot = path.dirname(rushJsonPath);

// Parse rush.json to get all projects
let rushConfig;
try {
	rushConfig = parseRushConfig(rushJsonPath);
} catch (error) {
	console.error(error.message);
	process.exit(1);
}

const projects = rushConfig.projects || [];
if (projects.length === 0) {
	console.warn(`Warning: No projects found in ${rushJsonPath}`);
}

console.log(`Searching for dependencies on "${packageName}"...\n`);

// Find packages that depend on the specified package
console.log("Searching through project directories...");
const dependents = [];
let searchedCount = 0;

for (const project of projects) {
	searchedCount++;
	const projectPath = path.join(repoRoot, project.projectFolder);
	process.stdout.write(
		`Checking ${project.packageName} (${searchedCount}/${projects.length})... `,
	);

	const result = findDependentPackages(packageName, project, repoRoot);
	if (result.length > 0) {
		dependents.push(...result);
		console.log("DEPENDENT FOUND");
	} else {
		console.log("no dependency");
	}
}

console.log(`\nCompleted search of ${searchedCount} projects.`);

// Display results
if (dependents.length === 0) {
	console.log(`No packages depend on "${packageName}".`);
} else {
	console.log(
		`Found ${dependents.length} packages that depend on "${packageName}":\n`,
	);

	dependents.forEach((dep) => {
		console.log(`- ${dep.name}`);
		console.log(`  Version: ${dep.version}`);
		console.log(`  Type: ${dep.depType}`);
		console.log(`  Path: ${dep.path}`);
		console.log("");
	});
}
