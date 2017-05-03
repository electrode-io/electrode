# What are Archetypes?

> Archetypes are encapsulated boilerplates for centralizing your project configurations, workflows and dependencies.

An archetype is an npm module template, which is a “superclass” of a module, think inheritance for npm modules but not one that is used to generate code files and then discarded. Archetypes provide something that is quite far off from what frameworks and app generators provide.

Let’s say that you are developing many different modules and all those modules require you to have very similar configs, scripts and dependencies, you can use the same archetype for all of them. With a generator like Yeoman, you would run the generator once, and it would output your module’s boilerplate and all is fine. However, if you ever wanted to change dependencies, and have that change propagate through to each and every module, you would have to manually go through each module and update those dependencies by hand.

> Archetypes help to solve the problem of updating module boilerplates, by providing a single source of truth, that all of your modules inherit from.

If after developing hundreds of modules \( say, React components \), you decide to change your build script, and that build script requires a new dependency, you can change it once in the archetype. Once all of the other modules run `npm install`, they will get the updated build scripts as well as the updated dependencies.

Electrode archetypes are a way for every electrode module to share common scripts, workflows, dependencies and best practices that can be updated in real time. That update will then propagate to every module that inherits from that specific archetype.

> Electrode archetypes:
>
> * [electrode-archetype-react-app](https://github.com/electrode-io/electrode#app-archetype): Electrode Archetype for Apps.
>
> * [electrode-archetype-react-component](https://github.com/electrode-io/electrode-archetype-react-component): Electrode archetype for react components.
>
> * [electrode-archetype-njs-module-dev](https://github.com/electrode-io/electrode-archetype-njs-module-dev): Electrode archetype for server components.

#### Features

Archetypes come loaded with the latest technologies for developing, bundling, testing and deployment workflows.

* Generate/Build production bundles and assets.
* Transpile your JavaScript using Babel.
* Running eslint rules for client and server JavaScript and their tests.
* Running unit tests for client and server \(Karma/Mocha\).
* Running functional tests.
* Generate code coverage results for client and server \(Istanbul\).
* Run a webpack-dev-server for hot reloading of jsx changes.
* Single source of truth for all dependencies.
* Single source for all development, bundling, testing and deployment related workflows.

#### What configs exist inside archetypes?

* Webpack
* Babel
* Eslint
* Karma/Mocha/Istanbul

#### Webpack config setup

Let's peek under the hood into the webpack setup workflow.

_webpack.config.js_ Webpack configuration entrypoint

```
var _ = require("lodash");
var mergeWebpackConfig = require("webpack-partial").default;

var baseConfig = require("./base.js");
var defineConfig = require("./partial/define.js");
var optimizeConfig = require("./partial/optimize");
var localesConfig = require("./partial/locales");
var productionSourcemapsConfig = require("./partial/sourcemaps-remote");

module.exports = _.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  localesConfig(),
  defineConfig(),
  productionSourcemapsConfig()
)();
```

_Webpack Base Config_

```
var baseConfig = {
  cache: true,
  context: context,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        debug: false
      }
    })
  ],
  entry: appEntry(),
  output: {
    path: Path.resolve("dist", "js"),
    pathinfo: inspectpack, // Enable path information for inspectpack
    publicPath: "/js/",
    chunkFilename: "[hash].[name].js",
    filename: "[name].bundle.[hash].js"
  },
  resolve: {
    modules: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      AppMode.isSrc && Path.resolve(AppMode.src.dir) || null
    ]
      .concat(archetype.webpack.modulesDirectories)
      .concat([process.cwd(), "node_modules"])
      .filter(_.identity),
    extensions: [".js", ".jsx", ".json"]
  },
  resolveLoader: {
    modules: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      Path.resolve("lib"),
      process.cwd(),
      "node_modules"
    ].filter(_.identity)
  }
};
```

#### What workflows exist inside archetypes?

Workflows are tasks exposed via npm scripts & gulp as part of the [electrode-archetype-react-app](https://github.com/electrode-io/electrode#app-archetype), type `gulp` on your command prompt to see the full list of workflow tasks.

```
$ gulp
[16:56:36] Using gulpfile ~/walmart-oss/test-generator-electrode-app/test-app/gulpfile.js
[16:56:36] Starting 'help'...

Usage
  gulp [TASK] [OPTIONS...]

Available tasks
  build ............................ Build your app's client bundle for production
                                       tasks: ["build-dist"]
  build-analyze -------------------- Build your app's client bundle for production and run bundle analyzer
                                       tasks: ["build-dist","optimize-stats"]
                                       deps: [".optimize-stats"]
  build-browser-coverage ........... Build browser coverage
                                       tasks: ["clean-dist",".build-browser-coverage-1","build-dist:flatten-l10n","build-dist:clean-tmp"]
  build-dev-static ----------------- Build static copy of your app's client bundle for development
                                       tasks: ["clean-dist","build-dist-dev-static"]
  build-dist .......................   tasks: ["clean-dist","build-dist-min","build-dist:flatten-l10n","generate-service-worker","build-dist:clean-tmp"]
  build-webpack-stats-with-fullpath  Build static bundle with stats.json containing fullPaths to inspect the bundle on electrode-electrify

  etc ...
```

Let's dive a little deeper into an example workflow `gulp build` task that is provided by the archetype for a universal React application.

#### gulp build

This task produces a production ready js, css bundle. Running `gulp build` will run through a few other gulp tasks to help you build your application for a production environment generating a minified bundle ready to use.

The following tasks will be run in order:

* `clean-dist`: Delete the old `dist/` folder

* `build-dist-min`: Run webpack.config.js This particular production webpack config will be merged with the base config that is located [here.](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/config/webpack/base.js) Each of the archetypes webpack configs use lodash's [flow](https://lodash.com/docs/4.16.4#flow) and [webpack-partial](https://github.com/webpack-config/webpack-partial) to compose together functions that merge partial webpack configs together with the base config allowing for a modular configuration file.

```
// the production webpack config
// _.flow is used to compose functions
module.exports = _.flow(
  // use webpack-partial binding it to a the baseConfig  
  mergeWebpackConfig.bind(null, {}, baseConfig),
  // optimize.js
  optimizeConfig(),
  // locals.js
  localesConfig(),
  // define.js
  defineConfig(),
  // sourcemaps-remote.js
  productionSourcemapsConfig()
)();
```

The production webpack config is merged together with the base config and the following partials:

* [optimize.js](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/config/webpack/partial/optimize.js): Apply webpack's dedupe plugin to deduplicate similar or equal files from the output bundle in addition to Uglifying the output using the UglifyJS plugin

* [locales.js](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/config/webpack/partial/locales.js): Handle possible dynamic requires within moment.js, so webpack does not include all of the language files

* [define.js](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/config/webpack/partial/define.js): Define a production environment for webpack so it can remove non production code.

* [sourcemaps-remote.js](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/config/webpack/partial/sourcemaps-remote.js): Create sourcemaps.

  * `build-dist:flatten-l10n`: Run a script to extract localized messages from a file located in a temporary folder generated by the build and write them to a json file in the dist folder. This script is located [here.](https://github.com/electrode-io/electrode-archetype-react-app/blob/master/scripts/l10n/flatten-messages.js)
  * `generate-service-worker`: Electrode's React application archetype has built in support for [service workers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers). This gulp task will take a service worker precache configuration file \(if it exists, electrode does not provide it by default\) and generate a new service worker file for caching of static assets with service workers.
  * `build-dist:clean-tmp`: Delete the .tmp folder generated by the build.

The output of `gulp build` will look something like this:

```
Hash: 095d27720d0a224d3f5a
Version: webpack 1.13.2
Time: 6607ms
                                    Asset       Size  Chunks             Chunk Names
           bundle.095d27720d0a224d3f5a.js     246 kB       0  [emitted]  main
           style.095d27720d0a224d3f5a.css  182 bytes       0  [emitted]  main
../map/bundle.095d27720d0a224d3f5a.js.map    2.42 MB       0  [emitted]  main
../map/style.095d27720d0a224d3f5a.css.map  107 bytes       0  [emitted]  main
                     ../server/stats.json  233 bytes          [emitted]
                ../isomorphic-assets.json  239 bytes          [emitted]
```



