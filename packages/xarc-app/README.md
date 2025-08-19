# @xarc/app - Electrode X Application Runtime Support

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

**@xarc/app** is the core runtime support library for Electrode X applications, providing essential infrastructure for building high-performance, universal React applications with server-side rendering (SSR) capabilities.

Originally developed for Walmart's large-scale eCommerce applications, this battle-tested library powers critical production systems and provides enterprise-grade reliability and performance.

## 🚀 Key Features

### Universal JavaScript Applications
- **Isomorphic/Universal Architecture**: Write once, run everywhere - your code works seamlessly on both client and server
- **Server-Side Rendering (SSR)**: Generate HTML on the server for improved SEO, faster initial page loads, and better user experience
- **Automatic Code Splitting**: Intelligent asset management with automatic detection of client/server code boundaries

### Advanced Asset Management
- **Isomorphic Asset Loading**: Seamlessly handle CSS, images, and other assets across server and client environments
- **CDN Integration**: Built-in support for mapping assets to CDN URLs for optimized delivery
- **Hot Module Replacement (HMR)**: Lightning-fast development with live code updates
- **Asset Bundling**: Intelligent bundling and optimization for production deployments

### Production-Ready Architecture
- **Environment-Aware**: Automatic detection and handling of development vs production environments
- **Flexible Source Directory Management**: Support for `src/` (development) and `lib/` (production) directory structures
- **SubApp Architecture**: Built for micro-frontend architectures with modular, independent components
- **TypeScript Support**: Full TypeScript integration for type-safe development

### Developer Experience
- **Zero Configuration**: Works out of the box with sensible defaults
- **Babel Integration**: Runtime transpilation support for modern JavaScript features
- **Error Handling**: Graceful error handling and recovery mechanisms
- **Comprehensive Logging**: Built-in logging system for debugging and monitoring

## 🏆 Why Choose @xarc/app?

### Battle-Tested at Scale
- Powers Walmart.com and other high-traffic applications
- Handles millions of requests per day in production
- Proven performance under enterprise-scale loads

### Superior Performance
- **Faster Time-to-Interactive**: SSR reduces initial page load times
- **SEO Optimized**: Server-rendered content is immediately available to search engines
- **Intelligent Caching**: Optimized asset loading and caching strategies
- **Bundle Optimization**: Advanced webpack configurations for minimal bundle sizes

### Modern Architecture
- **Micro-Frontend Ready**: Built for composable, scalable application architectures
- **Framework Agnostic**: While optimized for React, supports various UI frameworks
- **Cloud Native**: Designed for containerized, cloud-based deployments
- **Progressive Enhancement**: Graceful degradation for various client capabilities

### Enterprise Features
- **Security Best Practices**: Built-in security measures and safe asset handling
- **Monitoring Ready**: Integration points for application performance monitoring
- **Scalable Development**: Support for large development teams and codebases
- **Production Hardened**: Comprehensive error handling and recovery mechanisms

## 📦 Installation

```bash
npm install @xarc/app
# or
yarn add @xarc/app
```

For development features, also install:
```bash
npm install --save-dev @xarc/app-dev
```

## 🔧 Basic Usage(Recommended)
```javascript
import { loadRuntimeSupport } from '@xarc/app';
// Initialize application runtime
await loadRuntimeSupport({});
```
## Advance Usage
```javascript
import { loadRuntimeSupport } from '@xarc/app';
// Initialize application runtime
await loadRuntimeSupport({
  isomorphicExtendRequire: true,
  babelRegister: true, // Enable runtime transpilation in development
  awaitReady: true     // Wait for assets to be ready before proceeding
});
```

### `loadRuntimeSupport` Options

The `loadRuntimeSupport` function accepts an optional configuration object with the following properties:

#### `babelRegister` (Optional)
**Type:** `boolean | object`  
**Default:** `undefined` (disabled)  
**Purpose:** Enables runtime transpilation using `@babel/register`

```javascript
await loadRuntimeSupport({
  babelRegister: true, // Simple boolean to enable with defaults
  // OR with custom options:
  babelRegister: {
    extensions: [".es6", ".es", ".jsx", ".js", ".ts", ".tsx"],
    // ... other @babel/register options
  }
});
```

**Details:**
- **Optional** - Only needed in development when you want runtime transpilation
- When `true`, uses default extensions: `[".es6", ".es", ".jsx", ".js"]`
- When an object, passes those options directly to `@babel/register`
- Requires `@xarc/app-dev` to be installed in `devDependencies`

