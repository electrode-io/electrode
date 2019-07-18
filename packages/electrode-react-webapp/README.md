# Electrode React Webapp

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

This module helps render and serve your Electrode React application's `index.html`. It will handle doing server side rendering and embedding all the necessary JS and CSS bundles for your application.

All the defaults are configured out of the box, but your index page is extensible. You can specify your own index template file with the `htmlFile` or `selectTemplate` options.

See [design](/packages/electrode-react-webapp/DESIGN.md) for details on how the template can be extended.

## Installing

```bash
$ npm install electrode-react-webapp --save
```

## Usage

### Registering with Hapi

You can use this plugin by registering it with your Hapi server.

```js
const reactWebapp = server.register({
  register: require("electrode-react-webapp"),
  options: {
    pageTitle: "My Awesome React WebApp",
    paths: {
      "/{args*}": {
        content: "<h1>Hello React!</h1>"
      }
    }
  }
});
```

### Registering with electrode-server

To use this with electrode-server, add to the config you pass to `electrode-server`:

```js
const config = {
  plugins: {
    "electrode-react-webapp": {
      options: {
        pageTitle: "My Awesome React WebApp",
        paths: {
          "/{args*}": {
            content: "<h1>Hello React!</h1>"
          }
        },
        unbundledJS: {
          enterHead: [{ src: "http://cdn.com/js/lib.js" }]
        }
      }
    }
  }
};

require("electrode-server")(config);
```

## Default options

This plugin has some default options but you can override them by setting your own value.

The current defaults are:

```js
{
  pageTitle: "Untitled Electrode Web Application",
  webpackDev: process.env.WEBPACK_DEV === "true",
  renderJS: true,
  serverSideRendering: true,
  htmlFile: "node_modules/electrode-react-webapp/lib/index.html",
  devServer: {
    host: "127.0.0.1",
    port: "2992"
  },
  paths: {},
  stats: "dist/server/stats.json"
}
```

## Options

