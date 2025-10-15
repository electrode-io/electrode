<!-- 98a5b983-8303-4326-aba1-2958bc993e27 83a581f5-294d-4347-936f-4c7b8e83613b -->
# Vite Integration MVP Plan

## Goals

- Greenfield apps: Simple, modern API with minimal boilerplate
- Leverage native Vite capabilities (no reinventing the wheel)
- Provide clear value-adds over plain Vite
- Module Federation for team independence
- Keep webpack path stable for existing apps

## Core Value Proposition

### What Xarc Adds to Vite

1. **Zero-config SSR** - Complex SSR setup → one config flag
2. **Isomorphic Asset Loading** - Automatic CSS/asset injection during SSR
3. **Production Readiness** - CDN mapping, security headers, error handling
4. **Feature Composition** - Plug in Redux, Router, etc. with standardized patterns
5. **Module Federation** - Team independence without SubApp complexity

## Phase 1: Core Vite Package (Week 1-2)

### Why This Phase?

**Developer Pain Points:**

- Plain Vite requires boilerplate for SSR setup (80+ lines)
- Developers must learn Vite's SSR API, manifest handling, and server integration
- No standardized way to configure production features (CDN, security headers)

**What We Provide:**

- Zero-config SSR: One flag (`ssr: true`) instead of 80 lines of setup
- Smart defaults: Production-ready configuration out of the box
- Familiar API: Similar to Next.js/Remix but with more flexibility

**Impact:**

- Time to setup: 1 hour → 5 minutes
- Lines of code: 150+ → 30
- Complexity: High → Low

### Enhance `packages/xarc-vite/`

**1.1 Project Structure**

```
packages/xarc-vite/
  src/
    config/
      create-config.ts       # Smart config generator
      defaults.ts            # Opinionated defaults
    dev/
      dev-server.ts          # Dev server setup
      middleware.ts          # Express/Fastify middleware
    build/
      ssr-build.ts           # Existing - enhance
      client-build.ts        # Client bundle
      manifest.ts            # Asset manifest handling
    plugins/
      asset-tracker.ts       # Track assets for SSR
      module-federation.ts   # Module Federation setup
    runtime/
      asset-loader.ts        # Runtime asset resolution
    index.ts                 # Main exports
  package.json
  README.md
```

**1.2 Simple Configuration API**

```typescript
// xarc.config.ts (NEW file pattern)
import { defineConfig } from '@xarc/vite';

export default defineConfig({
  // Standard Vite config (pass-through)
  vite: {
    // Any Vite option works
  },
  
  // Xarc enhancements
  ssr: true,                    // Enable SSR
  streaming: true,              // React 18 streaming
  
  // Feature plugins (existing packages work!)
  features: [
    '@xarc/react-redux',
    '@xarc/react-router'
  ],
  
  // Module Federation (optional)
  moduleFederation: {
    name: 'myApp',
    exposes: {
      './Header': './src/components/Header'
    },
    remotes: {
      auth: 'auth@http://localhost:3001/remoteEntry.js'
    }
  },
  
  // Production settings
  cdn: {
    mapping: './cdn-mappings.json'
  }
});
```

**1.3 Key Files to Create**

**File: `packages/xarc-vite/src/config/create-config.ts`**

```typescript
import { mergeConfig, InlineConfig } from 'vite';
import { getViteDefaults } from './defaults';
import { assetTrackerPlugin } from '../plugins/asset-tracker';
import { moduleFederationPlugin } from '../plugins/module-federation';

export interface XarcViteConfig {
  vite?: InlineConfig;
  ssr?: boolean;
  streaming?: boolean;
  features?: string[];
  moduleFederation?: ModuleFederationOptions;
  cdn?: CDNOptions;
}

export function defineConfig(config: XarcViteConfig): InlineConfig {
  const defaults = getViteDefaults(config);
  
  const plugins = [
    ...(config.vite?.plugins || []),
    assetTrackerPlugin(),
  ];
  
  if (config.moduleFederation) {
    plugins.push(moduleFederationPlugin(config.moduleFederation));
  }
  
  const viteConfig: InlineConfig = {
    ...defaults,
    ...config.vite,
    plugins
  };
  
  return viteConfig;
}
```

