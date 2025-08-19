# @xarc/app-dev

[![NPM version][npm-image]][npm-url][![npm downloads][npm-downloads-image]][npm-downloads-url]


## Features

- 🚀 **Webpack Dev Server Integration** - Hot module replacement and live reloading
- ⚡ **Build System** - Complete build pipeline with webpack, Babel, and TypeScript
- 🧪 **Testing Tools** - Jest, Mocha, Karma, and ESLint configurations
- 📦 **Task Runner** - Powerful task system with `xrun` for development workflows
- 🔄 **Hot Reload** - Advanced hot module replacement for React components and subapps
- 📝 **Configuration Presets** - Pre-configured Babel, ESLint, and webpack setups
- 🌐 **Development Proxy** - Built-in reverse proxy for local development

## Installation

```bash
# Install as a development dependency
npm install --save-dev @xarc/app-dev

# Usually installed alongside @xarc/app
npm install @xarc/app
npm install --save-dev @xarc/app-dev
```

## Quick Start

### Basic Setup

1. **Create a task runner file** (`xrun-tasks.ts`):

```typescript
const { loadDevTasks, xrun } = require("@xarc/app-dev");

// Configure development environment
xrun.updateEnv({
  {
    HOST: "localhost",
    PORT: 443,
    /*
     * Set app's node server to listen at port 3100 so the proxy can listen at 3000
     * and forward request to the app.
     */
    APP_SERVER_PORT: 3100,
  },
  {
    // do not override any env flag already set in process.env
    override: true,
  },
})

// Load all development tasks
loadDevTasks(xrun, {
  // options to customize features
  webpackOptions: {
    // enable CSS module for files other than `.mod.css`
    cssModuleSupport: "byModExt",
  },
});
```

2. **Add package.json scripts**:

```json
{
  "scripts": {
    "dev": "xrun dev",
    "build": "xrun build",
    "test": "xrun test",
    "lint": "xrun lint"
  }
}
```

3. **Start development server**:

```bash
npm run dev
```

## Why Choose @xarc/app-dev Over Create React App?

As an experienced developer, here are the key advantages of @xarc/app-dev:

### 🏗️ **Enterprise-Scale Architecture**
- **Micro-Frontend Support**: Built-in SubApp architecture for modular, scalable applications
- **Team-Friendly**: Designed for large development teams with independent component development

### ⚡ **Superior Development Experience**
- **Advanced Task System**: Comprehensive `xrun` task runner with granular workflow control
- **No Ejection Required**: Highly configurable without breaking update paths

### 🚀 **Production-Ready Features**
- **Built-in SSR**: Native server-side rendering with automatic isomorphic asset loading
- **Advanced HMR**: Hot module replacement for React components, Redux reducers, and SubApps
- **CDN Integration**: Seamless asset optimization and delivery

### 🔧 **Flexible Configuration**
- **Multiple Testing Frameworks**: Support for Jest, Mocha
- **TypeScript-First**: Comprehensive TypeScript support and type definitions
- **Preset System**: Ready-to-use configurations for Babel, ESLint, and webpack

## Complete Usage Examples

### Example 1: Basic React Application Setup

#### 1. Task Runner Configuration (`xrun-tasks.ts`)
```typescript
import { loadXarcDevTasks, xrun } from "@xarc/app-dev/lib/dev-tasks";

// Configure development environment
xrun.updateEnv({
  HOST: "localhost",
  PORT: 3000,
  APP_SERVER_PORT: 3100,
  WEBPACK_DEV_MIDDLEWARE: true,
  NODE_ENV: process.env.NODE_ENV || "development"
}, { override: false });

// Load all development tasks
loadXarcDevTasks(xrun, {
  // Custom webpack configuration
  // options to customize features
  webpackOptions: {
    // enable CSS module for files other than `.mod.css`
    cssModuleSupport: "byModExt",
  }
});
```

#### 2. SubApp Implementation (`src/subapps/home/index.tsx`)
```tsx
import { React, ReactSubApp } from "@xarc/react";
import { reduxFeature } from "@xarc/react-redux";

interface HomeProps {
  title?: string;
  message?: string;
}

const HomeComponent: React.FC<HomeProps> = ({ 
  title = "Welcome", 
  message = "Hello from @xarc/app-dev!" 
}) => {
  return (
    <div className="home-container">
      <h1>{title}</h1>
      <p>{message}</p>
      <button onClick={() => console.log("SubApp working!")}>
        Click me!
      </button>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: HomeComponent,
  wantFeatures: [
    reduxFeature({ 
      React, 
      shareStore: true 
    })
  ]
};
```

