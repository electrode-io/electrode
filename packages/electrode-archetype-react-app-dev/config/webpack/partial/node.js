"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const webpack = require("webpack");
const FunctionModulePlugin = require("webpack/lib/FunctionModulePlugin");
const logger = require("electrode-archetype-react-app/lib/logger");

module.exports = function(options) {
  const config = options.currentConfig;

  if (
    process.env.NODE_ENV === "production" &&
    config.target === undefined &&
    archetype.webpack.enableNodeSourcePlugin !== true
  ) {
    logger.info("Disabling NodeSourcePlugin for production");
    // disable NodeSourcePlugin by setting a custom target, and then apply the
    // plugins the original web target would've applied.
    // will be much easier once webapck with node: false option is released
    const output = config.output;
    config.target = () => undefined;
    config.plugins = [
      new webpack.JsonpTemplatePlugin(output),
      new FunctionModulePlugin(output),
      new webpack.LoaderTargetPlugin("web")
    ].concat(config.plugins);
  } else {
    logger.info(`Not disabling NodeSourcePlugin.  NODE_ENV: '${process.env.NODE_ENV}'`);
  }

  return {};
};