**File: `packages/xarc-vite/src/plugins/asset-tracker.ts`**

```typescript
import { Plugin } from 'vite';

// Track CSS/assets used during SSR for automatic injection
export function assetTrackerPlugin(): Plugin {
  const assetsMap = new Map();
  
  return {
    name: 'xarc-asset-tracker',
    
    // During SSR, track which assets are imported
    transform(code, id) {
      if (id.endsWith('.css')) {
        // Track CSS imports
      }
      return null;
    },
    
    // Generate manifest for SSR
    generateBundle(options, bundle) {
      // Create asset manifest similar to isomorphic-loader
    }
  };
}
```

**File: `packages/xarc-vite/src/dev/dev-server.ts`**

```typescript
import { createServer } from 'vite';
import { defineConfig } from '../config/create-config';

export async function createXarcDevServer(config: XarcViteConfig) {
  const viteConfig = defineConfig(config);
  
  const server = await createServer({
    ...viteConfig,
    server: {
      middlewareMode: true,
      hmr: true
    }
  });
  
  return {
    vite: server,
    middleware: server.middlewares
  };
}
```

## Phase 2: Bundler-Agnostic Asset Loading (Week 3)

### Create `packages/xarc-asset-loader/`

**2.1 The Problem It Solves**

During SSR, React components import CSS and assets:

```tsx
import './Button.css';
import logo from './logo.png';

function Button() {
  return <button className="btn"><img src={logo} /></button>
}
```

The server needs to know which CSS files to inject into `<head>` and which JS bundles to load. This requires:

1. **Manifest Reading**: Parse build output to find all assets for an entry point
2. **Dependency Resolution**: Follow the import chain (app.js → Button.js → Button.css)
3. **URL Resolution**: Convert file paths to URLs (with CDN support)
4. **Critical Asset Detection**: Identify which assets are needed immediately

**What we're abstracting:**

- Reading different manifest formats (webpack vs Vite)
- Resolving asset dependencies
- CDN URL mapping
- Unified API for SSR handlers

**What we're NOT doing:**

