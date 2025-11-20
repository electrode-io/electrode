/**
 * Webpack DevCache Config
 *
 * Helper function to configure webpack 5 filesystem cache for development mode.
 * This provides a convenient way to enable persistent caching across builds.
 */
export interface FilesystemCacheOptions {
    /**
     * Custom cache directory path
     * @default path.resolve(process.cwd(), 'node_modules/.cache/webpack')
     */
    cacheDirectory?: string;
    /**
     * Custom cache name (useful for multiple configurations)
     * @default `webpack-cache-${process.env.NODE_ENV || 'development'}`
     */
    name?: string;
    /**
     * Cache version string (increment to invalidate cache)
     */
    version?: string;
    /**
     * Additional build dependencies that should invalidate cache when changed
     */
    buildDependencies?: Record<string, string[]>;
}
export interface WebpackFilesystemCacheConfig {
    type: 'filesystem';
    cacheDirectory: string;
    buildDependencies: Record<string, string[]>;
    name: string;
    version?: string;
}
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
export declare function createFilesystemCacheConfig(configFile: string, options?: FilesystemCacheOptions): WebpackFilesystemCacheConfig;
