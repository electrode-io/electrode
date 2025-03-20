/**
 * Utility functions for finding dependencies in a Rush monorepo
 */
const fs = require("node:fs");
const path = require("node:path");
let json5;

try {
	// Try to require JSON5 (will throw if not installed)
	json5 = require("json5");
} catch (e) {
	// JSON5 is not installed, we'll fall back to our custom parser
	json5 = null;
}

/**
 * Sanitizes a JSON string by removing comments and normalizing line endings
 * @param {string} jsonContent - The raw JSON content with potential comments
 * @returns {string} Sanitized JSON string
 */
function sanitizeJsonContent(jsonContent) {
	return jsonContent
		.replace(/\/\*\*?[\s\S]*?\*\//g, "") // Remove block comments including JSDoc
		.replace(/\/\/.*/g, "") // Remove single line comments
		.replace(/\r\n/g, "\n") // Normalize CRLF to LF
		.replace(/\r/g, "\n") // Normalize CR to LF
		.trim(); // Remove leading/trailing whitespace
}

/**
 * Finds rush.json in the current or parent directories
 * @param {string} currentDir - The directory to start searching from
 * @returns {string|null} Path to rush.json or null if not found
 */
function findRushJson(currentDir) {
	const rushJsonPath = path.join(currentDir, "rush.json");

	if (fs.existsSync(rushJsonPath)) {
		return rushJsonPath;
	}

	const parentDir = path.dirname(currentDir);
	if (parentDir === currentDir) {
		return null; // We've reached the root directory
	}

	return findRushJson(parentDir);
}

/**
 * Parses rush.json and returns the configuration
 * @param {string} rushJsonPath - Path to rush.json
 * @returns {Object} Parsed rush configuration
 */
function parseRushConfig(rushJsonPath) {
	try {
		const rushJsonContent = fs.readFileSync(rushJsonPath, "utf8");

		// If JSON5 is available, use it for parsing
		if (json5) {
			try {
				return json5.parse(rushJsonContent);
			} catch (json5Error) {
				console.warn(
					"JSON5 parsing failed, falling back to custom parser:",
					json5Error.message,
				);
				// Fall back to our custom sanitizer if JSON5 fails
			}
		}

		// Use our custom sanitizer as fallback
		const sanitizedContent = sanitizeJsonContent(rushJsonContent);

		try {
			return JSON.parse(sanitizedContent);
		} catch (jsonError) {
			// If both methods fail, provide more diagnostic information
			console.error(
				"JSON parsing error. First 50 characters of sanitized content:",
			);
			console.error(sanitizedContent.substring(0, 50) + "...");
			throw jsonError;
		}
	} catch (error) {
		throw new Error(
			`Error parsing rush.json at ${rushJsonPath}: ${error.message}`,
		);
	}
}

/**
 * Parses a package.json file
 * @param {string} packageJsonPath - Path to package.json
 * @returns {Object} Parsed package.json object
 */
function parsePackageJson(packageJsonPath) {
	try {
		const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");

		// Try to parse package.json, first with JSON5 if available
		if (json5) {
			try {
				return json5.parse(packageJsonContent);
			} catch (e) {
				// Fall back to standard JSON parsing
				return JSON.parse(packageJsonContent);
			}
		} else {
			// If JSON5 is not available, use standard JSON parsing
			return JSON.parse(packageJsonContent);
		}
	} catch (error) {
		throw new Error(`Error parsing ${packageJsonPath}: ${error.message}`);
	}
}

/**
 * Creates a dependency map for the monorepo
 * @param {Array} projects - List of projects from rush.json
 * @param {string} repoRoot - Root directory of the repository
 * @returns {Object} Map of package names to their dependencies
 */
function buildDependencyMap(projects, repoRoot) {
	const dependencyMap = {};
	const packageNameToPath = {};

	// First pass: create a map of package names to their dependencies
	for (const project of projects) {
		try {
			const packageJsonPath = path.join(
				repoRoot,
				project.projectFolder,
				"package.json",
			);
			const packageJson = parsePackageJson(packageJsonPath);

			const packageName = packageJson.name;
			packageNameToPath[packageName] = project.projectFolder;

			// Gather all dependencies
			const allDeps = {
				...packageJson.dependencies,
				...packageJson.devDependencies,
				...packageJson.peerDependencies,
				...packageJson.optionalDependencies,
			};

			dependencyMap[packageName] = {
				directDeps: allDeps || {},
				path: project.projectFolder,
			};
		} catch (error) {
			console.error(
				`Error processing ${project.projectFolder}: ${error.message}`,
			);
		}
	}

	return { dependencyMap, packageNameToPath };
}

/**
 * Recursively finds all dependencies of a package in node_modules
 * @param {string} packagePath - Path to the package directory
 * @param {string} targetPackage - The package name to search for
 * @param {Set} visited - Set of already visited packages to prevent infinite recursion
 * @returns {Array} List of dependency paths that lead to the target package
 */
function findNodeModulesDependency(
	packagePath,
	targetPackage,
	visited = new Set(),
) {
	const results = [];
	const nodeModulesPath = path.join(packagePath, "node_modules");

	if (!fs.existsSync(nodeModulesPath)) {
		return results;
	}

	// Check if the target package is directly in node_modules
	const targetPackagePath = path.join(nodeModulesPath, targetPackage);
	if (fs.existsSync(targetPackagePath)) {
		results.push({
			path: targetPackagePath,
			chain: [targetPackage],
		});
	}

	try {
		// Get all packages in node_modules
		const packages = fs
			.readdirSync(nodeModulesPath)
			.filter((dir) => !dir.startsWith(".") && !dir.startsWith("@"))
			.map((dir) => path.join(nodeModulesPath, dir));

		// Also check scoped packages (those in @org directories)
		const scopedDirs = fs
			.readdirSync(nodeModulesPath)
			.filter((dir) => dir.startsWith("@"));

		for (const scopedDir of scopedDirs) {
			const scopedPath = path.join(nodeModulesPath, scopedDir);
			if (fs.statSync(scopedPath).isDirectory()) {
				const scopedPackages = fs
					.readdirSync(scopedPath)
					.map((pkg) => path.join(scopedPath, pkg));
				packages.push(...scopedPackages);
			}
		}

		// Check each package
		for (const pkgPath of packages) {
			if (visited.has(pkgPath)) {
				continue;
			}

			visited.add(pkgPath);

			// Check if this package depends on the target
			const pkgJsonPath = path.join(pkgPath, "package.json");
			if (fs.existsSync(pkgJsonPath)) {
				try {
					const pkgJson = parsePackageJson(pkgJsonPath);
					const pkgName = pkgJson.name;

					// Recursively check this package's dependencies
					const nestedResults = findNodeModulesDependency(
						pkgPath,
						targetPackage,
						visited,
					);

					// Add this package to the dependency chain
					for (const result of nestedResults) {
						result.chain.unshift(pkgName);
						results.push(result);
					}
				} catch (e) {
					// Skip packages with invalid package.json
				}
			}
		}
	} catch (e) {
		// Skip if node_modules can't be read
	}

	return results;
}

/**
 * Finds direct and transitive dependencies on a package, including node_modules
 * @param {string} packageName - The package to search for
 * @param {Object} rushConfig - The parsed rush configuration
 * @param {string} repoRoot - The root directory of the repository
 * @returns {Array} List of packages that depend on the target package
 */
function findDependentPackages(packageName, rushConfig, repoRoot) {
	const projects = rushConfig.projects || [];

	// First find direct dependencies within the monorepo projects
	const monorepoResults = findMonorepoDependents(
		packageName,
		rushConfig,
		repoRoot,
	);

	// Check each project's node_modules for the package
	const nodeModulesResults = [];

	for (const project of projects) {
		try {
			const projectPath = path.join(repoRoot, project.projectFolder);
			const packageJsonPath = path.join(projectPath, "package.json");
			const packageJson = parsePackageJson(packageJsonPath);

			// Find dependencies in node_modules
			const nodeModulesDeps = findNodeModulesDependency(
				projectPath,
				packageName,
			);

			if (nodeModulesDeps.length > 0) {
				for (const dep of nodeModulesDeps) {
					nodeModulesResults.push({
						name: packageJson.name,
						path: project.projectFolder,
						depType: "node_modules",
						transitive: true,
						dependencyChain: dep.chain,
					});
				}
			}
		} catch (error) {
			console.error(
				`Error checking node_modules for ${project.projectFolder}: ${error.message}`,
			);
		}
	}

	return [...monorepoResults, ...nodeModulesResults];
}

/**
 * Finds dependencies on a package within monorepo projects
 * @param {string} packageName - The package to search for
 * @param {Object} rushConfig - The parsed rush configuration
 * @param {string} repoRoot - The root directory of the repository
 * @returns {Array} List of packages that depend on the target package
 */
function findMonorepoDependents(packageName, rushConfig, repoRoot) {
	// This is the existing implementation you already have
	// ...existing code from your current findDependentPackages function...
	const projects = rushConfig.projects || [];

	// Build a complete map of dependencies in the monorepo
	const { dependencyMap, packageNameToPath } = buildDependencyMap(
		projects,
		repoRoot,
	);

	// Check each project for dependencies on the target package
	const dependents = [];
	const visited = new Set();

	// Process each project in the monorepo
	for (const project of projects) {
		try {
			const packageJsonPath = path.join(
				repoRoot,
				project.projectFolder,
				"package.json",
			);
			const packageJson = parsePackageJson(packageJsonPath);
			const currentPackage = packageJson.name;

			// Check if this package has a direct dependency on the target
			const depTypes = [
				{ name: "dependencies", deps: packageJson.dependencies || {} },
				{ name: "devDependencies", deps: packageJson.devDependencies || {} },
				{ name: "peerDependencies", deps: packageJson.peerDependencies || {} },
				{
					name: "optionalDependencies",
					deps: packageJson.optionalDependencies || {},
				},
			];

			for (const { name, deps } of depTypes) {
				if (packageName in deps) {
					dependents.push({
						name: currentPackage,
						version: deps[packageName],
						depType: name,
						path: project.projectFolder,
						transitive: false,
					});
				}
			}
		} catch (error) {
			console.error(
				`Error checking ${project.projectFolder}: ${error.message}`,
			);
		}
	}

	// Find transitive dependencies by checking which packages depend on packages that depend on the target
	const directDependents = new Set(dependents.map((dep) => dep.name));
	const transitiveDependents = [];

	// Keep finding dependents until we've exhausted all possibilities
	let lastSize = 0;
	while (lastSize !== directDependents.size) {
		lastSize = directDependents.size;

		for (const project of projects) {
			try {
				const packageJsonPath = path.join(
					repoRoot,
					project.projectFolder,
					"package.json",
				);
				const packageJson = parsePackageJson(packageJsonPath);
				const currentPackage = packageJson.name;

				// Skip if this package is already known to be a dependent
				if (directDependents.has(currentPackage)) {
					continue;
				}

				// Check all dependency types
				const allDeps = {
					...packageJson.dependencies,
					...packageJson.devDependencies,
					...packageJson.peerDependencies,
					...packageJson.optionalDependencies,
				};

				// Check if this package depends on any known dependent
				for (const directDependent of directDependents) {
					if (directDependent in allDeps) {
						directDependents.add(currentPackage);
						transitiveDependents.push({
							name: currentPackage,
							version: allDeps[directDependent],
							depType: "transitive",
							path: project.projectFolder,
							dependsOn: directDependent,
							transitive: true,
						});
						break;
					}
				}
			} catch (error) {
				console.error(
					`Error checking transitive dependencies for ${project.projectFolder}: ${error.message}`,
				);
			}
		}
	}

	return [...dependents, ...transitiveDependents];
}

// Now update your exports to include the new function
module.exports = {
	sanitizeJsonContent,
	findRushJson,
	parseRushConfig,
	findDependentPackages,
	parsePackageJson,
	findNodeModulesDependency, // Export the new function
};
