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
 * Finds all packages that depend on a specific package
 * @param {string} packageName - The package to search for
 * @param {Object} rushConfig - The parsed rush configuration
 * @param {string} repoRoot - The root directory of the repository
 * @returns {Array} List of dependent packages
 */
function findDependentPackages(packageName, rushConfig, repoRoot) {
	const dependents = [];
	const projects = rushConfig.projects || [];

	for (const project of projects) {
		const packageJsonPath = path.join(
			repoRoot,
			project.projectFolder,
			"package.json",
		);

		try {
			let packageJson;
			const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");

			// Try to parse package.json, first with JSON5 if available
			if (json5) {
				try {
					packageJson = json5.parse(packageJsonContent);
				} catch (e) {
					// Fall back to standard JSON parsing
					packageJson = JSON.parse(packageJsonContent);
				}
			} else {
				// If JSON5 is not available, use standard JSON parsing
				packageJson = JSON.parse(packageJsonContent);
			}

			// Check different dependency types
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
						name: packageJson.name,
						version: deps[packageName],
						depType: name,
						path: project.projectFolder,
					});
				}
			}
		} catch (error) {
			console.error(
				`Error reading package.json for ${project.projectFolder}: ${error.message}`,
			);
		}
	}

	return dependents;
}

module.exports = {
	sanitizeJsonContent,
	findRushJson,
	parseRushConfig,
	findDependentPackages,
};
