/**
 * Webpack hot configuration
 */
const path = require("path");

const assign = require("lodash/object/assign");
const compose = require("lodash/function/flowRight");
const find = require("lodash/collection/find");

// config partials
const babelConfig = require("./partial/babel");
const extractStylesConfig = require("./partial/extract");
const staticConfig = require("./partial/static");

// NOTE: webpack.config.dev.js depends on webpack.config.js
const baseConfig = require("./webpack.config.dev");

const createConfig = compose(
  babelConfig(),
  extractStylesConfig(),
  staticConfig()
);

// add `module.loaders`
const config = createConfig({
  devtool: "source-map",
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:2992",
    "webpack/hot/only-dev-server",
    baseConfig.entry
  ]
});

/****
 * Hot Mods
 */
const babel = find(config.module.loaders, { name: "babel" });

// update babel loaders for hot loading
babel.loaders = [].concat(["react-hot"], babel.loaders);
babel.include = path.join(process.cwd(), "client");

module.exports = assign({}, baseConfig, config);

