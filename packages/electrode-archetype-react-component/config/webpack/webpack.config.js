"use strict";
const path = require("path");

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const _ = archDevRequire("lodash");
const webpack = archDevRequire("webpack");

const babelConfig = require("./partial/babel.js");
const stylesConfig = require("./partial/styles.js");
const defineConfig = require("./partial/define.js");
const fontsConfig = require("./partial/fonts");
const imageConfig = require("./partial/images.js");
const optimizeConfig = require("./partial/optimize.js");
const sourceMapsConfig = require("./partial/sourcemaps.js");

const archetypeNodeModules = path.join(__dirname, "../../", "node_modules");
const archetypeDevNodeModules = path.join(
  // A normal `require.resolve` looks at `package.json:main`. We instead want
  // just the _directory_ of the module. So use heuristic of finding dir of
  // package.json which **must** exist at a predictable location.
  path.dirname(require.resolve("electrode-archetype-react-component-dev/package.json")),
  "node_modules"
);

const baseConfiguration = {
  cache: true,
  entry: path.join(process.cwd(), "src/index.js"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.min.js",
    libraryTarget: "umd"
  },
  plugins: [
   new webpack.LoaderOptionsPlugin({
     debug: false
   })
  ],
  resolve: {
    modules: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      "node_modules",
      process.cwd()
    ],
    extensions: [".js", ".jsx"]
  },
  resolveLoader: {
    modules: [
      archetypeNodeModules,
      archetypeDevNodeModules,
      "node_modules",
      process.cwd()
    ]
  }
};

const createConfig = _.flowRight(
  babelConfig(),
  stylesConfig(),
  defineConfig(),
  fontsConfig(),
  imageConfig(),
  optimizeConfig(),
  sourceMapsConfig()
);

module.exports = createConfig(baseConfiguration);
