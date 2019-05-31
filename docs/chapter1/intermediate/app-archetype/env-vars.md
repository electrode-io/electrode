# Environment Variables

Some of the app archetype's features can be controlled by environment variables.

## General Electrode Feature Configurations

- `PORT` - The port number your app's `config/default.js` will read from to start up your app server to listen at.

  - Default is `3000`

- `OPTIMIZE_STATS` - If set to `true`, generates stats for the optimized webpack output bundle

- `INSPECTPACK_DEBUG` - If set to `true`, generates stats for used with the [inspectpack] tool.

## Webpack Related Configs

- `WEBPACK_DEV_MIDDLEWARE` - If set to `true`, will run webpack dev server as part of your app server in dev mode.

  - Will also force `WEBPACK_DEV_PORT` to your app's port which is set by `PORT` or `3000`.
  - Default is `false`
  - Webpack dev server pages can be found under these routes:

    - `/_electrode_dev_/reporter` - Webpack compiled status report
    - `/_electrode_dev_/cwd` - Directory view of your app's CWD
    - `/_electrode_dev_/memfs` - Directory view of webpack dev middleware's virual mem fs of your compiled assets.
    - `/js/` - Or your webpack `publicPath`, w/o any trailing parts will list all files under your webpack's context directory.

- `ELECTRODE_DEV_OPEN_BROWSER` - When using dev middleware, `clap dev` can automatically open your app in the browser. Use this flag to control that behavior.

  - Set to `false` - completely disable auto opening in browser.
  - Set to `true` - Always auto open.
  - Unset - automatically open if it didn't do so within the last 10 minutes.

- The following settings will apply only if `WEBPACK_DEV_MIDDLEWARE` is not `true`, meaning a separate webpack-dev-server is used for development:

  - `HTML_WEBPACK_REPORTER_OFF` - If not empty, then turns off the HTML webpack reporter.

  - `WEBPACK_DEV_HOST` - If defined, used as the hostname for webpack dev server.

    - Default is `localhost`

  * `WEBPACK_DEV_PORT` - If defined, used as the port number for webpack dev server.

    - Default is `2992`

  - `WEBPACK_TEST_PORT` - If defined, used as the port number for webpack tests

    - Default is `3001`

  * `WEBPACK_DEV_HTTPS` - If `true`, then use `https` for webpack dev server

    - Default is `false`

* `WEBPACK_REPORTER_SOCKET_PORT` - Change Electrode's webpack HTML reporter's WebSocket port for sync up with webpack-dev-server's result. The socket's default port is `5000`.

* `CSS_MODULE_SUPPORT` - If `false`, then disable `CSS-Modules` and `CSS-Next` support, and load as pure `CSS`. If `true`, then enable `CSS-Modules` and `CSS-Next` support, and load as `CSS-Modules + CSS-Next`.

  - Default is `undefined`

* `CSS_MODULE_STYLUS_SUPPORT` - if `true`, then enable `stylus` support for CSS modules.

  - Default is `false`

- `ENABLE_BABEL_POLYFILL` - If `true`, loads `babel-polyfill` automatically for your bundle.

  - Default is `false`

* `ENABLE_NODESOURCE_PLUGIN` - If `true`, automatically bundles modules for compatibility with NodeJS internal modules.

  - Default is `false`
  - Note that enabling this will make webpack bundle more than 100K of JS to simulate a NodeJS environment.

- `WOFF_FONT_INLINE_LIMIT` - Size limit to turn off inlining WOFF font

  - Default is `1000` (bytes)

* `WEBPACK_PRESERVE_SYMLINKS` - If `true`, preserves symlink paths in resolve modules.

  - Default is `false`
  - If this is not defined, then the env [`NODE_PRESERVE_SYMLINKS`] will be considered.

* `ENABLE_SHORTEN_CSS_NAMES` - When using CSS module, you can create short and cryptic CSS class names in production mode by setting this flag to `true`.

* `WEBPACK_DEV_ARTIFACTS_PATH` - specify path to the copy of some static files in dev mode

  - Default is `".etmp"`

* `WEBPACK_HOT_MODULE_RELOAD` - If `true`, enable hot module reload

  - Default is `true`

* `WEBPACK_DEV_WARNINGS_OVERLAY` - If `true`, shows warnings on a full-screen overlay in the browser in addition to compiler errors

  - Default is `true`

* `ELECTRODE_LOAD_DLLS` - If non empty json, each entry is the name of Electrode Webpack DLL to be loaded by the app

  - Default is `{}`

* `WEBPACK_MINIFY` - If `true`, webpack in `development` mode to minify code

  - Default is `true`

## Babel Related Configs

- `ENABLE_BABEL_TYPESCRIPT` - If `true`, enable typescript support

  - Default is `false`

- `ENABLE_BABEL_FLOW` - If `true`, enable FlowJS type stripping

  - Default is `true`

- `FLOW_REQUIRE_DIRECTIVE` - If `true`, **only** strip annotations and declarations from files that contain `// @flow` directive. Work as `requireDirective` option of `@babel/plugin-transform-flow-strip-types`

  - Default is `false`

- `BABEL_CLASS_PROPS` - If `true`, allow class properties

  - Default is `false`

- `BABEL_CLASS_PROPS_LOOSE` - If `true`, compile class properties to assignment expression instead of `Object.defineProperty`. Work as `loose` option of `@babel/plugin-proposal-class-properties`

  - Default is `true`

- `BABEL_ENV_TARGETS` - specify multiple environment targets for babel preset env to build `dist` bundle. `default` and `node` targets objects are required.

  - Default is

```js
{
  default: {
    ie: "8"
  },
  node: process.versions.node.split(".")[0]
}
```

- `ENV_TARGET` - specify a `targets` object within `BABEL_ENV_TARGETS` by name that babel will use to build `dist-X` bundle.

  - Default is `default`
  - Note, the default bundle generated is `dist`, while other specified bundle for example `ENV_TARGET=es6` will be generated in `dist-es6`.

## Karma Related

- `KARMA_BROWSER` - Set the browser karma will use. **Default is `chrome`**

  - `chrome` - Chrome
  - `phantomjs` - PhantomJS

[`node_preserve_symlinks`]: https://nodejs.org/docs/latest-v8.x/api/cli.html#cli_node_preserve_symlinks_1
