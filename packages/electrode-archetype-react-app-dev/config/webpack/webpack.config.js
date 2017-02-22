"use strict";

const _ = require("lodash");
const mergeWebpackConfig = require("webpack-partial").default;
const WebpackConfig = require("webpack-config").default;
const getRootConfig = require("./get-root-config");
const addDllReferences = require("./add-dll-references");

const baseConfig = require("./base.js");
const defineConfig = require("./partial/define.js");
const optimizeConfig = require("./partial/optimize");
const localesConfig = require("./partial/locales");
const productionSourcemapsConfig = require("./partial/sourcemaps-remote");
const failConfig = require("./partial/fail");
const simpleProgress = require("./partial/simple-progress");

const config = new WebpackConfig().merge(_.flow(
  mergeWebpackConfig.bind(null, {}, baseConfig),
  optimizeConfig(),
  localesConfig(),
  defineConfig(),
  productionSourcemapsConfig(),
  failConfig(),
  simpleProgress()
)()).merge(getRootConfig("webpack.config.js"));

addDllReferences(config);

module.exports = config;
