# @xarc/tag-renderer

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

## Overview

**@xarc/tag-renderer** is a sophisticated template rendering engine that leverages ES6 template literals to generate HTML pages with dynamic content. Built for high-performance server-side rendering in universal JavaScript applications, it provides a flexible and type-safe approach to HTML generation with advanced features like token-based customization, asynchronous content loading, and streaming output.

## Key Features

- 🏷️ **Tag-based templating** - Create templates using ES6 template literals with custom tags
- 🔄 **Asynchronous rendering** - Support for async functions, promises, and streaming output
- 🎯 **Token system** - Extensible token handlers for dynamic content injection
- 📝 **Type-safe** - Written in TypeScript with full type definitions
- ⚡ **Performance** - Efficient template compilation and rendering

## Installation and Dependencies

```bash
npm install @xarc/tag-renderer
```
**Note:** This package is automatically included as an internal dependency of `@xarc/app-dev`, so there's no need to install it explicitly in most cases.

## Basic Setup

### Basic Template Creation

```typescript
import { createTemplateTags, TagRenderer } from "@xarc/tag-renderer";

// Create a simple template
const templateTags = createTemplateTags`<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
</head>
<body>
  <h1>Hello World!</h1>
  ${() => "<p>Dynamic content from function</p>"}
</body>
</html>`;

// Render the template
const renderer = new TagRenderer({ templateTags });
const context = await renderer.render({});
console.log(context.result); // HTML string
```

### Advanced Usage with Tokens

```typescript
import { 
  createTemplateTags, 
  TagRenderer, 
  Token, 
  TokenInvoke, 
  RegisterTokenIds 
} from "@xarc/tag-renderer";

// Define token handlers
const tokenHandler = () => ({
  PAGE_TITLE: () => "<title>Dynamic Title</title>",
  USER_CONTENT: (context) => {
    const { user } = context.options;
    return `<p>Welcome, ${user?.name || 'Guest'}!</p>`;
  },
  ASYNC_DATA: async (context) => {
    // Simulate async data fetching
    const data = await fetchData();
    return `<div>${data.content}</div>`;
  }
});

// Create template with tokens
const templateTags = createTemplateTags`<!DOCTYPE html>
<html>
<head>
  ${RegisterTokenIds(tokenHandler)}
  ${Token("PAGE_TITLE")}
  <meta charset="utf-8">
</head>
<body>
  ${Token("USER_CONTENT")}
  ${Token("ASYNC_DATA")}
  ${TokenInvoke(myCustomHandler, { prop: "value" })}
</body>
</html>`;

// Render with context
const renderer = new TagRenderer({ templateTags });
const context = await renderer.render({
  user: { name: "John Doe" }
});
```

## Core Components

### TagRenderer

The main class responsible for rendering templates with token support.

```typescript
class TagRenderer {
  constructor(options: {
    templateTags: any[];
    tokenHandlers?: Function | Function[];
    routeOptions?: any;
    insertTokenIds?: boolean;
  })

  async render(options: any): Promise<RenderContext>
  registerTokenIds(name: string, symbol: symbol, handler: Function): void
  addTokenIds(name: string, handler: Function, priority?: number): void
}
```

#### Options

- `templateTags`: Array of template tags created with `createTemplateTags`
- `tokenHandlers`: Functions that provide token implementations
- `routeOptions`: Options passed to token handlers (e.g., route data)
- `insertTokenIds`: Insert token ID comments in output for debugging

### Template Functions

#### createTemplateTags

Creates template tags from ES6 template literals:

```typescript
const template = createTemplateTags`
  <div>${Token("MY_TOKEN")}</div>
  ${() => "Dynamic content"}
  ${async () => await getData()}
`;
```

#### Token

Creates a token placeholder that will be replaced by registered token handlers:

```typescript
Token("TOKEN_ID", props?)
```

#### TokenInvoke

Directly invokes a token handler function:

```typescript
TokenInvoke(handlerFunction, props?)
```

#### RegisterTokenIds

Registers token handlers within the template:

```typescript
RegisterTokenIds(handlerFunction, name?)
```

## Usage Examples

### Sub-templates

You can compose templates from other templates:

```typescript
const headerTemplate = createTemplateTags`
  <header>
    <h1>${Token("SITE_TITLE")}</h1>
    <nav>${Token("NAVIGATION")}</nav>
  </header>
`;

const mainTemplate = createTemplateTags`<!DOCTYPE html>
<html>
<head>
  ${Token("META_TAGS")}
</head>
<body>
  ${headerTemplate}
  <main>${Token("MAIN_CONTENT")}</main>
  <footer>${Token("FOOTER")}</footer>
</body>
</html>`;
```

### Conditional Rendering

```typescript
const templateTags = createTemplateTags`
  <div>
    ${(context) => {
      const { user } = context.options;
      if (user?.isAuthenticated) {
        return `<p>Welcome back, ${user.name}!</p>`;
      }
      return `<p><a href="/login">Please log in</a></p>`;
    }}
  </div>
`;
```

### Asynchronous Content

```typescript
const tokenHandler = () => ({
  ASYNC_CONTENT: async (context) => {
    try {
      const data = await fetch('/api/content');
      const json = await data.json();
      return `<div class="content">${json.html}</div>`;
    } catch (error) {
      return `<div class="error">Content unavailable</div>`;
    }
  }
});
```
## Usage in Electrode Ecosystem

### With @xarc/react

The tag renderer is commonly used with `@xarc/react` for server-side rendering:

```typescript
import { PageRenderer, createTemplateTags } from '@xarc/react';

const pageOptions = {
  subApps: [
    { name: 'header', ssr: true },
    { name: 'main-content', ssr: true }
  ],
  templateInserts: {
    head: {
      begin: createTemplateTags`<!-- head begins -->`,
      contextReady: createTemplateTags`${(context) => {
        return `<link rel="stylesheet" href="${context.user.cssBundle}">`;
      }}`
    },
    body: {
      begin: createTemplateTags`<!-- body begins -->`,
      end: createTemplateTags`<!-- body ends -->`
    }
  }
};
```
## License

Apache-2.0 © [Electrode](https://github.com/electrode-io/electrode)

[npm-image]: https://badge.fury.io/js/%40xarc%2Ftag-renderer.svg
[npm-url]: https://npmjs.org/package/@xarc/tag-renderer
[travis-image]: https://travis-ci.org/electrode-io/electrode.svg?branch=master
[travis-url]: https://travis-ci.org/electrode-io/electrode
