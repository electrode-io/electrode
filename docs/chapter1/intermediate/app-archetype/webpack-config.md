# Webpack Config

Webpack Config is a significant part of the app archetype.  They help with compiling and bundling your React app code.  Webpack is a very sophisticated and complex software and while we provided sensible defaults, we make it possible for you to tinker with your own.

The webpack configs in the app archetype are separated into partials and compose into a single config using [webpack-config-composer] that's passed to webpack.

There are two ways to override the app archetype's webpack config.

1.  Provide a single webpack config that gets merged into the app archetype's final composed config
2.  Take the [webpack-config-composer] from the app archetype and compose the final config yourself.

Either way, the archetype has the following config to use with webpack:

-   `webpack.config.js` - When building your app for production
-   `webpack.config.dev.js` - When running your app in development mode
-   `webpack.config.hot.js` - When running your app in hot mode
-   `webpack.config.test.js` - When running tests
-   `webpack.config.coverage.js` - When running coverage test
-   `webpack.config.browsercoverage.js` - When running coverage test in the browser

## Overriding

To override the webpack config, you can create a webpack config with the same filename as above, either in your app's root directory, or under the directory `archetype/config/webpack`.

### Provide A Config

Your file can just export a plain JSON to be merged into the archetype's config.

For example, to add an alias for an module in `webpack.config.js`, add a file `archetype/config/webpack/webpack.config.js`:

```js
module.exports = {
  resolve: {
    alias: {
      "my-alias": "my-module"
    }
  }
}
```

> Note that this will only affect `webpack.config.js`.  To override other webpack config in the archetype, you need to add another file with the corresponding name.

### Control The Composer

If you want to have more control of how the final webpack config is composed, your file should export a function that will receive the composer from the app archetype.

The function should take three parameters: `composer`, `options`, `compose_func`.

-   `composer` - The [webpack-config-composer] instance that the app archetype has setup.  It contains all the webpack partials and composer profiles from the app archetype.
-   `options` - The options for the app archetype's webpack config composition.
-   `compose_func` - The function that the app archetype would've used to compose the final config.  If you like, you can call this after you've made some updates to the `composer`.

This approach hands you the most direct control of composing the final webpack config using [webpack-config-composer].  The `composer` instance your function received has all the webpack partials from the archetype, and the profiles that would've contributed to the final config.

#### `options`

The options object contains all the information that the archetype used to create the composer instance.  It contains the following:

-   `profiles` - The profiles that's added to the composer
-   `profileNames` - Names of the profiles to use to compose the final config
-   `configFilename` - Name of the webpack config file.  ie: `webpack.config.js`
-   `keepCustomProps` - Flag to indicate whether to keep the custom props in the final config.

#### Examples

Below are two examples showing `webpack.config.js`, to be placed in `archetype/config/webpack/webpack.config.js`:

##### Merging

Lodash's merge method doesn't concat arrays, but you can provide a customizer to change that.  

This example shows a function that merge a config into the archetype config with aspect of the merging customized.

```js
const _ = require("lodash");

module.exports = function (composer, options, compose) {
  const config = compose();
  _.merge(config, {
    // your custom webpack config
  }, (a, b) => {
    return (Array.isArray(a) && Array.isArray(b))
      ? [].concat(a).concat(b)
      : undefined;
  });
  return config;
};
```

##### Custom Composing

This example completely removes the `_extract-style` partial from the composer and add a custom partial for handling styles.

```js
module.exports = function( composer, options, compose ) {
  // add custom-style partial to the composer
  composer.addPartials({
    "custom-style": {
      config: {
        // contains the actual webpack configs for this partial
      }
    }
  });
  // disable the _extract-style partial from _base profile
  // and add custom-style partial to it with the same order
  const base = composer.profiles._base;
  const tmp = base.partials["_extract-style"];
  tmp.enable = false;
  base.partials["custom-style"] = { order: tmp.order };

  // Now that the composer has been updated, compose the final config
  return compose();
}
```

#### App Archetype's partials and profiles

The app archetype's partials can be found under `electrode-archetype-react-app-dev/config/webpack/partials/index.js`.

There is always a `_base` profile.

Each webpack config will add another profile named according to the file.

For example, `webpack.config.hot.js` would add a profile `_hot`.

The file `webpack.config.js` adds a profile named `_production`.

[webpack-config-composer]: https://www.npmjs.com/package/webpack-config-composer
