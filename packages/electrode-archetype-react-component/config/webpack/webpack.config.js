"use strict";
const path = require("path");

const archDevRequire = require("electrode-archetype-react-component-dev/require");
const _ = archDevRequire("lodash");


const babelConfig = require("./partial/babel.js");
const stylesConfig = require("./partial/styles.js");
const defineConfig = require("./partial/define.js");
const fontsConfig = require("./partial/fonts");
const imageConfig = require("./partial/images.js");
const jsonConfig = require("./partial/json.js");
const optimizeConfig = require("./partial/optimize.js");
const sourceMapsConfig = require("./partial/sourcemaps.js");
const stylusConfig = require("./partial/stylus.js");

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
  debug: false,
  entry: path.join(process.cwd(), "src/index.js"),
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "bundle.min.js",
    libraryTarget: "umd"
  },
  resolve: {
    root: [archetypeNodeModules, archetypeDevNodeModules, process.cwd()],
    modulesDirectories: ["node_modules"],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, archetypeDevNodeModules, process.cwd()]
  }
};

const createConfig = _.flowRight(
  babelConfig(),
  stylesConfig(),
  defineConfig(),
  fontsConfig(),
  imageConfig(),
  jsonConfig(),
  optimizeConfig(),
  sourceMapsConfig()
);

module.exports = createConfig(baseConfiguration);
