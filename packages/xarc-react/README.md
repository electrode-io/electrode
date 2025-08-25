# @xarc/react

[![npm version](https://badge.fury.io/js/%40xarc%2Freact.svg)](https://badge.fury.io/js/%40xarc%2Freact)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Overview
The official React framework integration for the Xarc web application platform. This package provides comprehensive support for building scalable React applications using the SubApp architecture pattern.

## Key Features

- 🚀 **SubApp Architecture** - Build modular applications with independent, reusable components
- ⚡ **Server-Side Rendering (SSR)** - Full SSR support with React 18
- 🎯 **TypeScript Support** - Fully typed APIs with comprehensive IntelliSense
- 🌐 **App Context** - Shared state management across SubApps
- 📊 **Static Props** - Server-side data fetching with type safety
- 🔧 **Feature System** - Extensible architecture with pluggable features

## Installation and Dependencies

```bash
npm install @xarc/react
# or
yarn add @xarc/react
# or
pnpm add @xarc/react
```

## Basic Setup

### 1. Declare a SubApp

Create your main application entry point:

**`src/app.tsx`**
```tsx
import { declareSubApp } from "@xarc/react";

export const MyApp = declareSubApp({
  name: "my-app",
  getModule: () => import("./subapps/my-app")
});
```

### 2. Implement the SubApp

Create the SubApp implementation:

**`src/subapps/my-app/index.tsx`**
```tsx
import { React, ReactSubApp } from "@xarc/react";

const MyAppComponent = () => {
  return (
    <div>
      <h1>Hello from My SubApp!</h1>
      <p>This is a React SubApp in the Xarc platform.</p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: MyAppComponent
};
```



## Usage Examples

### Basic SubApp with State Management

```tsx
import { React, ReactSubApp } from "@xarc/react";
import { reduxFeature } from "@xarc/react-redux";

const Counter = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: Counter,
  wantFeatures: [
    reduxFeature({
      React,
      shareStore: true,
      reducers: {
        counter: (state = { value: 0 }, action) => {
          switch (action.type) {
            case 'INCREMENT':
              return { value: state.value + 1 };
            default:
              return state;
          }
        }
      }
    })
  ]
};
```

### SubApp with Static Props (Server-Side Data Fetching)

**SubApp Implementation:**
```tsx
import { React, ReactSubApp, staticPropsFeature } from "@xarc/react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: UserList,
  wantFeatures: [
    staticPropsFeature({
      serverModule: require.resolve("./static-props")
    })
  ]
};
```

**Static Props Module (`./static-props.ts`):**
```tsx
import { StaticPropsMethodParams } from "@xarc/react";

export async function getStaticProps({ ssrData }: StaticPropsMethodParams) {
  // Fetch data on the server
  const response = await fetch('https://api.example.com/users');
  const users = await response.json();
  
  return {
    users
  };
}
```

### App Context Usage

**Provider SubApp:**
```tsx
import { React, ReactSubApp, AppContext, appContextFeature } from "@xarc/react";

const theme = {
  primaryColor: '#007acc',
  fontFamily: 'Arial, sans-serif'
};

const userInfo = {
  id: 1,
  name: 'John Doe',
  role: 'admin'
};

const AppProvider = ({ children }) => (
  <AppContext.Provider value={{ theme, userInfo }}>
    {children}
  </AppContext.Provider>
);

export const subapp: ReactSubApp = {
  Component: AppProvider,
  wantFeatures: [
    appContextFeature({
      prepare: () => ({ theme, userInfo })
    })
  ]
};
```

**Consumer SubApp:**
```tsx
import { React, ReactSubApp, AppContext } from "@xarc/react";

const ThemedComponent = () => {
  const { theme, userInfo } = React.useContext(AppContext);

  return (
    <div style={{ 
      color: theme.primaryColor,
      fontFamily: theme.fontFamily 
    }}>
      <h2>Welcome, {userInfo.name}!</h2>
      <p>Role: {userInfo.role}</p>
    </div>
  );
};

export const subapp: ReactSubApp = {
  Component: ThemedComponent
};
```


### Template Inserts for HTML Customization

**Template Inserts** allow you to inject custom HTML, CSS, JavaScript, or any content at predefined locations in the generated HTML template during server-side rendering. This is particularly powerful for:

- Adding analytics scripts
- Custom CSS frameworks
- Meta tags and SEO optimization  
- Third-party integrations
- Custom styling and theming

#### Basic Template Inserts

```tsx
import { PageRenderer, createTemplateTags as cTT } from "@xarc/react";

const pageRenderer = new PageRenderer({
  subApps: [
    { name: "header", ssr: true },
    { name: "main-content", ssr: true },
    { name: "footer", ssr: true }
  ],
  templateInserts: {
    head: {
      // Inject immediately after <head>
      begin: cTT`<meta name="viewport" content="width=device-width, initial-scale=1">`,
      
      // Inject before </head>
      end: cTT`<link rel="stylesheet" href="/custom-styles.css">`,
      
      // Inject after xarc's initialization scripts
      afterInit: cTT`<script src="/analytics.js"></script>`
    },
    body: {
      // Inject immediately after <body>
      begin: cTT`<div id="page-wrapper">`,
      
      // Inject before </body>  
      end: cTT`</div>`,
      
      // Inject before SubApp startup
      beforeStart: cTT`<!-- Page content starts here -->`,
      
      // Inject after SubApp startup
      afterStart: cTT`<!-- Page content loaded -->`
    }
  }
});
```

#### Template Inserts for Different Scenarios

**1. Analytics and Tracking**
```tsx
templateInserts: {
  head: {
    end: cTT`
      <!-- Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_ID');
      </script>
    `
  }
}
```

**2. CSS Framework Integration**
```tsx
templateInserts: {
  head: {
    begin: cTT`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
            rel="stylesheet">
    `,
    end: cTT`
      <style>
        .custom-app-styles {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
      </style>
    `
  },
  body: {
    end: cTT`
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js">
      </script>
    `
  }
}
```

**3. Content Security Policy (CSP) Compliance**
```tsx
templateInserts: {
  head: {
    contextReady: cTT`${(context) => {
      const nonce = context.user.nonce;
      return `
        <script${nonce ? ` nonce="${nonce}"` : ''}>
          // CSP-compliant inline script
          window.APP_CONFIG = {
            apiUrl: "${process.env.API_URL}",
            version: "${process.env.APP_VERSION}"
          };
        </script>
      `;
    }}`
  }
}
```

**4. Progressive Web App (PWA) Setup**
```tsx
templateInserts: {
  head: {
    begin: cTT`
      <link rel="manifest" href="/manifest.json">
      <meta name="theme-color" content="#000000">
      <link rel="apple-touch-icon" href="/icon-192x192.png">
    `,
    end: cTT`
      <script>
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
              .then(registration => console.log('SW registered'))
              .catch(error => console.log('SW registration failed'));
          });
        }
      </script>
    `
  }
}
```