- No require() hooks (Vite doesn't need them)
- No asset interception at runtime
- No complex transforms

**2.2 Manifest Formats**

**Webpack's `isomorphic-assets.json`:**

```json
{
  "marked": {},
  "chunks": {
    "app": {
      "js": ["app.bundle.js"],
      "css": ["app.css"]
    }
  },
  "assets": {
    "logo.png": "/assets/logo.abc123.png"
  }
}
```

**Vite's `manifest.json`:**

```json
{
  "src/app.tsx": {
    "file": "assets/app.abc123.js",
    "src": "src/app.tsx",
    "isEntry": true,
    "css": ["assets/app.xyz456.css"],
    "imports": ["_vendor.def789.js"]
  },
  "_vendor.def789.js": {
    "file": "assets/vendor.def789.js"
  }
}
```

**2.3 Structure**

```
packages/xarc-asset-loader/
  src/
    interface.ts           # Base interface
    webpack-loader.ts      # Reads isomorphic-assets.json
    vite-loader.ts         # Reads Vite manifest.json
    cdn-mapper.ts          # CDN URL mapping logic
    index.ts
  package.json
  README.md
```

**2.4 Detailed Implementation**

**File: `packages/xarc-asset-loader/src/interface.ts`**

````typescript
export interface AssetInfo {
  type: 'css' | 'js' | 'image' | 'font' | 'other';
  path: string;        // Source path: 'src/app.tsx'
  url: string;         // Public URL: '/assets/app.abc123.js'
  size?: number;       // File size in bytes
  critical?: boolean;  // Should be in initial HTML?
}

export interface AssetManifest {
  // Critical CSS to inject in <head>
  css: string[];
  
  // JavaScript bundles to load
  js: string[];
  
  // Assets to preload with <link rel="preload">
  preload: string[];
  
  // All assets (for debugging/logging)
  all: AssetInfo[];
}

export interface CDNMapping {
  [localPath: string]: string;  // '/assets/app.js' -> 'https://cdn.example.com/v1/app.js'
}

export interface AssetLoader {
  name: string;
  
  /**
   * Get all assets needed for an entry point
   * 
   * @param entrypoint - Entry name like 'app' or 'src/app.tsx'
   * @returns Manifest with CSS, JS, and preload links
   * 
   * Example:
   * ```
   * const assets = loader.getAssets('app');
   * // Returns: { 
   * //   css: ['/assets/app.css'], 
   * //   js: ['/assets/runtime.js', '/assets/vendor.js', '/assets/app.js'],
   * //   preload: ['/assets/vendor.js']
   * // }
   * ```
   */
  getAssets(entrypoint: string): AssetManifest;
  
  /**
   * Resolve a local asset path to public URL
   * Applies CDN mapping if configured
   * 
   * @param localPath - Local path like '/assets/app.js'
   * @returns Public URL, possibly CDN URL
   * 
   * Example:
   * ```
   * loader.resolveUrl('/assets/app.js')
   * // Dev: '/assets/app.js'
   * // Prod with CDN: 'https://cdn.example.com/v1/assets/app.js'
   * ```
   */
  resolveUrl(localPath: string): string;
  
  /**
   * Set CDN mapping for production
   * 
   * @param mapping - Map of local paths to CDN URLs
   */
  setCDNMapping(mapping: CDNMapping): void;
  
  /**
   * Check if manifest is loaded and ready
   */
  isReady(): boolean;
}
````

**File: `packages/xarc-asset-loader/src/vite-loader.ts`**

```typescript
import * as fs from 'fs';
import * as path from 'path';
import { AssetLoader, AssetManifest, CDNMapping, AssetInfo } from './interface';

export class ViteAssetLoader implements AssetLoader {
  name = 'vite';
  private manifest: Record<string, any> = {};
  private cdnMapping: CDNMapping = {};
  private manifestPath: string;
  
  constructor(options: { manifestPath?: string; cdnMapping?: CDNMapping } = {}) {
    this.manifestPath = options.manifestPath || 
                        path.resolve(process.cwd(), 'dist/client/.vite/manifest.json');
    
    if (options.cdnMapping) {
      this.cdnMapping = options.cdnMapping;
    }
    
    this.loadManifest();
  }
  
  private loadManifest(): void {
    try {
      const content = fs.readFileSync(this.manifestPath, 'utf-8');
      this.manifest = JSON.parse(content);
    } catch (error) {
      console.warn(`[ViteAssetLoader] Could not load manifest: ${error.message}`);
      this.manifest = {};
    }
  }
  
  getAssets(entrypoint: string): AssetManifest {
    const entry = this.findEntry(entrypoint);
    
    if (!entry) {
      console.warn(`[ViteAssetLoader] Entry "${entrypoint}" not found in manifest`);
      return { css: [], js: [], preload: [], all: [] };
    }
    
    const assets: AssetInfo[] = [];
    const css: string[] = [];
    const js: string[] = [];
    const preload: string[] = [];
    
    // Collect all imported chunks (vendor, shared, etc.)
    const visited = new Set<string>();
    const collectImports = (key: string) => {
      if (visited.has(key)) return;
      visited.add(key);
      
      const chunk = this.manifest[key];
      if (!chunk) return;
      
      // Add imported chunks first (vendors, shared modules)
      if (chunk.imports) {
        chunk.imports.forEach(importKey => collectImports(importKey));
      }
      
      // Add this chunk's JS
      if (chunk.file) {
        const url = this.resolveUrl(`/${chunk.file}`);
        js.push(url);
        assets.push({ type: 'js', path: key, url });
        
        // Vendor chunks should be preloaded
        if (key.includes('vendor') || key.startsWith('_')) {
          preload.push(url);
        }
      }
      
      // Add this chunk's CSS
      if (chunk.css) {
        chunk.css.forEach(cssFile => {
          const url = this.resolveUrl(`/${cssFile}`);
          css.push(url);
          assets.push({ type: 'css', path: cssFile, url, critical: true });
        });
      }
      
      // Add dynamically imported chunks
      if (chunk.dynamicImports) {
        chunk.dynamicImports.forEach(dynKey => collectImports(dynKey));
      }
    };
    
    // Start from entry point
    collectImports(entry.key);
    
    return { css, js, preload, all: assets };
  }
  
  resolveUrl(localPath: string): string {
    // Check CDN mapping first
    const basename = path.basename(localPath);
    if (this.cdnMapping[basename]) {
      return this.cdnMapping[basename];
    }
    
    // Return local path (with leading /)
    return localPath.startsWith('/') ? localPath : `/${localPath}`;
  }
  
  setCDNMapping(mapping: CDNMapping): void {
    this.cdnMapping = mapping;
  }
  
  isReady(): boolean {
    return Object.keys(this.manifest).length > 0;
  }
  
  private findEntry(entrypoint: string): { key: string; entry: any } | null {
    // Try exact match first
    if (this.manifest[entrypoint]) {
      return { key: entrypoint, entry: this.manifest[entrypoint] };
    }
    
    // Try with common extensions
    const variations = [
      entrypoint,
      `src/${entrypoint}`,
      `src/${entrypoint}.tsx`,
      `src/${entrypoint}.ts`,
      `src/${entrypoint}.jsx`,
      `src/${entrypoint}.js`
    ];
    
    for (const variant of variations) {
      if (this.manifest[variant]) {
        return { key: variant, entry: this.manifest[variant] };
      }
    }
    
    // Find entry with isEntry: true
    const entries = Object.entries(this.manifest)
      .filter(([_, val]) => val.isEntry)
      .map(([key, val]) => ({ key, entry: val }));
    
    if (entries.length === 1) {
      return entries[0];
    }
    
    return null;
  }
}
```

**File: `packages/xarc-asset-loader/src/webpack-loader.ts`**

```typescript
import { AssetLoader, AssetManifest, CDNMapping } from './interface';

export class WebpackAssetLoader implements AssetLoader {
  name = 'webpack';
  private isomorphicAssets: any = {};
  private cdnMapping: CDNMapping = {};
  
  constructor(options: { cdnMapping?: CDNMapping } = {}) {
    if (options.cdnMapping) {
      this.cdnMapping = options.cdnMapping;
    }
    
    // Load isomorphic-loader assets (already loaded by @xarc/app)
    try {
      const { getXRequire } = require('@xarc/app');
      const xreq = getXRequire();
      if (xreq?.config) {
        this.isomorphicAssets = xreq.config;
      }
    } catch (error) {
      console.warn('[WebpackAssetLoader] Could not access isomorphic-loader');
    }
  }
  
  getAssets(entrypoint: string): AssetManifest {
    const chunks = this.isomorphicAssets.chunks || {};
    const chunk = chunks[entrypoint];
    
    if (!chunk) {
      return { css: [], js: [], preload: [], all: [] };
    }
    
    const css = (chunk.css || []).map(c => this.resolveUrl(c));
    const js = (chunk.js || []).map(j => this.resolveUrl(j));
    
    return { 
      css, 
      js, 
      preload: [],
      all: [
        ...css.map(url => ({ type: 'css' as const, path: url, url })),
        ...js.map(url => ({ type: 'js' as const, path: url, url }))
      ]
    };
  }
  
  resolveUrl(localPath: string): string {
    const basename = localPath.split('/').pop();
    if (this.cdnMapping[basename]) {
      return this.cdnMapping[basename];
    }
    return localPath;
  }
  
  setCDNMapping(mapping: CDNMapping): void {
    this.cdnMapping = mapping;
  }
  
  isReady(): boolean {
    return Object.keys(this.isomorphicAssets).length > 0;
  }
}
```

**File: `packages/xarc-asset-loader/src/cdn-mapper.ts`**

````typescript
import * as fs from 'fs';
import { CDNMapping } from './interface';

/**
 * Load CDN mapping from a JSON file
 * 
 * File format:
 * ```json
 * {
 *   "app.abc123.js": "https://cdn.example.com/v1/app.abc123.js",
 *   "vendor.def456.js": "https://cdn.example.com/v1/vendor.def456.js"
 * }
 * ```
 */
export function loadCDNMapping(filePath: string): CDNMapping {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn(`[CDNMapper] Could not load mapping from ${filePath}: ${error.message}`);
    return {};
  }
}

