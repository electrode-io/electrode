# @xarc/render-context

[![npm version](https://badge.fury.io/js/%40xarc%2Frender-context.svg)](https://badge.fury.io/js/%40xarc%2Frender-context)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

## Overview

The `@xarc/render-context` package is designed to manage the rendering context and output for template-based applications.

## Key Features
It provides a structured way to handle:
- Rendering context management
- Output buffering and streaming
- Token-based template processing  
- Asynchronous rendering operations
- Error handling during rendering
- Transform operations on render output

This package serves as the foundation for other Electrode rendering packages like `@xarc/tag-renderer` and `@xarc/jsx-renderer`.

## Installation and Dependencies

```bash
npm install @xarc/render-context
```

**Note:** This package is automatically included as an internal dependency of `@xarc/app-dev`, so there's no need to install it explicitly in most cases.

## Core Classes

### RenderContext

The main class that stores and controls the rendering of index.html from a template.

### RenderOutput

Manages the output buffering, streaming, and result collection during rendering.

### TokenModule

Represents a token module that can be loaded and executed during template rendering.

### BaseOutput, MainOutput, SpotOutput

Different output implementations for various rendering scenarios.

## Basic Setup

### With @xarc/tag-renderer

The `@xarc/tag-renderer` package uses `RenderContext` to process ES6 template literal templates with token-based rendering.

```typescript
// my-template.ts
import { 
  createTemplateTags, 
  Token, 
  TokenInvoke, 
  RegisterTokenIds, 
  TagRenderer 
} from '@xarc/tag-renderer';
import { RenderContext } from '@xarc/render-context';

// Define token handlers
const myTokenHandler = () => ({
  'page-title': 'My Application',
  'user-greeting': (context) => {
    const { user } = context.options;
    return user ? `Welcome, ${user.name}!` : 'Welcome, Guest!';
  },
  'dynamic-content': async (context) => {
    const data = await fetchUserData(context.options.userId);
    return `<div class="content">${data.content}</div>`;
  },
  'navigation': (context) => {
    const { isLoggedIn } = context.options;
    return isLoggedIn 
      ? '<nav><a href="/dashboard">Dashboard</a> | <a href="/logout">Logout</a></nav>'
      : '<nav><a href="/login">Login</a> | <a href="/register">Register</a></nav>';
  }
});

// Create template using tag renderer
const templateTags = createTemplateTags`<!DOCTYPE html>
<html>
<head>
  ${RegisterTokenIds(myTokenHandler)}
  <title>${Token('page-title')}</title>
</head>
<body>
  ${Token('navigation')}
  <main>
    ${Token('user-greeting')}
    ${Token('dynamic-content')}
  </main>
</body>
</html>`;

// Initialize renderer
const renderer = new TagRenderer({
  templateTags,
  insertTokenIds: process.env.NODE_ENV === 'development' // Debug mode
});

// Render with context
async function renderPage(options) {
  const context = await renderer.render(options);
  return context.result;
}

// Usage
const html = await renderPage({
  user: { name: 'John Doe' },
  userId: '123',
  isLoggedIn: true
});
```

### With @xarc/jsx-renderer

The JSX renderer provides a React-like template experience while using `RenderContext` under the hood.

```tsx
// my-jsx-template.tsx
import { 
  JsxRenderer, 
  IndexPage, 
  Token, 
  RegisterTokenIds, 
  Component,
  createElement 
} from '@xarc/jsx-renderer';

// Token handler for JSX templates
const jsxTokenHandler = (setupContext) => {
  const { routeOptions, user } = setupContext;
  
  return {
    name: 'jsx-tokens',
    tokens: {
      'app-title': () => 'My JSX Application',
      'user-info': (context) => {
        const { user } = context.options;
        return user 
          ? `<div class="user-info">Logged in as: ${user.email}</div>`
          : '<div class="user-info">Not logged in</div>';
      },
      'breadcrumbs': (context) => {
        const { path } = context.options.request;
        const segments = path.split('/').filter(Boolean);
        return segments.map((segment, i) => {
          const href = '/' + segments.slice(0, i + 1).join('/');
          return `<a href="${href}">${segment}</a>`;
        }).join(' > ');
      }
    },
    beforeRender: (context) => {
      // Setup before rendering
      context.user.renderStart = Date.now();
    },
    afterRender: (context) => {
      // Log render time
      const duration = Date.now() - context.user.renderStart;
      console.log(`JSX render completed in ${duration}ms`);
    }
  };
};

// Custom JSX component
class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="user-profile">
        <h2>Profile</h2>
        <p>Name: {user?.name || 'Anonymous'}</p>
        <p>Email: {user?.email || 'Not provided'}</p>
      </div>
    );
  }
}

// Main template
const MyTemplate = () => (
  <IndexPage DOCTYPE="html">
    <RegisterTokenIds handler={jsxTokenHandler} />
    <html lang="en">
      <head>
        <title><Token _id="app-title" /></title>
        <meta charSet="utf-8" />
      </head>
      <body>
        <header>
          <Token _id="breadcrumbs" />
        </header>
        <main>
          <Token _id="user-info" />
          <UserProfile user={{ name: 'John', email: 'john@example.com' }} />
        </main>
      </body>
    </html>
  </IndexPage>
);

// Initialize JSX renderer
const jsxRenderer = new JsxRenderer({
  template: MyTemplate,
  templateFullPath: __filename,
  insertTokenIds: true
});

// Render function
async function renderJsxPage(options) {
  const context = await jsxRenderer.render(options);
  
  if (context.error) {
    throw context.error;
  }
  
  return context.result;
}
```

### With @xarc/subapp (Server-Side Rendering)

The subapp package uses `RenderContext` for rendering pages with multiple subapps.

```typescript
// subapp-page.ts
import { PageRenderer, RenderOptions } from '@xarc/subapp';
import { RenderContext } from '@xarc/render-context';

// Define subapp configuration
const subAppConfig = {
  pageTitle: 'Multi-SubApp Application',
  subApps: [
    {
      name: 'header-subapp',
      ssr: true,
      props: { brand: 'My Company' }
    },
    {
      name: 'navigation-subapp', 
      ssr: true,
      props: { items: ['Home', 'Products', 'About'] }
    },
    {
      name: 'content-subapp',
      ssr: false, // Client-side only
      props: { userId: '123' }
    }
  ],
  templateInserts: {
    head: {
      begin: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      end: '<link rel="stylesheet" href="/styles.css">'
    },
    body: {
      begin: '<div id="app-container">',
      end: '</div>'
    }
  }
};

// Create page renderer
const pageRenderer = new PageRenderer(subAppConfig);

// Express route handler
app.get('/dashboard', async (req, res) => {
  try {
    const renderOptions: RenderOptions = {
      request: req,
      ssr: true,
      namespace: 'dashboard'
    };
    
    // This returns a RenderContext instance
    const context: RenderContext = await pageRenderer.render(renderOptions);
    
    if (context.error) {
      throw context.error;
    }
    
    // Send the rendered HTML
    res.send(context.result);
    
  } catch (error) {
    console.error('Render error:', error);
    res.status(500).send('<h1>Server Error</h1>');
  }
});
```

## License

Copyright 2018-present Electrode contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
