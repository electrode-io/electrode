# @xarc/webpack-devcache-config

Simple helper function for configuring webpack 5 filesystem cache in development mode. Provides sensible defaults and automatic cache invalidation.

## Features

- **Zero Configuration**: Works out of the box with sensible defaults
- **Automatic Invalidation**: Cache is invalidated when webpack config changes
- **Customizable**: Override cache directory, name, and version
- **Type Safe**: Written in TypeScript with full type definitions
- **Framework Agnostic**: Works with any webpack 5 setup

## Installation

```bash
npm install @xarc/webpack-devcache-config --save-dev
```

## Usage

### Basic Usage

```javascript
const { createFilesystemCacheConfig } = require('@xarc/webpack-devcache-config');

module.exports = {
  mode: 'development',
  cache: createFilesystemCacheConfig(__filename),
  // ... rest of your config
};
```

That's it! The cache will be automatically configured with:
- Cache directory: `node_modules/.cache/webpack`
- Cache name: `webpack-cache-development`
- Automatic invalidation when webpack config changes

### Advanced Usage

#### Custom Cache Directory

```javascript
const path = require('path');
const { createFilesystemCacheConfig } = require('@xarc/webpack-devcache-config');

module.exports = {
  cache: createFilesystemCacheConfig(__filename, {
    cacheDirectory: path.resolve(__dirname, '.webpack-cache')
  })
};
```

#### Custom Cache Name

Useful when you have multiple webpack configurations:

```javascript
const { createFilesystemCacheConfig } = require('@xarc/webpack-devcache-config');

module.exports = {
  cache: createFilesystemCacheConfig(__filename, {
    name: 'my-app-client-cache'
  })
};
```

#### Cache Versioning

Increment the version to force cache invalidation:

```javascript
const { createFilesystemCacheConfig } = require('@xarc/webpack-devcache-config');

module.exports = {
  cache: createFilesystemCacheConfig(__filename, {
    version: '1.0.0'
  })
};
```

#### Additional Build Dependencies

Add more files that should invalidate the cache when changed:

```javascript
const { createFilesystemCacheConfig } = require('@xarc/webpack-devcache-config');

module.exports = {
  cache: createFilesystemCacheConfig(__filename, {
    buildDependencies: {
      config: [__filename],
      env: ['.env', '.env.local']
    }
  })
};
```

## TypeScript

The package includes TypeScript definitions:

```typescript
import { createFilesystemCacheConfig, FilesystemCacheOptions } from '@xarc/webpack-devcache-config';

const options: FilesystemCacheOptions = {
  cacheDirectory: './cache',
  name: 'my-cache',
  version: '1.0'
};

const cacheConfig = createFilesystemCacheConfig(__filename, options);
```

## API

### `createFilesystemCacheConfig(configFile, options?)`

Creates a webpack 5 filesystem cache configuration object.

#### Parameters

- **`configFile`** (string, required): Path to your webpack config file (usually `__filename`)
- **`options`** (object, optional): Cache configuration options

##### Options

- **`cacheDirectory`** (string): Custom cache directory path
  - Default: `path.resolve(process.cwd(), 'node_modules/.cache/webpack')`

- **`name`** (string): Custom cache name
  - Default: `` `webpack-cache-${process.env.NODE_ENV || 'development'}` ``

- **`version`** (string): Cache version string
  - Default: undefined

- **`buildDependencies`** (object): Additional files to watch for changes
  - Default: `{}`

#### Returns

Returns a webpack cache configuration object:

```typescript
{
  type: 'filesystem',
  cacheDirectory: string,
  buildDependencies: Record<string, string[]>,
  name: string,
  version?: string
}
```

## Performance Benefits

Enabling filesystem cache can significantly improve build times:

- **Cold start**: Normal build time (no cache)
- **Warm restart**: 50-90% faster (with cache)
- **Hot reload**: Minimal impact (only changed modules rebuilt)

Example from a real project:
- Cold start: 4.5s
- Warm restart: 2.1s (2x faster!)
- Cache hit rate: 99.97%

## How It Works

Webpack 5's filesystem cache stores compiled modules on disk. When you restart your build:

1. Webpack checks if cached modules are still valid
2. Valid modules are restored from disk (cache hit)
3. Invalid or new modules are rebuilt (cache miss)
4. Cache is updated with new module data

The `buildDependencies` option tells webpack which files should invalidate the entire cache when they change (e.g., webpack config, package.json).

## Troubleshooting

### Cache not working?

Check if you're using custom webpack plugins that create non-serializable dependencies. For Electrode users, make sure you're using `@xarc/webpack` version with SubApp serialization support.

### Cache too large?

The cache directory can grow over time. You can safely delete it:

```bash
rm -rf node_modules/.cache/webpack
```

### Want to force rebuild?

Set a different cache version or delete the cache directory.

## Compatibility

- **Webpack**: 5.x
- **Node**: >= 14

## Related Packages

- **[@xarc/webpack-metrics-plugin](https://www.npmjs.com/package/@xarc/webpack-metrics-plugin)**: Track cache performance and other build metrics

## License

Apache-2.0
