# Environment Variables

Some of the app archetype's features can be controlled by environment variables.

## General Electrode Feature Configurations

- `PORT` - The port number your app's `config/default.js` will read from to start up your app server to listen at.

  - Default is `3000`

- `OPTIMIZE_STATS` - If set to `true`, generates stats for the optimized webpack output bundle

- `INSPECTPACK_DEBUG` - If set to `true`, generates stats for used with the [inspectpack] tool.

## Webpack Relate Configs

- `WEBPACK_DEV_MIDDLEWARE` - If set to `true`, will run webpack dev server as part of your app server in dev mode.

  - Will also force `WEBPACK_DEV_PORT` to your app's port which is set by `PORT` or `3000`.
  - Default is `false`
  - Webpack dev server pages can be found under these routes:

    - `/_electrode_dev_/reporter` - Webpack compiled status report
    - `/_electrode_dev_/cwd` - Directory view of your app's CWD
    - `/_electrode_dev_/memfs` - Directory view of webpack dev middleware's virual mem fs of your compiled assets.
    - `/js/` - Or your webpack `publicPath`, w/o any trailing parts will list all files under your webpack's context directory.

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

[`node_preserve_symlinks`]: https://nodejs.org/docs/latest-v8.x/api/cli.html#cli_node_preserve_symlinks_1
