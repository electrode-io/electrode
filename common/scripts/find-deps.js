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
let showTransitive = true;
let includeNodeModules = true;

for (let i = 0; i < args.length; i++) {
	if (args[i] === "--package" && i + 1 < args.length) {
		packageName = args[i + 1];
	} else if (args[i] === "--direct-only") {
		showTransitive = false;
	} else if (args[i] === "--no-node-modules") {
		includeNodeModules = false;
	}
}

// Display verbose output about selected flags
console.log("Running with the following options:");
console.log(`- Package name: ${packageName || "(not provided yet)"}`);
console.log(`- Show transitive dependencies: ${showTransitive ? "Yes" : "No"}`);
console.log(`- Include node_modules: ${includeNodeModules ? "Yes" : "No"}`);
console.log("");

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
console.log("Analyzing dependency tree...");
const dependents = findDependentPackages(packageName, rushConfig, repoRoot);

// Filter results based on user options
let filteredDependents = dependents;
if (!showTransitive) {
	filteredDependents = filteredDependents.filter((dep) => !dep.transitive);
}
if (!includeNodeModules) {
	filteredDependents = filteredDependents.filter(
		(dep) => dep.depType !== "node_modules",
	);
}

// Display results
if (filteredDependents.length === 0) {
	console.log(`No packages depend on "${packageName}".`);
} else {
	const directCount = dependents.filter(
		(dep) => !dep.transitive && dep.depType !== "node_modules",
	).length;
	const transitiveCount = dependents.filter(
		(dep) => dep.transitive && dep.depType !== "node_modules",
	).length;
	const nodeModulesCount = dependents.filter(
		(dep) => dep.depType === "node_modules",
	).length;

	console.log(
		`Found ${directCount} direct, ${transitiveCount} transitive, and ${nodeModulesCount} node_modules dependencies on "${packageName}":\n`,
	);

	// Group by dependency type for better output
	const directDeps = dependents.filter(
		(dep) => !dep.transitive && dep.depType !== "node_modules",
	);
	const transitiveDeps = dependents.filter(
		(dep) => dep.transitive && dep.depType !== "node_modules",
	);
	const nodeModulesDeps = dependents.filter(
		(dep) => dep.depType === "node_modules",
	);

	if (directDeps.length > 0) {
		console.log("DIRECT DEPENDENCIES:");
		directDeps.forEach((dep) => {
			console.log(`- ${dep.name}`);
			console.log(`  Version: ${dep.version}`);
			console.log(`  Type: ${dep.depType}`);
			console.log(`  Path: ${dep.path}`);
			console.log("");
		});
	}

	if (showTransitive && transitiveDeps.length > 0) {
		console.log("TRANSITIVE DEPENDENCIES:");
		transitiveDeps.forEach((dep) => {
			console.log(`- ${dep.name}`);
			console.log(`  Depends on: ${dep.dependsOn}`);
			console.log(`  Path: ${dep.path}`);
			console.log("");
		});
	}

	if (includeNodeModules && nodeModulesDeps.length > 0) {
		console.log("NODE_MODULES DEPENDENCIES:");
		nodeModulesDeps.forEach((dep) => {
			console.log(`- ${dep.name}`);
			if (dep.dependencyChain) {
				console.log(`  Dependency Chain: ${dep.dependencyChain.join(" → ")}`);
			}
			console.log(`  Path: ${dep.path}`);
			console.log("");
		});
	}
}