**5. Performance Monitoring**
```tsx
templateInserts: {
  head: {
    afterInit: cTT`
      <script>
        // Performance monitoring
        window.addEventListener('load', () => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart);
        });
      </script>
    `
  }
}
```

#### Integration Points in HTML Template

Template inserts are strategically placed in the HTML generation process:

```html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  
  ${head.begin} <!-- Custom head content -->
  
  <title>Page Title</title>
  <!-- Xarc context initialization -->
  
  ${head.contextReady} <!-- Context-aware inserts -->
  
  <!-- Xarc SubApp initialization -->
  
  ${head.afterInit} <!-- Post-init scripts -->
  ${head.end} <!-- Final head content -->
  
</head>
<body>
  
  ${body.begin} <!-- Page wrapper, initial scripts -->
  
  <!-- SubApp rendering locations -->
  
  ${body.beforeStart} <!-- Pre-startup content -->
  
  <!-- SubApp startup scripts -->
  
  ${body.afterStart} <!-- Post-startup content -->
  ${body.end} <!-- Closing wrappers, final scripts -->
  
</body>
</html>
```

#### Server-Side Usage Example

```tsx
// server/routes.ts
import { PageRenderer, createTemplateTags as cTT } from "@xarc/react";
import { MyApp, Header, Footer } from "../app";

const pageRenderer = new PageRenderer({
  pageTitle: "My Application",
  subApps: [
    { name: Header.name, ssr: true },
    { name: MyApp.name, ssr: true },
    { name: Footer.name, ssr: true }
  ],
  templateInserts: {
    head: {
      begin: cTT`<meta name="description" content="My awesome app">`,
      contextReady: cTT`${(context) => {
        const userTheme = //get Current UserTheme;
        return `<link rel="stylesheet" href="/themes/${userTheme}.css">`;
      }}`,
      end: cTT`<link rel="preconnect" href="https://api.example.com">`
    },
    body: {
      begin: cTT`<div class="app-container">`,
      beforeStart: cTT`<div class="loading-indicator">Loading...</div>`,
      afterStart: cTT`<script>
        document.querySelector('.loading-indicator')?.remove();
      </script>`,
      end: cTT`</div>`
    }
  }
});

// In your route handler
const context = await pageRenderer.render({ request, user });
response.send(context.result);
```