/**
 * Generate CDN URLs based on a pattern
 * 
 * @param pattern - URL pattern like 'https://cdn.example.com/v1/${file}'
 * @param files - Array of local files
 */
export function generateCDNMapping(pattern: string, files: string[]): CDNMapping {
  const mapping: CDNMapping = {};
  
  files.forEach(file => {
    const basename = file.split('/').pop();
    mapping[basename] = pattern.replace('${file}', basename);
  });
  
  return mapping;
}
````

**2.5 Usage Examples**

**Example 1: In SSR Handler**

```typescript
import { ViteAssetLoader } from '@xarc/asset-loader';

const loader = new ViteAssetLoader({
  cdnMapping: {
    'app.abc123.js': 'https://cdn.example.com/v1/app.abc123.js'
  }
});

// During SSR request
const assets = loader.getAssets('app');

// Generate HTML
const html = `
<!DOCTYPE html>
<html>
<head>
  ${assets.css.map(url => `<link rel="stylesheet" href="${url}">`).join('\n')}
  ${assets.preload.map(url => `<link rel="preload" href="${url}" as="script">`).join('\n')}
</head>
<body>
  <div id="root">${appHTML}</div>
  ${assets.js.map(url => `<script type="module" src="${url}"></script>`).join('\n')}
</body>
</html>
`;
```