#### 3. Application Entry (`src/client/entry.ts`)
```typescript
import { declareSubApp } from "@xarc/react";

// Declare your SubApps
export const Home = declareSubApp({
  name: "Home",
  getModule: () => import("../subapps/home")
});
```
### Example 2: Custom Webpack Configuration

The @xarc/app-dev system uses a powerful webpack partials system that allows you to override specific parts of the webpack configuration without replacing the entire config.

#### Understanding Webpack Partials

Webpack partials are modular configuration pieces that handle specific aspects of the webpack build:

- **baseOptions** - Base webpack configuration options
- **entry** - Entry point configuration  
- **output** - Output configuration
- **resolve** - Module resolution settings
- **babel** - Babel loader configuration
- **extractStyle** - CSS extraction settings
- **fonts** - Font file handling
- **images** - Image processing
- **dev** - Development server settings
- **prodMode/devMode** - Environment-specific settings


```javascript
// webpack.config.js
const { xarcWebpack, partials, profiles } = require("@xarc/app-dev");

// Get the environment and options
const env = xarcWebpack.getEnvProfile();
const options = xarcWebpack.getComposeOptions();

// Use preset partials with custom overrides
const { composer } = xarcWebpack.initWebpackConfigComposer(options);

// Override specific partials from the preset
composer.getPartial("_resolve").setOverride((config) => ({
  ...config,
  alias: {
    ...config.alias,
    '@': path.resolve(process.cwd(), 'src'),
    '@components': path.resolve(process.cwd(), 'src/components'),
    '@utils': path.resolve(process.cwd(), 'src/utils'),
    '@assets': path.resolve(process.cwd(), 'src/assets')
  },
  fallback: {
    ...config.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "buffer": require.resolve("buffer")
  }
}));

// Add custom loader configurations
composer.getPartial("_babel").setOverride((config) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                jsx: 'react-jsx'
              }
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
}));

module.exports = xarcWebpack.compose(options);
```

#### Available Webpack Partials

Here's a comprehensive list of all webpack partials available for customization, organized by category:

##### Core Configuration Partials

| Partial Name | Purpose | When to Override | Common Scenarios |
|--------------|---------|------------------|------------------|
| `_entry` | Entry point configuration and HMR setup | Dynamic entries, multi-page apps | Multiple entry points, custom entry logic |
| `_output` | Output settings (path, filename, publicPath) | Custom build output | CDN integration, custom file naming |
| `_resolve` | Module resolution (aliases, extensions) | Path aliases, custom modules | Monorepo setups, custom module paths |


##### Build & Processing Partials

| Partial Name | Purpose | When to Override | Common Scenarios |
|--------------|---------|------------------|------------------|
| `_babel` | Babel loader configuration | Custom Babel setup | Different presets, TypeScript config |
| `_extract-style` | CSS/SCSS/Less processing and extraction | Custom CSS setup | PostCSS plugins, CSS modules |
| `_fonts` | Font file handling (woff, woff2, ttf, eot) | Custom font processing | Web font optimization, custom loaders |
| `_images` | Image processing (png, jpg, gif, svg) | Image optimization | Custom image loaders, CDN integration |
| `_subapp-chunks` | SubApp code splitting and chunk optimization | Custom chunking strategy | Bundle size optimization, lazy loading |


#### Common Override Scenarios by Use Case

**🎯 Development Environment Customization**
```javascript
// Override _dev for custom development server
composer.getPartial("_dev").setOverride((config) => ({
  ...config,
  devServer: {
    ...config.devServer,
    port: 4000,
    proxy: {
      '/api': 'http://localhost:8080'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}));
```
**🧩 Module Resolution and Aliases**
```javascript
// Override _resolve for monorepo or custom paths
composer.getPartial("_resolve").setOverride((config) => ({
  ...config,
  alias: {
    ...config.alias,
    '@shared': path.resolve(__dirname, '../shared'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@utils': path.resolve(__dirname, 'src/utils')
  }
}));
```

**🎨 Custom CSS Processing**
```javascript
// Override _extract-style for custom CSS setup
composer.getPartial("_extract-style").setOverride((config) => ({
  ...config,
  module: {
    ...config.module,
    rules: [
      ...config.module.rules,
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('tailwindcss')]
            }
          }
        ]
      }
    ]
  }
}));
```