#### `isomorphicExtendRequire` (Optional)
**Type:** `boolean`  
**Default:** `true`  
**Purpose:** Controls whether to load Node.js require hooks for handling isomorphic assets

```javascript
await loadRuntimeSupport({
  isomorphicExtendRequire: false // Disable isomorphic asset loading
});
```

**Details:**
- **Optional** - Defaults to `true` if not specified
- When `true`: Enables importing CSS, images, and other assets in Node.js
- When `false`: Disables asset loading hooks (may cause syntax errors for asset imports)
- **Critical:** If disabled, any `import "style.css"` or `import "image.png"` will result in syntax or module not found errors in Node.js

#### `isomorphicCdnOptions` (Optional)
**Type:** `object`  
**Default:** `undefined`  
**Purpose:** Configures CDN asset mapping for production deployments

```javascript
await loadRuntimeSupport({
  isomorphicCdnOptions: {
    prodOnly: true,           // Only apply in production
    mapping: customMapping,   // Custom asset mappings
    extendRequire: customInstance // Custom require instance
  }
});
```

**CDN Options:**
- `prodOnly?: boolean` - Only setup CDN mapping when `NODE_ENV === "production"`
- `mapping?: Record<string, unknown>` - Custom asset mappings (auto-loaded from `dist/cdn-mappings.json` or `config/assets.json` if not provided)
- `extendRequire?: any` - Custom isomorphic-loader extend require instance

#### `awaitReady` (Optional)
**Type:** `boolean`  
**Default:** `false`  
**Purpose:** Whether to wait for all assets to be ready before resolving the promise

```javascript
// Method 1: Wait for everything to be ready
await loadRuntimeSupport({
  awaitReady: true
});

// Method 2: Recommended pattern for development
const loadSupport = loadRuntimeSupport({ awaitReady: true });
await startServer(); // Start your server first
await loadSupport;   // Then wait for assets to be ready
```

**Details:**
- **Optional** - Defaults to `false`
- In **production mode**: Times out after some time if assets aren't ready
- In **development mode**: Continues waiting, logging progress every 5 seconds
- **Important:** In dev mode, the promise resolution depends on the app server starting and loading the dev plugin

### Common Usage Patterns

#### Simple Production Setup
```javascript
// Minimal setup - all defaults are production-ready
await loadRuntimeSupport();
```

#### Development with Runtime Transpilation
```javascript
await loadRuntimeSupport({
  babelRegister: true  // Enable runtime transpilation
});
```

#### Production with CDN Asset Mapping
```javascript
await loadRuntimeSupport({
  isomorphicCdnOptions: {
    prodOnly: true  // Only map assets in production
  }
});
```

#### Complete Development Setup
```javascript
await loadRuntimeSupport({
  babelRegister: true,
  awaitReady: true,
  isomorphicCdnOptions: {
    prodOnly: true
  }
});
```

#### Asset-Free Environment
```javascript
// If you don't import CSS/images in Node.js
await loadRuntimeSupport({
  isomorphicExtendRequire: false
});
```

### Options Summary

| Option | Required | Default | Purpose |
|--------|----------|---------|---------|
| `babelRegister` | ❌ Optional | `undefined` | Runtime transpilation |
| `isomorphicExtendRequire` | ❌ Optional | `true` | Asset loading hooks |
| `isomorphicCdnOptions` | ❌ Optional | `undefined` | CDN asset mapping |
| `awaitReady` | ❌ Optional | `false` | Wait for assets ready |

**Key Points:**
- All options are optional - the function works with no parameters
- Default behavior is production-ready with sensible defaults
- Development features require `@xarc/app-dev` package
- Asset handling is enabled by default for isomorphic applications


## 📄 License

Copyright (c) 2016-present, Walmart

Licensed under the [Apache License, Version 2.0](../../LICENSE)

<https://www.electrode.io/electrode/>

---

[npm-image]: https://badge.fury.io/js/@xarc/app.svg
[npm-url]: https://npmjs.org/package/@xarc/app
[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/@xarc/app
[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/@xarc/app
[daviddm-dev-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/@xarc/app
[daviddm-dev-url]: https://david-dm.org/electrode-io/electrode?path=packages/@xarc/app?type-dev
[npm-downloads-image]: https://img.shields.io/npm/dm/@xarc/app.svg
[npm-downloads-url]: https://www.npmjs.com/package/@xarc/app
[generator-electrode]: https://www.npmjs.com/package/generator-electrode
[electrode getting started]: http://www.electrode.io/docs/get_started.html