## API Reference

### Core Functions

#### `declareSubApp(options: SubAppOptions): SubAppDef`

Declares a SubApp with the given options. This is the primary way to create SubApps in your application.

**Parameters:**
- `options: SubAppOptions` - Configuration object for the SubApp

**Returns:** `SubAppDef` - The declared SubApp definition

### Template System (Server-Side)

#### `PageRenderer`

Server-side page renderer that handles SubApp rendering and template inserts.

**Constructor:**
```tsx
new PageRenderer(options: PageOptions)
```

**Usage:**
```tsx
import { PageRenderer } from "@xarc/react";

const pageRenderer = new PageRenderer({
  subApps: [{ name: "my-app", ssr: true }],
  pageTitle: "My App",
  templateInserts: { /* template customizations */ }
});

const context = await pageRenderer.render({ request, user });
```

#### `createTemplateTags`

Template literal tag function for creating template fragments used in `templateInserts`.

**Usage:**
```tsx
import { createTemplateTags as cTT } from "@xarc/react";

// Static template
const staticTemplate = cTT`<script src="/app.js"></script>`;

// Dynamic template with context
const dynamicTemplate = cTT`${(context) => {
  return `<meta name="user-id" content="${context.user.id}">`;
}}`;
```

#### `TemplateInserts` Interface

Configuration object for injecting custom content into HTML templates at predefined locations.

```tsx
interface TemplateInserts {
  head?: {
    begin?: any[];        // Inject immediately after <head>
    contextReady?: any[]; // Inject after context initialization
    afterInit?: any[];    // Inject after SubApp initialization
    end?: any[];          // Inject immediately before </head>
  };
  body?: {
    begin?: any[];        // Inject immediately after <body>
    beforeStart?: any[];  // Inject before SubApp startup
    afterStart?: any[];   // Inject after SubApp startup
    end?: any[];          // Inject immediately before </body>
  };
}
```

### Feature Functions

#### `staticPropsFeature(options: StaticPropsFeatureOptions): SubAppFeatureFactory`

Enables server-side data fetching for SubApps.

**Parameters:**
```tsx
interface StaticPropsFeatureOptions {
  serverModule: string;  // Path to server module with getStaticProps
  exportName?: string;   // Custom export name (default: 'getStaticProps')
}
```

#### `appContextFeature(options?: AppContextFeatureOptions): SubAppFeatureFactory`

Provides application context support for sharing data across SubApps.

**Parameters:**
```tsx
interface AppContextFeatureOptions {
  prepare?: () => any; // Function to prepare context data
}
```

### How Rendering is Triggered

The framework handles component rendering through the `BrowserReactLib` class:

1. **SubApp Initialization**: When a SubApp is loaded, the framework calls `startSubApp()`
2. **Feature Processing**: All SubApp features (Redux, Router, etc.) are processed
3. **Render Decision**: Framework decides between hydration or fresh rendering
4. **DOM Mounting**: Component is mounted to the designated DOM element

#### Example: Rendering Pipeline

```tsx
// Internal framework flow (handled automatically)
export class BrowserReactLib {
  async startSubApp(csrData: SubAppCSRData, pipeline: ReactClientRenderPipeline, reload?: boolean) {
    const result = await this.prepareCSR(csrData, pipeline, reload);
    
    // Automatic rendering decision
    if (!reload && csrData.ssr) {
      // Server-rendered content exists, hydrate it
      hydrateRoot(csrData.element, <result.Component />);
    } else {
      // Fresh client-side render
      createRoot(csrData.element).render(<result.Component />);
    }
  }
}
```

### Re-exported Libraries

For convenience, the package re-exports commonly used libraries:

```tsx
import { 
  React,              // React library
  ReactDom,           // ReactDOM
  ReactDomServer,     // ReactDOM/server  
  Component,          // React.Component
  createTemplateTags, // Template tag function (Node.js only)
  PageRenderer        // Page renderer (Node.js only)
} from "@xarc/react";
```

## License

Licensed under the [Apache License, Version 2.0](../../LICENSE).

## Support

- 📚 [Documentation](https://electrode.io)
- 🐛 [Issue Tracker](https://github.com/electrode-io/electrode/issues)
- 💬 [Discussions](https://github.com/electrode-io/electrode/discussions)

---

Made with ❤️ by the [Electrode team](https://github.com/electrode-io)
