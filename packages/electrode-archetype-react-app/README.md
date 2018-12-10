# Archetype: Electrode React ~~Isomorphic~~ Universal App

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![devDependency Status][daviddm-dev-image]][daviddm-dev-url] [![npm downloads][npm-downloads-image]][npm-downloads-url]

A Walmart Labs flavored React Universal App archetype.

## Have a question?  Check the [FAQ](./FAQ.md)

## Installation

> NOTE: Generally you don't need to install these modules directly.  You should start your app by using our Yeoman [generator-electrode] or check our [Electrode getting started] guide.

However, if you are manually creating your app:

###### Install the two complementary modules

```bash
$ npm install --save electrode-archetype-react-app
$ npm install --save-dev electrode-archetype-react-app-dev
```

###### Add a `xclap.js`

The `xclap.js` should contain the following and be located in the root of your project

```js
require("electrode-archetype-react-app")();
```

## Usage

The primary interface to the archetype is a list of tasks you can invoke with clap to do your bidding.

To see the tasks, simply run:

```bash
$ clap
```

To invoke a task, for example, the `dev` task, run:

```bash
$ clap dev
```

## AppMode

The archetype supports two app modes.  The default legacy babel-register mode and the [src/lib mode](#srclib-mode).

In babel-register mode, you put your `client` and `server` code under your project's top level and your Node server requires installing babel-register to transpile your code during run time.  This is not recommended due to babel-register consuming resources.

In the [src/lib mode](#srclib-mode), you put your `client` and `server` code under the `src` directory and the `build` task will transpile them into the `lib` directory during build time.

> In the next major release, we plan to remove the babel-register mode.

#### babel-register mode `.babelrc`

> Note: If you opt-in to use the src/lib mode, then this is not applicable.  See [here](#srclib-babelrc) for more details.

If you are using babel-register mode, then you need to add a `.babelrc` in your app's top level directory to extend
[the archetype's babel configuration](config/babel/.babelrc) in order to apply the presets (ES2015, React) and the plugins like i18n. If your project needs additional Babel settings (like using stage 0 features) you can add them to this file. See the [Babel docs](https://babeljs.io/docs/usage/babelrc/) for more information.

```json
{
  "extends": "electrode-archetype-react-app/config/babel/.babelrc"
}
```

## Opt-in features

### Run time support API

For the things that should be initialized at your Node server's startup, they are all combined into a single API in the archetype as `support.load`.

Here is how you can use it:

In your `server/index.js`:

```js
const support = require("electrode-archetype-react-app/support");
const electrodeServer = require("electrode-server");
const electrodeConfippet = require("electrode-confippet");

support.load()
  .then(() => {
    return electrodeServer(electrodeConfippet.config);
  })
  .catch((e) => {
    console.log("Server start failed", e); // eslint-disable-line no-console
  });
```

If you are using this API, then things like isomorphic support and React module optimization are handled for you.

It accepts a single `options` object, with the following supported fields:

-   `babelRegister` - Set to `false` to disable loading `babel-register`
    -   `babel-register` is loaded by default only in babel-register app mode, and off in src/lib app mode.
-   `optimizeModulesForProduction` - Set to `false` to disable loading optimized copy of React modules.
    -   also disabled unless `NODE_ENV=production`
    -   If this is an object, then it's used as `options` for `optimizeModulesForProduction`
-   `cssModuleHook` - Set to `false` to disable loading [css-module-hook]
    -   If this is an object, then it's used as `options` for `cssModuleHook`
-   `isomorphicExtendRequire` - Set to `false` to disable loading isomorphic-loader support

#### optimizeModulesForProduction Options

The `optimizeModulesForProduction` options supported the following flags:

-   `quiet` - Boolean to turn off console.log messages
-   `force` - Boolean to force enable regardless of `NODE_ENV`

### src/lib Mode

In order to avoid requiring run time babel transpilation, this archetype supports a src/lib app mode.  To use this, you need to put your `client` and `server` into a `src` directory.  The archetype's `build` task will transpile those into the `lib` directory.

> The archetype `build` task will only overwrite `lib/client` and `lib/server`.  So you can put other normal code under `lib` if you want.
>
> If you are migrating from babel-register mode, then you should move your code to `src` directory.  For the most part, there should be very little you need to change except if you have code that refers to those two directories explicitly from outside.

You will also need to use the [Run time support API](#run-time-support-api) to initialize your server startup.

#### `src` or `lib`?

So where is your code being executed from?  `src` or `lib`?  Actually, it could be either, depending on `NODE_ENV`.

If you need to refer to your client or server code from outside, you can use [`APP_SRC_DIR` environment variable](#app_src_dir) to automatically refer to the directory where code is being executed from.

For UI code under `src/client` or `test/client`, webpack config sets `src` as a root so you can refer to code in `src/client` with `"client/foo"`.

For example:

```js
import Hello from "client/components/hello"
```

For code under `src/server`, you can refer to client with `"../client/foo"`.

##### development

In dev mode, your code will be executed from the `src` directory.  Your client code is transpiled and packed by `webpack-dev-server` on the fly.  Your node server is executed by `babel-node`.

##### production

In prod mode, your client code is being loaded from the bundle packed by webpack.  On server side, SSR will load client code from `lib` and your node server being executed from the `lib/server` directory.  ie: `NODE_ENV=production node lib/server/index.js`

#### src/lib .babelrc

In the src/lib mode, an independent `.babelrc` file will be automatically generated for you in both `src/client` and `src/server`.  The one for client is setup for React and the one for server is setup for the NodeJS version you are using.

#### APP_SRC_DIR

An env variable `APP_SRC_DIR` is always set by the [Run time support API](#run-time-support-api) to indicate where your code is running from.  If your app config needs to refer to some code there, you can use this.

**NOTE:** The dir path set in `$APP_SRC_DIR` will include the trailing `/` automatically.  ie: `src/` or `lib/`

For example, to pass your server side React app entry to react-webapp:

```js
{
  "plugins": {
    "electrode-react-webapp": {
      "options": {
        "pageTitle": "Getting Started",
        "paths": {
          "/{args*}": {
            "view": "index",
            "content": {
              "module": "./{{env.APP_SRC_DIR}}/server/app"   // Note the use of APP_SRC_DIR here
            }
          }
        }
      }
    }
  }
}
```

#### NPM Prune for production

Starting with version 9.4.0, the archetypes now fully support your application running without the development archetype.  Make sure you install `electrode-archetype-react-app` under your `dependencies` and `electrode-archetype-react-app-dev` under `devDependencies` and you can run `npm prune --production` on your app to clear `devDependencies`.  If you are using the electrode-build script in your build job, you can set the build parameter `PRUNE_DEV_DEPENDENCIES` to true.

> NOTE: if your app runs in production mode but rely on something else you've put under `devDependencies` then doing `npm prune --production` will still break your app.

#### Define client entry points

By default, the archetype uses `client/app.js` or `client/app.jsx` as a client entry point. Alternatively,
you can define multiple entry points for your application, so the Webpack will create bundles for each app
entry point. To do that, place `entry.config.js` module into your app's `client` directory:

Here is an **example** of `entry.config.js`:

```js
module.exports = {
  "web": "./app-web.js",
  "ios": "./app-ios.js",
  "android": "./app-android.js"
};
```

## NodeJS Server Required Runtime Support

If you don't use the `support.load` API to get the runtime support needed for some of the features in your NodeJS server, then you need to initialize them manually during your server startup.

### `babel-core/register`

If you are using the babel-register mode, then you need to load the `babel-register` module.

If you don't have a build step for your server code, then you must transpile
on the fly using `babel-register`. For performance reasons, we recommend
whitelisting the `react` module to be transpiled as well, so that the
`transform-node-env-inline` plugin gets applied to the React codebase:

```js
require("babel-core/register")({
  ignore: /node_modules\/(?!react\/)/
});
```

### `cssModuleHook` for isomorphic CSS modules

If you want to enable isomorphic css modules, the server needs to know how to import css files
and generate unique class names.
The archetype can handle this for you using the `supports` module. In your server entry point:

```js
var supports = require("electrode-archetype-react-app/supports");

supports.cssModuleHook();
```

## Extending Webpack Configuration

The webpack config for your app is being generated by the archetype. While composing the webpack config, the archetype looks for the `archetype/config` folder at the project root of your app.

In order to override or extend the webpack configuration you should create a file under `archetype/config/webpack`.

Your directory structure should look like this:

```bash
archetype
└── config
    └── webpack
        └── webpack.config.js
```

Where `webpack.config.js` is your extended or overriding webpack config, for example:

```js
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

const config = {
  plugins: [
    new BellOnBundlerErrorPlugin()
  ]
};

module.exports = config;
```

Built with :heart: by [Team Electrode](https://github.com/orgs/electrode-io/people) @WalmartLabs.

---

[npm-image]: https://badge.fury.io/js/electrode-archetype-react-app.svg

[npm-url]: https://npmjs.org/package/electrode-archetype-react-app

[daviddm-image]: https://david-dm.org/electrode-io/electrode/status.svg?path=packages/electrode-archetype-react-app

[daviddm-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-app

[daviddm-dev-image]: https://david-dm.org/electrode-io/electrode/dev-status.svg?path=packages/electrode-archetype-react-app

[daviddm-dev-url]: https://david-dm.org/electrode-io/electrode?path=packages/electrode-archetype-react-app?type-dev

[npm-downloads-image]: https://img.shields.io/npm/dm/electrode-archetype-react-app.svg

[npm-downloads-url]: https://www.npmjs.com/package/electrode-archetype-react-app

[generator-electrode]: https://www.npmjs.com/package/generator-electrode

[electrode getting started]: http://www.electrode.io/docs/get_started.html
