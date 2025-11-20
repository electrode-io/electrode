# @xarc/webpack-metrics-plugin

Webpack plugin for detailed build performance metrics including cache statistics, slowest modules, loader performance, and memory usage.

## Features

- **Build Time Tracking**: Total build time and compilation time
- **Cache Performance**: Hit/miss rates for webpack 5 filesystem cache
- **Module Analysis**: Identify the slowest modules in your build
- **Loader Performance**: See which loaders are taking the most time
- **Memory Usage**: Track memory consumption during builds
- **Easy Activation**: Enable via environment variable

## Installation

```bash
npm install @xarc/webpack-metrics-plugin --save-dev
```

## Usage

### Basic Usage

Add the plugin to your webpack configuration:

```javascript
const { WebpackMetricsPlugin } = require('@xarc/webpack-metrics-plugin');

module.exports = {
  // ... your webpack config
  plugins: [
    new WebpackMetricsPlugin()
  ]
};
```

Then run webpack with the `VERBOSE` or `WEBPACK_METRICS` environment variable:

```bash
VERBOSE=true npm run build
# or
WEBPACK_METRICS=true npm run build
```

### Advanced Usage

You can also control the plugin programmatically:

```javascript
const { WebpackMetricsPlugin } = require('@xarc/webpack-metrics-plugin');

module.exports = {
  plugins: [
    new WebpackMetricsPlugin({
      enabled: process.env.NODE_ENV === 'development'
    })
  ]
};
```

## Output Example

When enabled, the plugin will output detailed metrics:

```
🔨 [VERBOSE] Starting webpack compilation...
   📝 Compiling modules...
   📦 Emitting assets...

📊 [VERBOSE] Build Performance:
   Total Build Time: 2.11s
   Compilation Time: 2.12s
   Total Modules: 3000
   Total Chunks: 10
   Total Assets: 21
   Total Size: 17.06 MB

💾 [CACHE] Performance:
   Cache Type: filesystem
   Total Modules: 2981
   Built (Misses): 0
   Cached (Hits): 2981
   Hit Rate: 100.0%

🐌 [SLOWEST MODULES] Top 10:
   1. 1517ms - .../node_modules/@livingdesign/everyday-sans/dist/EverydaySans.css
   2. 1468ms - ./src/app.tsx
   ...

⚙️  [LOADERS] Performance:
   lib/index.js
      Processed: 114 modules
      Total Time: 0ms
      Avg/Module: 0.0ms
   ...

🧠 [MEMORY] Usage:
   Initial: 49.33 MB
   Final: 345.81 MB
   Delta: +296.48 MB
   Total Heap: 381.67 MB
   RSS: 697.78 MB

   ✅ Build completed
```

## Options

### `enabled`

- **Type**: `boolean`
- **Default**: `process.env.VERBOSE === 'true' || process.env.WEBPACK_METRICS === 'true'`
- **Description**: Enable or disable the metrics plugin

## Performance Impact

The plugin has minimal performance impact when disabled. When enabled, it adds a small overhead (<1%) for tracking module build times.

## Compatibility

- **Webpack**: 5.x
- **Node**: >= 14

## License

Apache-2.0