**Example 2: Loading CDN Mapping from File**

```typescript
import { ViteAssetLoader, loadCDNMapping } from '@xarc/asset-loader';

const cdnMapping = loadCDNMapping('./dist/cdn-mappings.json');
const loader = new ViteAssetLoader({ cdnMapping });
```

**2.4 Update `@xarc/app`**

**File: `packages/xarc-app/src/asset-loader.ts` (NEW)**

```typescript
import { AssetLoader } from '@xarc/asset-loader';
import { detectBundler } from './detect-bundler';

let globalLoader: AssetLoader;

export function initAssetLoader(): AssetLoader {
  if (globalLoader) return globalLoader;
  
  const bundler = detectBundler(); // 'webpack' or 'vite'
  
  if (bundler === 'webpack') {
    const { WebpackAssetLoader } = require('@xarc/asset-loader/webpack');
    globalLoader = new WebpackAssetLoader();
  } else {
    const { ViteAssetLoader } = require('@xarc/asset-loader/vite');
    globalLoader = new ViteAssetLoader();
  }
  
  return globalLoader;
}

export function getAssetLoader(): AssetLoader {
  return globalLoader || initAssetLoader();
}
```

**File: `packages/xarc-app/src/detect-bundler.ts` (NEW)**

```typescript
export function detectBundler(): 'webpack' | 'vite' {
  // Check for Vite manifest
  if (require.resolve.paths('./dist/client/.vite/manifest.json')) {
    return 'vite';
  }
  
  // Check for webpack's isomorphic-assets.json
  if (require.resolve.paths('./isomorphic-assets.json')) {
    return 'webpack';
  }
  
  // Fallback to env var
  return process.env.XARC_BUNDLER === 'vite' ? 'vite' : 'webpack';
}
```

## Phase 3: HTML Rendering & Server Integration (Week 4)

### 3.1 Multi-Server Support (Express, Fastify, Hapi, Custom)

**File: `packages/xarc-vite/src/server/adapters/express.ts` (NEW)**

```typescript
import { Request, Response, NextFunction } from 'express';
import { XarcSSRHandler } from '../ssr-handler';

export function expressAdapter(handler: XarcSSRHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await handler.render({
        url: req.url,
        headers: req.headers,
        method: req.method
      });
      
      if (result.redirect) {
        return res.redirect(result.redirect.status, result.redirect.url);
      }
      
      if (result.stream) {
        res.setHeader('Content-Type', 'text/html');
        result.stream.pipe(res);
      } else {
        res.send(result.html);
      }
    } catch (error) {
      next(error);
    }
  };
}
```

**File: `packages/xarc-vite/src/server/adapters/fastify.ts` (NEW)**