| name                                         | type                         | default  | description                                                |
| -------------------------------------------- | ---------------------------- | -------- | ---------------------------------------------------------- |
| `pageTitle`                                  | `String`                     |          | The value to be shown in the browser's title bar           |
| `htmlFile`                                   | `String`                     | `*1`     | Absolute or relative path to the HTML template.            |
| [`selectTemplate`](#selecttemplate-function) | `Function`                   |          | Callback to selecte HTML template base on `request`        |
| `serverSideRendering`                        | `Boolean`                    | `false`  | Toggle server side rendering.                              |
| `webpackDev`                                 | `Boolean`                    | `false`  | Running with webpack-dev-server                            |
| `paths`                                      | `Object`                     |          | Specify [route paths and content](#paths-and-content)      |
| `unbundledJS`                                | `Object`                     |          | [Load external JavaScript](#unbundledJS-details) into page |
| `devServer`                                  | `Object`                     |          | webpack Dev Server Options                                 |
| `prodBundleBase`                             | `String`                     | `"/js/"` | Base path to the JavaScript, CSS and manifest bundles      |
| `cspNonceValue`                              | [`varies`](#csp-nonce-value) |          | Used to retrieve a CSP nonce value.                        |

> `*1`: Default for `htmlFile` is to use this module's built-in [`index.html`](./lib/index.html)

### Paths and Content

Example:

```js
{
  paths: {
    "/test": {
      // route specific options
    }
  }
}
```

Route speicific options can be:

| name                   | type       | description                                                       |
| ---------------------- | ---------- | ----------------------------------------------------------------- |
| `htmlFile`             | `String`   | Absolute or relative path to the HTML template file.              |
| `templateFile`         | `String`   |                                                                   |
| `insertTokenIds`       | `Boolean`  |                                                                   |
| `pageTitle`            | `String`   |                                                                   |
| `selectTemplate`       | `Function` | Callback to selecte HTML template for the route base on `request` |
| `responseForBadStatus` | `Function` |                                                                   |
| `responseForError`     | `Function` |                                                                   |

| `content` | [`varies`](#content-details) | [Content generator](#content-details) for server-side rendering |
| `overrideOptions` | `Object` | Specify any config for the given path to override top level options |

### `unbundledJS` Details

Example:

```js
{
  unbundledJS: {
    enterHead: [],
    preBundle: []
  }
}
```

- `enterHead` - Array of script entries to be inserted in `<head>` before anything else
- `preBundle` - Array of script entries to be inserted in `<body>` before the application's bundled JavaScript

The script entries can be:

- object - `{ src: "path to file" }` to insert a `<script>` that loads a file with `src`
  - To load scripts asynchronously use `{ src: "...", async: true }` or `{ src: "...", defer: true }`
- string - literal JavaScript to insert within `<script>` tags

### Webpack Dev Server Options

- `host` `(String)` The host that webpack-dev-server runs on
- `port` `(String)` The port that webpack-dev-server runs on

### CSP nonce Value

The entry can be a `Function`, `Object`, or `undefined`:

- `Function` - called with `(request, type)`, where `type` can be `'script'` or `'style'`
  - It return the corresponding nonce
- `Object` - it may have properties `script`, `style` or both, and the value for each should be the path from the request object to the nonce value
  - For example, if you put a nonce value at `request.plugins.myCspGenerator.nonce`, then you set `cspNonceValue` to `{ script: 'plugins.myCspGenerator.nonce' }`.
    - The nonce, if present, will be included on any `script` or `style` elements that directly contain scripts or style
    - If this property is undefined, or if the value at that location is undefined, no nonce will be added.

### `htmlFile` view details

The top level options can specify an **optional** value `htmlFile`.

Also each _path_ can specify the same option to override the top level one.

This option specifies the view template for rendering your path's HTML output.

- If it's `undefined`, then the built-in `index.html` view template is used.

- If it's a string, then it must point to a valid view template file.
  - If it's not an absolute path, then `process.cwd()` is prepended.

You can see this module's [build-in index.html](./lib/index.html) for details on how to create your own view template.

See [design doc](./DESIGN.md) for details on extending the template.

### Content details

The content you specify for your path is the entry to your React application when doing Server Side Rendering. Ultimately, a `string` should be acquired from the content and will replace the `SSR_CONTENT` marker in the view.

It can be a string, a function, or an object.

#### `string`

If it's a string, it's treated as a straight plain HTML to be inserted as the `SSR_CONTENT`.

#### `function`

If it's a function, the function will be called with the web server's `request` object, and it should return a promise that resolves an object:

```js
function myContent(req) {
  return Promise.resolve({
    status: 200,
    html: "<h1>Hello React!</h1>",
    prefetch: ""
  });
}
```

In an Electrode app, the module `electrode-redux-router-engine` and its `render` method is used to invoke the React component that's been specified for the route and the `renderToString` output is returned as the `html`.

#### `object`

If it's an object, it can specify a `module` field which is the name of a module that will be `require`ed. The module should export either a string or a function as specified above.

### `selectTemplate` Function

You can provide a `selectTemplate` function to dynamically determine the `htmlFile` and `tokenHandlers` at run time.

The function signature is:

```js
{
  selectTemplate: (request, routeOptions) => {};
}
```

It can return an object directly or with a Promise.

```js
{
  htmlFile: "",
  tokenHandlers: [],
  options: {},
  cacheId: "",
  cacheKey: "" // mutually exclusive with cacheId
}
```

- `htmlFile` - Path to HTML template. Its full path from `path.resolve` could also be used as `cacheKey` for the template instance.
- `tokenHandlers` - Array of file paths to JS modules that implement token handlers.
- `cacheId` - If non-empty string, then it's appended to `htmlFile` to use as `cacheKey` for the template instance.
- `cacheKey` - Provide `cacheKey` for the template instance, overrides `cacheId`.
- `options` - Specify some options for this route with this template:
  - `pageTitle` - change page title
  - `responseForBadStatus` - callback to generate response if non-200 HTTP status.
  - `responseForError` - callback to generate response in case of error.

> You can access the template instance cache through `routeOptions._templateCache`

### Disabling SSR

If you don't want any Server Side Rendering at all, you can set the option `serverSideRendering` to `false`, and you can skip setting `content`. This will make the server to **not** even load your React app.

For example:

```js
const config = {
  plugins: {
    "electrode-react-webapp": {
      options: {
        pageTitle: "My Awesome React WebApp",
        paths: {
          "/{args*}": {}
        },
        unbundledJS: {
          enterHead: [{ src: "http://cdn.com/js/lib.js" }]
        },
        serverSideRendering: false
      }
    }
  }
};
```

[npm-image]: https://badge.fury.io/js/electrode-react-webapp.svg
[npm-url]: https://npmjs.org/package/electrode-react-webapp
[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/electrode-react-webapp
[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-react-webapp
[daviddm-dev-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/electrode-react-webapp
[daviddm-dev-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-react-webapp?type-dev
[npm-downloads-image]: https://img.shields.io/npm/dm/electrode-react-webapp.svg
[npm-downloads-url]: https://www.npmjs.com/package/electrode-react-webapp