**📦 SubApp Chunk Optimization**
```javascript
// Override _subapp-chunks for custom chunking
composer.getPartial("_subapp-chunks").setOverride((config) => ({
  ...config,
  optimization: {
    ...config.optimization,
    splitChunks: {
      ...config.optimization.splitChunks,
      minSize: 20000,
      maxSize: 250000
    }
  }
}));
```


## Usage in Electrode Ecosystem

### With @xarc/app

The typical setup with the main `@xarc/app` package:

```json
{
  "dependencies": {
    "@xarc/app": "^12.0.0"
  },
  "devDependencies": {
    "@xarc/app-dev": "^12.0.0"
  }
}
```

```typescript
// xrun-tasks.ts - Development tasks
import { loadXarcDevTasks, xrun } from "@xarc/app-dev/lib/dev-tasks";

xrun.updateEnv({
  WEBPACK_DEV_MIDDLEWARE: true,
  HOST: "localhost",
  PORT: 3000,
  APP_SERVER_PORT: 3100
});

loadXarcDevTasks(xrun, {});
```

### With Subapps

For subapp-based applications, you can configure webpack dev middleware in your server configuration:

```typescript
// server configuration
const config = {
  plugins: {
    "@xarc/app-dev": {
      module: "@xarc/app-dev/lib/webpack-dev-express", // or fastify/koa
      enable: process.env.NODE_ENV === "development"
    }
  }
};
```



## @xarc/app-dev vs Create React App: Feature Comparison

| Feature | @xarc/app-dev | Create React App (CRA) |
|---------|---------------|-------------------------|
| **Architecture** | Micro-frontend (SubApp) architecture | Monolithic SPA |
| **Server-Side Rendering** | ✅ Built-in SSR support | ❌ Client-side only* |
| **Configuration** | ✅ Extensible without ejecting | ❌ Must eject for customization |
| **Task Runner** | ✅ Comprehensive `xrun` system | ❌ Basic npm scripts |
| **Server Integration** | ✅ Express/Fastify/Koa/Hapi middleware | ❌ Dev server only |
| **Hot Module Replacement** | ✅ Advanced HMR (Components + Redux + SubApps) | ✅ Basic component HMR |
| **Testing Frameworks** | ✅ Jest, Mocha, Karma support | ✅ Jest only |
| **TypeScript** | ✅ First-class TypeScript support | ✅ Good TypeScript support |
| **Code Splitting** | ✅ Automatic SubApp-level splitting | ✅ Manual dynamic imports |
| **CDN Integration** | ✅ Built-in CDN mapping | ❌ Manual configuration |
| **Asset Management** | ✅ Isomorphic asset loading | ❌ Client-side only |
| **Production Readiness** | ✅ Enterprise-scale proven | ✅ Good for smaller apps |
| **Learning Curve** | 📈 Moderate to steep | 📈 Gentle |

## Configuration Options

### Environment Variables

Key environment variables for development:

```bash
# Server Configuration
HOST=localhost                    # Development server host
PORT=3000                        # Main server port
APP_SERVER_PORT=3100            # App server port (when using proxy)

# Webpack Dev Server
WEBPACK_DEV_MIDDLEWARE=true     # Enable webpack dev middleware
WEBPACK_DEV_HOST=localhost      # Webpack dev server host
WEBPACK_DEV_PORT=2992          # Webpack dev server port
WEBPACK_DEV_HTTPS=false        # Use HTTPS for dev server
```

### XarcOptions Interface

```typescript
interface XarcOptions {
  webpack?: {
    enableHotModuleReload?: boolean;
    enableNodeModuleReload?: boolean;
    minify?: boolean;
  };
  babel?: {
    enableTypeScript?: boolean;
    enableFlow?: boolean;
    target?: string;
  };
  eslint?: {
    enableTypeScript?: boolean;
    extendRc?: string;
  };
}
```

## Contributing

This package is part of the [Electrode](https://github.com/electrode-io/electrode) platform. Please see the main repository for contributing guidelines.

## License

Apache-2.0 © [Electrode](https://github.com/electrode-io/electrode)

[npm-image]: https://badge.fury.io/js/%40xarc%2Fapp-dev.svg
[npm-url]: https://npmjs.org/package/@xarc/app-dev
[npm-downloads-image]: https://img.shields.io/npm/dm/@xarc/app-dev.svg
[npm-downloads-url]: https://www.npmjs.com/package/@xarc/app-dev