```typescript
import { FastifyRequest, FastifyReply } from 'fastify';
import { XarcSSRHandler } from '../ssr-handler';

export function fastifyAdapter(handler: XarcSSRHandler) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const result = await handler.render({
      url: req.url,
      headers: req.headers,
      method: req.method
    });
    
    if (result.redirect) {
      return reply.redirect(result.redirect.status, result.redirect.url);
    }
    
    if (result.stream) {
      reply.type('text/html');
      return reply.send(result.stream);
    }
    
    return reply.type('text/html').send(result.html);
  };
}
```

**Usage Example:**

```typescript
// Express
import express from 'express';
import { createSSRHandler, expressAdapter } from '@xarc/vite/server';

const app = express();
const ssr = createSSRHandler({ /* options */ });
app.get('*', expressAdapter(ssr));

// Fastify
import Fastify from 'fastify';
import { createSSRHandler, fastifyAdapter } from '@xarc/vite/server';

const fastify = Fastify();
const ssr = createSSRHandler({ /* options */ });
fastify.get('*', fastifyAdapter(ssr));
```

### 3.2 HTML Rendering Modes

**File: `packages/xarc-vite/src/server/ssr-handler.ts` (NEW)**

```typescript
import { renderToString } from 'react-dom/server';
import { renderToPipeableStream } from 'react-dom/server';
import { getAssetLoader } from '@xarc/app';
import { Readable } from 'stream';

export interface SSRHandlerOptions {
  App: React.ComponentType;
  viteConfig?: string;
  mode?: 'string' | 'stream' | 'ssg';  // Rendering mode
  providers?: React.ComponentType[];    // Redux, Router, etc.
  onError?: (error: Error) => void;
  template?: (params: TemplateParams) => string;
}

export interface RenderResult {
  html?: string;
  stream?: Readable;
  redirect?: { url: string; status: number };
  statusCode?: number;
}

export class XarcSSRHandler {
  constructor(private options: SSRHandlerOptions) {}
  
  async render(request: RenderRequest): Promise<RenderResult> {
    const mode = this.options.mode || 'stream'; // Default to streaming
    
    if (mode === 'string') {
      return this.renderToString(request);
    } else if (mode === 'stream') {
      return this.renderToStream(request);
    } else if (mode === 'ssg') {
      return this.renderStatic(request);
    }
  }
  
  // React 18 Streaming SSR
  private async renderToStream(request: RenderRequest): Promise<RenderResult> {
    const { App, providers } = this.options;
    const assetLoader = getAssetLoader();
    const assets = assetLoader.getAssets('app');
    
    // Wrap app with providers
    const WrappedApp = this.wrapWithProviders(App, providers);
    
    return new Promise((resolve, reject) => {
      let didError = false;
      
      const { pipe, abort } = renderToPipeableStream(
        <WrappedApp />,
        {
          bootstrapScripts: assets.js,
          bootstrapScriptContent: this.getBootstrapScript(),
          onShellReady() {
            // Start streaming the shell
            const stream = new PassThrough();
            stream.write(generateHTMLHeader(assets.css));
            pipe(stream);
            stream.write(generateHTMLFooter());
            
            resolve({ stream, statusCode: didError ? 500 : 200 });
          },
          onShellError(error) {
            reject(error);
          },
          onError(error) {
            didError = true;
            if (this.options.onError) {
              this.options.onError(error);
            }
          }
        }
      );
      
      // Abort after timeout
      setTimeout(() => abort(), 10000);
    });
  }
  
  // Traditional SSR (no streaming)
  private async renderToString(request: RenderRequest): Promise<RenderResult> {
    const { App, providers } = this.options;
    const assetLoader = getAssetLoader();
    const assets = assetLoader.getAssets('app');
    
    const WrappedApp = this.wrapWithProviders(App, providers);
    const html = renderToString(<WrappedApp />);
    
    const fullHtml = this.generateHTML({
      appHtml: html,
      css: assets.css,
      js: assets.js
    });
    
    return { html: fullHtml, statusCode: 200 };
  }
  
  // Static Site Generation
  private async renderStatic(request: RenderRequest): Promise<RenderResult> {
    // Similar to renderToString but with data fetching
    // Used for build-time static generation
  }
  
  private wrapWithProviders(App: React.ComponentType, providers?: React.ComponentType[]) {
    if (!providers || providers.length === 0) return App;
    
    return providers.reduceRight(
      (Acc, Provider) => () => <Provider><Acc /></Provider>,
      App
    );
  }
}

export function createSSRHandler(options: SSRHandlerOptions): XarcSSRHandler {
  return new XarcSSRHandler(options);
}
```

