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

import type { Compiler, Compilation, Module, Stats } from 'webpack';

interface ModuleTiming {
  start: number;
  module: Module;
  duration?: number;
}

interface LoaderStat {
  count: number;
  modules: number[];
}

interface WebpackMetricsPluginOptions {
  /**
   * Enable or disable the plugin
   * @default process.env.VERBOSE === 'true' || process.env.WEBPACK_METRICS === 'true'
   */
  enabled?: boolean;
}

export class WebpackMetricsPlugin {
  private moduleTimes: Map<string, ModuleTiming>;
  private cacheHits: number;
  private cacheMisses: number;
  private initialMemory: number;
  private buildStartTime: number;
  private enabled: boolean;

  constructor(options: WebpackMetricsPluginOptions = {}) {
    this.moduleTimes = new Map();
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.initialMemory = 0;
    this.buildStartTime = 0;
    this.enabled = options.enabled ??
      (process.env.VERBOSE === 'true' || process.env.WEBPACK_METRICS === 'true');
  }

  apply(compiler: Compiler): void {
    if (!this.enabled) {
      return;
    }

    compiler.hooks.beforeCompile.tap('WebpackMetricsPlugin', () => {
      this.buildStartTime = Date.now();
      this.initialMemory = process.memoryUsage().heapUsed;
      console.log('\n🔨 [VERBOSE] Starting webpack compilation...');
    });

    // Track module build times and cache performance
    compiler.hooks.compilation.tap('WebpackMetricsPlugin', (compilation: Compilation) => {
      // Track modules that are being built (cache misses)
      compilation.hooks.buildModule.tap('WebpackMetricsPlugin', (module: Module) => {
        const moduleId = module.identifier();
        this.moduleTimes.set(moduleId, { start: Date.now(), module });
        this.cacheMisses++;
      });

      // Track when modules finish building (to get duration)
      compilation.hooks.succeedModule.tap('WebpackMetricsPlugin', (module: Module) => {
        const moduleId = module.identifier();
        const timing = this.moduleTimes.get(moduleId);
        if (timing) {
          const duration = Date.now() - timing.start;
          this.moduleTimes.set(moduleId, { ...timing, duration });
        }
      });

      // Track modules restored from filesystem cache (cache hits)
      compilation.hooks.stillValidModule.tap('WebpackMetricsPlugin', (module: Module) => {
        this.cacheHits++;
      });
    });

    compiler.hooks.done.tap('WebpackMetricsPlugin', (stats: Stats) => {
      const buildTime = Date.now() - this.buildStartTime;
      const seconds = (buildTime / 1000).toFixed(2);
      const currentMemory = process.memoryUsage().heapUsed;
      const memoryDelta = currentMemory - this.initialMemory;

      console.log('\n📊 [VERBOSE] Build Performance:');
      console.log(`   Total Build Time: ${seconds}s`);
      console.log(`   Compilation Time: ${((stats.endTime - stats.startTime) / 1000).toFixed(2)}s`);

      if (stats.compilation.modules) {
        console.log(`   Total Modules: ${stats.compilation.modules.size}`);
      }

      if (stats.compilation.chunks) {
        console.log(`   Total Chunks: ${stats.compilation.chunks.size}`);
      }

      if (stats.compilation.assets) {
        const assetCount = Object.keys(stats.compilation.assets).length;
        const totalSize = Object.values(stats.compilation.assets)
          .reduce((sum, asset) => sum + (asset.size ? asset.size() : 0), 0);
        console.log(`   Total Assets: ${assetCount}`);
        console.log(`   Total Size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
      }

      // 1. Cache Hit Rate
      const totalModules = this.cacheHits + this.cacheMisses;

      if (totalModules > 0) {
        const hitRate = ((this.cacheHits / totalModules) * 100).toFixed(1);
        console.log(`\n💾 [CACHE] Performance:`);
        console.log(`   Cache Type: ${compiler.options.cache ? (compiler.options.cache as any).type : 'none'}`);
        console.log(`   Total Modules: ${totalModules}`);
        console.log(`   Built (Misses): ${this.cacheMisses}`);
        console.log(`   Cached (Hits): ${this.cacheHits}`);
        console.log(`   Hit Rate: ${hitRate}%`);
        if (parseFloat(hitRate) < 50 && this.cacheMisses > 1000) {
          console.log(`   ⚠️  Low hit rate detected - cache may not be working properly`);
        }
      }

      // 2. Slowest Modules (Top 10)
      const moduleTimings = Array.from(this.moduleTimes.values())
        .filter(t => t.duration && t.duration > 0)
        .sort((a, b) => (b.duration || 0) - (a.duration || 0))
        .slice(0, 10);

      if (moduleTimings.length > 0) {
        console.log(`\n🐌 [SLOWEST MODULES] Top 10:`);
        moduleTimings.forEach((timing, index) => {
          const name = (timing.module as any).userRequest || timing.module.identifier();
          const shortName = name.length > 80 ? '...' + name.slice(-77) : name;
          console.log(`   ${index + 1}. ${timing.duration}ms - ${shortName}`);
        });
      }

      // 3. Loader Performance
      const loaderStats = new Map<string, LoaderStat>();
      stats.compilation.modules.forEach(module => {
        const mod = module as any;
        if (mod.loaders && mod.loaders.length > 0) {
          mod.loaders.forEach((loader: any) => {
            const loaderName = loader.loader.split('/').slice(-2).join('/');
            if (!loaderStats.has(loaderName)) {
              loaderStats.set(loaderName, { count: 0, modules: [] });
            }
            const stat = loaderStats.get(loaderName)!;
            stat.count++;
            const timing = this.moduleTimes.get(module.identifier());
            if (timing && timing.duration) {
              stat.modules.push(timing.duration);
            }
          });
        }
      });

      if (loaderStats.size > 0) {
        console.log(`\n⚙️  [LOADERS] Performance:`);
        const sortedLoaders = Array.from(loaderStats.entries())
          .map(([name, stat]) => {
            const total = stat.modules.reduce((sum, t) => sum + t, 0);
            const avg = stat.modules.length > 0 ? total / stat.modules.length : 0;
            return { name, count: stat.count, total, avg };
          })
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        sortedLoaders.forEach(loader => {
          console.log(`   ${loader.name}`);
          console.log(`      Processed: ${loader.count} modules`);
          console.log(`      Total Time: ${loader.total.toFixed(0)}ms`);
          console.log(`      Avg/Module: ${loader.avg.toFixed(1)}ms`);
        });
      }

      // 4. Memory Usage
      console.log(`\n🧠 [MEMORY] Usage:`);
      console.log(`   Initial: ${(this.initialMemory / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Final: ${(currentMemory / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Delta: ${memoryDelta >= 0 ? '+' : ''}${(memoryDelta / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   Total Heap: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   RSS: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`);

      console.log('\n   ✅ Build completed\n');

      // Reset for next build
      this.moduleTimes.clear();
      this.cacheHits = 0;
      this.cacheMisses = 0;
    });

    // Track individual compilation phases
    compiler.hooks.compile.tap('WebpackMetricsPlugin', () => {
      console.log('   📝 Compiling modules...');
    });

    compiler.hooks.emit.tap('WebpackMetricsPlugin', () => {
      console.log('   📦 Emitting assets...');
    });
  }
}
