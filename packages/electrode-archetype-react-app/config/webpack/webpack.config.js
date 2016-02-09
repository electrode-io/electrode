/***
 * Webpack base configuration (XXX production build config)
 */
const path = require("path");

const compose = require("lodash/function/flowRight");

// config partials
const babelConfig = require("./partial/babel");
const defineConfig = require("./partial/define");
const extractStylesConfig = require("./partial/extract");
const optimizeConfig = require("./partial/optimize");
const sourcemapsConfig = require("./partial/sourcemaps");
const staticConfig = require("./partial/static");
const statsConfig = require("./partial/stats");

// create module loaders factory
const createConfig = compose(
  babelConfig(),
  defineConfig(),
  extractStylesConfig(),
  optimizeConfig(),
  sourcemapsConfig(),
  staticConfig(),
  statsConfig()
);

const archetypeNodeModules = path.join(__dirname, "../../", "node_modules");
const modulesDirectories = ["client", "node_modules", "node_modules/@walmart"];

// create config
const config = createConfig({
  cache: true,
  context: path.join(process.cwd(), "client"),
  debug: false,
  entry: "./app.jsx",
  output: {
    path: path.join(process.cwd(), "dist/js"),
    filename: "bundle.[hash].js"
  },
  resolve: {
    root: [archetypeNodeModules, process.cwd()],
    modulesDirectories,
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [archetypeNodeModules, process.cwd()]
  }
});

module.exports = config;

