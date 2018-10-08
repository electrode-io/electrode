# Webpack 4 Migration Guide

Webpack 4 was released earlier this year and includes lots of robust features and improvements which will help the development process easier.

[Release Notes for Webpack 4](https://github.com/webpack/webpack/releases/tag/v4.0.0).

Highlights are...

- Big performance improvements (build time reduction etc)
- Simplified configuration options
- A complete rewrite of the plugin system
- New first class module types including support for WebAssembly
- Brings a much more explicit and easy to optimize API, allowing higher performance, better profiling, and easier integration into type systems

## Migrate your existing apps to webpack 4

We have released a beta version of app archetype for supporting webpack 4, please update your `package.json` and re-install the modules:

```
electrode-archetype-react-app: "^6.0.0-beta"
electrode-archetype-react-app-dev: "^6.0.0-beta"
```

> Note: Please make sure you are using `webpack-dev-middleware` for your app settings. `webpack-dev-server` is no longer supported by this version of electrode archetype. If you haven't done yet, please follow the instructions [here](https://docs.electrode.io/guides/migration/webpack-dev-middleware#add-webpack-dev-plugin).

## Common Changes

### Node.js v4

If you are still using Node.js v4 or lower, you need to upgrade your Node.js installation to Node.js v6 or higher.

### CLI

The CLI has moved to a separate package: webpack-cli. You need to install it before using webpack 4.

```
...
"webpack": "^4.19.1",
"webpack-cli": "^3.1.0"
```

### mode

Webpack 4 released two modes: development and production. Set "mode" option to "development" or "production" to enable defaults for each environment.

webpack.config.js

```
module.exports = {
  // ...
  mode: "production",
}
```

### Deprecated/Removed plugins

- These plugins can be removed from configuration as they are default in production mode:

  webpack.config.js

  ```
  module.exports = {
  // ...
  plugins: [
    -    new NoEmitOnErrorsPlugin(),
    -    new ModuleConcatenationPlugin(),
    -    new DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") })
    -    new UglifyJsPlugin()
    ],
  }
  ```

- These plugins are default in development mode:

  webpack.config.js

  ```
  module.exports = {
    // ...
    plugins: [
    -    new NamedModulesPlugin()
    ],
  }
  ```

- These plugins were deprecated and are now removed:

  webpack.config.js

  ```
  module.exports = {
    // ...
    plugins: [
    -    new NoErrorsPlugin(),
    -    new NewWatchingPlugin()
    -    new webpack.optimize.CommonsChunkPlugin()
    ]
  }
  ```

  > Note: The CommonsChunkPlugin was removed. Instead the optimization.splitChunks options can be used.

### new plugin system

The plugin method on tapable objects is theoretically backward-compatible, but it causes a deprecation warning, so plugins should consider switching to tap instead. And each function attached to a hook must now have a name.

Warnings:

```
BREAKING CHANGE: There need to exist a hook at 'this.hooks'. To create a compatiblity layer for this hook, hook into 'this._pluginCompat'.
stack:
[ 'TypeError: compiler.plugin is not a function',
     '    at FailPlugin.apply ]
...
```

Fixes:

```
// before
apply(compiler) {
  compiler.plugin("done", () => {
    console.log("Hello world");
})
// after
apply(compiler) {
  compiler.hooks.done.tap("HelloWorld", () => {
   console.log("Hello world");
})
```

### import() and CommonJS

When using import() to load non-ESM the result has changed in webpack 4. Now you need to access the default property to get the value of module.exports.

non-esm.js

```
module.exports = {
  sayHello: () => {
    console.log('hello world');
  }
};
```

example.js

```
function sayHello() {
  import('./non-esm.js').then(module => {
    module.default.sayHello();
  });
}
```

### json and loaders

When using a custom loader to transform .json files you now need to change the module type:

webpack.config.js:

```
module.exports = {
  // ...
  rules: [
    {
      test: /config\.json$/,
      loader: 'special-loader',
+     type: 'javascript/auto',
      options: {...}
    }
  ]
};
```

When still using the json-loader, it can be removed:

webpack.config.js

```
module.exports = {
  // ...
  rules: [
    {
-     test: /\.json$/,
-     loader: 'json-loader'
    }
  ]
};
```

## References

- [webpack 4: migration guide for plugins/loaders](https://medium.com/webpack/webpack-4-migration-guide-for-plugins-loaders-20a79b927202)
- [webpack To v4 from v3](https://webpack.js.org/migrate/4/)
