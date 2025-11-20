"use strict";
/**
 * Webpack DevCache Config
 *
 * Helper function to configure webpack 5 filesystem cache for development mode.
 * This provides a convenient way to enable persistent caching across builds.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilesystemCacheConfig = void 0;
const path = require("path");
/**
 * Create webpack 5 filesystem cache configuration
 *
 * @param configFile - Path to webpack config file (usually __filename)
 * @param options - Optional cache configuration
 * @returns Webpack cache configuration object
 *
 * @example
 * ```typescript
 * const { createFilesystemCacheConfig } = require('@xarc/webpack-devcache-config');
 *
 * module.exports = {
 *   mode: 'development',
 *   cache: createFilesystemCacheConfig(__filename),
 *   // ... rest of config
 * };
 * ```
 *
 * @example
 * ```typescript
 * // With custom options
 * const cache = createFilesystemCacheConfig(__filename, {
 *   cacheDirectory: path.resolve(__dirname, '.webpack-cache'),
 *   name: 'my-app-cache',
 *   version: '1.0',
 *   buildDependencies: {
 *     dotenv: ['.env']
 *   }
 * });
 * ```
 */
function createFilesystemCacheConfig(configFile, options = {}) {
    const config = {
        type: 'filesystem',
        cacheDirectory: options.cacheDirectory ||
            path.resolve(process.cwd(), 'node_modules/.cache/webpack'),
        buildDependencies: {
            config: [configFile],
            ...(options.buildDependencies || {})
        },
        name: options.name || `webpack-cache-${process.env.NODE_ENV || 'development'}`
    };
    if (options.version) {
        config.version = options.version;
    }
    return config;
}
exports.createFilesystemCacheConfig = createFilesystemCacheConfig;
//# sourceMappingURL=index.js.map