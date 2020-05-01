# Webpack 5-beta Migration Guide

This guide aims to help you migrating to webpack 5 when using webpack directly.

[Release Notes for Webpack 5](https://github.com/webpack/webpack/releases/tag/v5.0.0-beta.14).

Highlights are...

- Improve build performance with Persistent Caching
- Improve Long Term Caching
- Say goodbye to deprecated features from v4
- Automatic Node.js polyfills are history
- Cleanup configurations while implementing features in v4 without introducing any breaking changes.

## Migrate your existing apps to webpack 4

Webpack 5 removes all deprecated features. You must have no webpack deprecation warning.

```json
isomorphic-loader: beta-release
```

## Common Changes

### Node.js v8

Webpack requires at least 8.9.0, but using Node.js 10 or 12 is recommended.
Newer Node.js version will improve build performance a lot.

### CLI

Upgrade to latest webpack-cli version

```
"webpack-cli": "^4.0.0-beta.8"
```

### new plugin system

Since v4 the plugin method on tapable objects with backward compatibility, in v5 plugins it has to be on tap instead. And each function attached to a hook must now have a name.

Warnings:

```bash
Error: compiler.plugin is not a function.
stack:
[ 'TypeError: compiler.plugin is not a function',
     '    at FailPlugin.apply ]
...
```

Fixes:

```javascript
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

### Persistent Caching

There is now a filesystem cache. Note that it's not enabled by default. You have to opt-in with the following configuration:

```javascript
cache: {
  // 1. Set cache type to filesystem
  type: "filesystem",

  buildDependencies: {
    // 2. Add your config as buildDependency to get cache invalidation on config change
    config: [__filename]

    // 3. If you have other things the build depends on you can add them here
    // Note that webpack, loaders and all modules referenced from your config are automatically added
    // only files: something, or folders: something/. It will be resolved so it could be a node_modules or file without extension.
    anyKeyHere: ['/absolute/path/'], // ?
  }
}
```

More info on the same can be seen at this [guide](https://github.com/webpack/changelog-v5/blob/master/guides/persistent-caching.md)

### Experiments
Webpack 5 offers new experiments config option which allows to enabled experimental features. This makes it clear which ones are enabled/used. `experiments` option was introduced to empower users with an ability of activating and trying out experimental features.

For more [options and usage](https://webpack.js.org/configuration/experiments/)

## References

- [Webpack To v5 from v4](https://github.com/webpack/changelog-v5/blob/master/MIGRATION%20GUIDE.md)
- [Webpack v5 changelog](https://github.com/webpack/changelog-v5)
