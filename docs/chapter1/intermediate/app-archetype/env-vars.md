# Environment Variables

Some of the app archetype's features can be controlled by environment variables.

## General Electrode Feature Configurations

* `HTML_WEBPACK_REPORTER_OFF` - If not empty, then turns off the HTML webpack reporter

* `OPTIMIZE_STATS` - If set to `true`, generates stats for the optimized webpack output bundle

* `INSPECTPACK_DEBUG` - If set to `true`, generates stats for used with the [inspectpack] tool.

## Webpack Relate Configs

* `WEBPACK_DEV_HOST` - If defined, used as the hostname for webpack dev server.

  * Default is `localhost`  


* `WEBPACK_DEV_PORT` - If defined, used as the port number for webpack dev server.

  * Default is `2992`


* `WEBPACK_TEST_PORT` - If defined, used as the port number for webpack tests

  * Default is `3001`


* `WEBPACK_DEV_HTTPS` - If `true`, then use `https` for webpack dev server

  * Default is `false`

* `CSS_MODULE_SUPPORT` - If `false`, then disable `CSS-Modules` and `CSS-Next` support, and load as pure `CSS`. If `true`, then enable `CSS-Modules` and `CSS-Next` support, and load as `CSS-Modules + CSS-Next`.

  * Default is `undefined`

* `CSS_MODULE_STYLUS_SUPPORT` - if `true`, then enable `stylus` support for CSS modules.

  * Default is `false`


* `ENABLE_BABEL_POLYFILL` - If `true`, loads `babel-polyfill` automatically for your bundle.

  * Default is `false`


* `ENABLE_NODESOURCE_PLUGIN` - If `true`, automatically bundles modules for compatibility with NodeJS internal modules.

  * Default is `false`


* `WOFF_FONT_INLINE_LIMIT` - Size limit to turn off inlining WOFF font

  * Default is `1000` (bytes)


* `WEBPACK_PRESERVE_SYMLINKS` - If `true`, preserves symlink paths in resolve modules.

  * Default is `false`


  * If this is not defined, then the env [`NODE_PRESERVE_SYMLINKS`] will be considered.


[`node_preserve_symlinks`]: https://nodejs.org/docs/latest-v8.x/api/cli.html#cli_node_preserve_symlinks_1