### 3.3 State Management Integration

**File: `packages/xarc-vite/src/server/state-handlers.ts` (NEW)**

```typescript
// Redux SSR support
export function createReduxProvider(store: Store) {
  return ({ children }) => (
    <Provider store={store}>
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__PRELOADED_STATE__=${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}`
        }}
      />
    </Provider>
  );
}

// React Router SSR support
export function createRouterProvider(request: RenderRequest) {
  return ({ children }) => (
    <StaticRouter location={request.url}>
      {children}
    </StaticRouter>
  );
}
```

**Usage:**

```typescript
import { createSSRHandler } from '@xarc/vite/server';
import { createReduxProvider, createRouterProvider } from '@xarc/vite/server/state-handlers';
import { configureStore } from '@reduxjs/toolkit';

const ssr = createSSRHandler({
  App: MyApp,
  mode: 'stream', // or 'string' or 'ssg'
  providers: [
    createRouterProvider,
    createReduxProvider(configureStore({ /* config */ }))
  ]
});
```

## Phase 4: Module Federation (Week 5-6)

### Use Vite's Module Federation Plugin

**4.1 Integration**

**File: `packages/xarc-vite/src/plugins/module-federation.ts`**

```typescript
import federation from '@originjs/vite-plugin-federation';

export function moduleFederationPlugin(options: ModuleFederationOptions) {
  return federation({
    name: options.name,
    filename: 'remoteEntry.js',
    exposes: options.exposes,
    remotes: options.remotes,
    shared: {
      react: { singleton: true },
      'react-dom': { singleton: true },
      ...options.shared
    }
  });
}
```

**4.2 Usage Example**

```typescript
// Team A: Header service
// xarc.config.ts
export default defineConfig({
  moduleFederation: {
    name: 'header',
    exposes: {
      './Header': './src/Header'
    }
  }
});

// Team B: Main app
// xarc.config.ts
export default defineConfig({
  moduleFederation: {
    name: 'app',
    remotes: {
      header: 'header@http://localhost:3001/remoteEntry.js'
    }
  }
});

// src/app.tsx
const Header = lazy(() => import('header/Header'));
```

## Phase 5: Feature Package Compatibility (Week 7)

### Make existing feature packages work without SubApps

**5.1 Update Feature Packages**

**File: `packages/xarc-react-redux/src/index.ts` (MINOR UPDATE)**

```typescript
// Current: Only works with SubApps via wantFeatures
export function reduxFeature(options) { ... }

// ADD: Direct hook for simple apps
export function useRedux() {
  const store = React.useContext(ReduxContext);
  return store;
}

export function ReduxProvider({ children, store }) {
  return <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>;
}

// Keep existing SubApp integration for webpack apps
export { reduxFeature };
```

**5.2 Similar updates for:**

- `@xarc/react-router` - Add `useRouter()` hook
- `@xarc/react-query` - Add `useQuery()` hooks
- `@xarc/react-recoil` - Add direct hooks

## Phase 6: Documentation & Examples (Week 8)

**6.1 Create Examples**

```
examples/
  vite-simple-app/          # Minimal Vite app
  vite-ssr-app/             # SSR example
  vite-module-federation/   # Micro-frontend example
  webpack-subapp-legacy/    # Existing webpack pattern
