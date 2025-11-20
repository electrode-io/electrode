/**
 * Webpack Metrics Plugin
 *
 * Provides detailed build performance metrics including:
 * - Build and compilation times
 * - Module and chunk counts
 * - Cache hit/miss rates
 * - Slowest modules
 * - Loader performance
 * - Memory usage
 */
import type { Compiler } from 'webpack';
interface WebpackMetricsPluginOptions {
    /**
     * Enable or disable the plugin
     * @default process.env.VERBOSE === 'true' || process.env.WEBPACK_METRICS === 'true'
     */
    enabled?: boolean;
}
export declare class WebpackMetricsPlugin {
    private moduleTimes;
    private cacheHits;
    private cacheMisses;
    private initialMemory;
    private buildStartTime;
    private enabled;
    constructor(options?: WebpackMetricsPluginOptions);
    apply(compiler: Compiler): void;
}
export {};
