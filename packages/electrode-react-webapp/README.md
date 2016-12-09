# Electrode React Webapp

This is a Hapi plugin that register a default route for your Webapp to return
a bootstrapping React application.  With support for webpack dev server integrations.

## Installing

```
npm install electrode-react-webapp --save
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
        view: "index",
        content: "<h1>Hello React!</h1>"
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
            view: "index",
            content: "<h1>Hello React!</h1>"
        }
      }
    }
  }
}

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

What you can do with the options:

   * `pageTitle` `(String)` The value to be shown in the browser's title bar
   * `webpackDev` `(Boolean)` whether to use webpack-dev-server's URLs for retrieving CSS and JS bundles.
   * `serverSideRendering` `(Boolean)` Toggle server-side rendering.
   * `htmlFile` `(String)` Absolute or relative path to the application root html file. 
      It must contains the following placeholders:
      - `{{PAGE_TITLE}}` page title. 
      - `{{WEBAPP_BUNDLES}}` injected `<script>` and `<link>` tags to load bundled JavaScript and Css
      - `{{PREFETCH_BUNDLES}}` `<script>` tag containing code that will contains prefetched JavaScript code
      - `{{SSR_CONTENT}}` injected content rendered on server side
   * `paths` `(Object)` An object of key/value pairs specifying paths within your application with their view and (optionally) initial content for server-side render
     - _path_ `(Object)`
       - `view` `(String)` Name of the view to be used for this path **required**
       - `content` Content to be rendered by the server when server-side rendering is used _optional_ [see details](#content-details)
   * `devServer` `(Object)` Options for webpack's DevServer
       - `host` `(String)` The host that webpack-dev-server runs on
       - `port` `(String)` The port that webpack-dev-server runs on

### Content details

The content you specify for your path can either be a string or a promise returning function.

If it's a string, it's treated as a straight React template to be rendered.

If it's a function, the function should return a promise that resolves an object:

```js
function myContent() {
  return Promise.resolve({
    status: 200,
    html: "<h1>Hello React!</h1>",
    prefetch: ""
  });
}
```