```

**6.2 Migration Guide**

- Plain Vite → Xarc Vite (what you gain)
- Webpack SubApps → Vite Module Federation (future)

**6.3 Decision Tree**

```
New app?
├─ Need team independence? 
│  ├─ Yes → Vite + Module Federation
│  └─ No → Vite simple mode
└─ Existing webpack app? → Keep using webpack (no migration needed)
```

## Phase 7: Minor Breaking Changes (Week 7-8)

### Simplifications for Vite path only

**7.1 Rename Environment Variables**

```typescript
// OLD (webpack-specific)
process.env.WEBPACK_DEV
process.env.WEBPACK_DEV_CDN_PROTOCOL

// NEW (bundler-agnostic)
process.env.XARC_DEV_MODE
process.env.XARC_CDN_PROTOCOL
```

**File: `packages/xarc-index-page/src/utils.ts` (UPDATE)**

```typescript
// Before
const isDev = process.env.WEBPACK_DEV === "true";

// After  
const isDev = process.env.XARC_DEV_MODE === "true" || process.env.WEBPACK_DEV === "true";
```

**7.2 Simplified API**

Remove SubApp requirement from core rendering packages for Vite users.

## Testing Strategy

### Unit Tests

- Asset loader interface and implementations
- Vite config generation
- Plugin functionality

### Integration Tests

- Full SSR flow with Vite
- Asset injection during SSR
- Module Federation loading

### Example Apps

- Build and run all example apps
- Verify HMR works
- Check production builds

## Success Metrics

1. **Developer Experience**

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - New app setup: < 5 minutes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Lines of boilerplate: < 50 lines
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Time to first render: < 2 seconds

2. **Performance**

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Dev server start: < 1 second
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - HMR update: < 100ms
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Production build: < 30 seconds

3. **Adoption**

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Documentation clarity: Clear decision tree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Example apps: Cover 90% of use cases
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                - Migration path: Optional, not forced

## Rollout Plan

### Week 1-2: Core Foundation

- Enhance `@xarc/vite` package
- Create config API
- Dev server integration

### Week 3-4: Asset Loading

- Create `@xarc/asset-loader`
- Vite manifest integration
- Update `@xarc/app`

### Week 5-6: Advanced Features

- Module Federation
- Production optimizations
- CDN mapping

### Week 7-8: Polish

- Update feature packages
- Documentation
- Example apps
- Testing

## Files to Create/Modify

### New Packages

- `packages/xarc-asset-loader/` - Asset loading abstraction

### Enhance Existing

- `packages/xarc-vite/` - Add full dev/build support
- `packages/xarc-app/` - Add bundler detection
- `packages/xarc-index-page/` - Rename env vars (backward compatible)

### Minor Updates

- `packages/xarc-react-redux/` - Add direct hooks
- `packages/xarc-react-router/` - Add direct hooks
- `packages/xarc-react-query/` - Add direct hooks

### No Changes Needed

- `packages/xarc-render-context/` - Already bundler-agnostic
- `packages/xarc-jsx-renderer/` - Already bundler-agnostic
- `packages/xarc-tag-renderer/` - Already bundler-agnostic
- `packages/xarc-webpack/` - Keep stable for existing apps

## Risk Mitigation

1. **Compatibility Risk**: Keep webpack path unchanged
2. **Feature Parity**: Start with MVP, add features incrementally
3. **Learning Curve**: Provide clear examples and decision tree
4. **Migration Pressure**: Make it opt-in, not forced

## Next Steps After MVP

1. Performance optimizations
2. Additional Vite plugins
3. Advanced SSR features (islands, partial hydration)
4. Monitoring and observability integrations
5. Optional webpack → Vite migration guide (if needed)

### To-dos

- [ ] Enhance @xarc/vite package with config API, dev server, build tools, and plugins
- [ ] Create @xarc/asset-loader package with bundler-agnostic interface and implementations
- [ ] Update @xarc/app with bundler detection and asset loader integration
- [ ] Create simple app API without SubApp requirement (SSR handler, hooks)
- [ ] Integrate Vite Module Federation plugin for team independence
- [ ] Update feature packages (@xarc/react-redux, router, etc) with direct hooks
- [ ] Rename WEBPACK_DEV to XARC_DEV_MODE in @xarc/index-page (backward compatible)
- [ ] Create documentation, examples, and migration guides
- [ ] Write unit tests, integration tests, and validate example apps