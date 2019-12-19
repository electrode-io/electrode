# Webpack Configurations

Webpack configurations are a significant part of the app archetype. They help with compiling and bundling your React app code. Webpack is a very sophisticated and complex software and while we provided sensible defaults, we make it possible for you to customize your own.

The webpack configurations in the app archetype are separated into partials and compose into a single configuration using [webpack-config-composer] that's passed to webpack.

There are two ways to override the app archetype's webpack configuration.

1.  Provide a single webpack configuration that gets merged into the app archetype's final composed configuration
2.  Take the [webpack-config-composer] from the app archetype and compose the final configuration yourself.

Either way, the archetype has the following configuration to use with webpack:

- `webpack.config.js` - When building your app for production
- `webpack.config.dev.js` - When running your app in development mode
- `webpack.config.hot.js` - When running your app in hot mode
- `webpack.config.test.js` - When running tests
- `webpack.config.coverage.js` - When running coverage test
- `webpack.config.browsercoverage.js` - When running coverage test in the browser

## Overriding

To override the webpack configuration, you can create a webpack configuration with the same filename as above, either in your app's root directory, or under the directory `archetype/config/webpack`.

Your file can customize the final webpack config with two approaches:

1. Simply export the JSON object to be merged into the final config
2. Export a function that takes the [webpack-config-composer] instance to manipulate the composition programatically.

### Simple JSON Object

Your file can export a plain JSON format file that can be merged into the archetype's configuration.

For example, to add an alias for a module in `webpack.config.js`, add a file `archetype/config/webpack/webpack.config.js`:

```js
module.exports = {
  resolve: {
    alias: {
      "my-alias": "my-module"
    }
  }
};
```

> Note that this will only affect `webpack.config.js`. To override other webpack configuration in the archetype, you need to add another file with the corresponding name.

Another example to add a plugin:

```js
const BellOnBundlerErrorPlugin = require("bell-on-bundler-error-plugin");

const config = {
  plugins: [new BellOnBundlerErrorPlugin()]
};

module.exports = config;
```

### Customize Function

You can provide a function that takes the [webpack-config-composer] instance to manipulate the composition programatically.

For example:

```js
const BellOnBundlerErrorPlugin = require("bell-on-bundler-error-plugin");

module.exports = composer => {
  composer.addPartialToProfile("my-partial", "user", {
    plugins: [new BellOnBundlerErrorPlugin()]
  });
};
```

> By returning nothing, you still leave the final composition step to the archetype, but you can actually do all that in your function also. See below for further details.

The function can take up to three parameters: `composer`, `options`, `compose_func`.

- `composer` - The [webpack-config-composer] instance that the app archetype has setup. It contains all the webpack partials and composer profiles from the app archetype.
- `options` - The options for the app archetype's webpack configuration composition.
- `compose_func` - The function that the app archetype would've used to compose the final config. If you like, you can call this after you've made some updates to the `composer`.

This approach hands you the most direct control of composing the final webpack configuration using [webpack-config-composer]. The `composer` instance your function received has all the webpack partials from the archetype, and the profiles that would've contributed to the final config.

#### `options`

The options object contains all the information that the archetype used to create the composer instance. It contains the following:

- `profiles` - The profiles that's added to the composer
- `profileNames` - Names of the profiles to use to compose the final configuration
- `configFilename` - Name of the webpack configuration file. ie: `webpack.config.js`
- `keepCustomProps` - Flag to indicate whether to keep the custom props in the final configuration.

#### Examples

Below are two examples showing `webpack.config.js`, that is placed in `archetype/config/webpack/webpack.config.js`:

##### Merging

Lodash's merge method doesn't concatenate arrays, but you can provide a customizer to make the change.

This example shows a function that merges a configuration into the final configuration with a custom function for handling array concatenation.

```js
const _ = require("lodash");

module.exports = function(composer, options, compose) {
  const config = compose();
  _.merge(
    config,
    {
      // your custom webpack config
    },
    (a, b) => {
      return Array.isArray(a) && Array.isArray(b) ? [].concat(a).concat(b) : undefined;
    }
  );
  return config;
};
```

##### Custom Composing

This example completely removes the `_extract-style` partial from the composer and adds a custom partial for handling styles.

```js
module.exports = function(composer, options, compose) {
  // add custom-style partial to the composer
  composer.addPartial("custom-style", {
    // contains the actual webpack configs for this partial
  });

  // disable the _extract-style partial from _base profile
  // and add custom-style partial to it with the same order
  const baseProf = composer.getProfile("_base");
  const stylePartProf = baseProf.getPartial("_extract-style");
  stylePartProf.enable = false; // disable it
  baseProf.setPartial("custom-style", { order: stylePartProf.order });
};
```

#### App Archetype's partials and profiles

The app archetype's partials can be found under `electrode-archetype-react-app-dev/config/webpack/partials/index.js`.

There is always a `_base` profile.

Each webpack configuration adds another profile named according to the file.

For example, `webpack.config.hot.js` adds a profile `_hot`.

The file `webpack.config.js` adds a profile named `_production`.


### Customize with your own config file

To customize directly with your own config file, you need to set the environment flag `USE_APP_WEBPACK_CONFIG` to `true` or `false` based on which custom application webpack config file will be used. The default is the archetype supplied configs.

Following is an example of a `webpack.config.js` config file that you would place in your application root directory.
```js
const { compose, env, options } = require("electrode-archetype-react-app-dev/config/webpack");
const WebpackHookPlugin = require("webpack-hook-plugin");

const wConfig = compose(options);
if (env === "development") {
    const webpackHook = new WebpackHookPlugin({
        onBuildStart: ['echo "Webpack Build starts"'],
        onBuildEnd: ['echo "Webpack Build ends"']
    });

    wConfig.plugins.push(webpackHook);
}

module.exports = wConfig;
```
The highlight of this direct customizing option is that you can either extend the default configs or you can create your own custom config.

The `electrode-archetype-react-app-dev/config/webpack` file exports similar parameters as in [Customize Function](#customize-function).

- `env` - property that passes the current environment (development/prodution/test).
- `options` - The [options](#options) for the app archetype's webpack configuration composition.
- `compose` - The [webpack-config-composer] instance that the app archetype has setup. It contains all the webpack partials and composer profiles from the app archetype.

You can find this example in [one of the sample applications](https://github.com/electrode-io/electrode/blob/master/samples/hapi-app/webpack.config.js).

[webpack-config-composer]: https://www.npmjs.com/package/webpack-config-composer
