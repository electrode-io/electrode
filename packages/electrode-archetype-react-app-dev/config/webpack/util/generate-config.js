"use strict";

const partialConfigs = require("../partial");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

function generateConfig(options) {
  const composer = new WebpackConfigComposer();
  composer.addProfiles(options.profiles);
  composer.addPartials(partialConfigs.partials);

  const customConfig =
    optionalRequire(Path.resolve(options.configFilename)) ||
    optionalRequire(Path.resolve("archetype/config/webpack", options.configFilename));

  const keepCustomProps = options.keepCustomProps;
  const compose = () => composer.compose({ keepCustomProps }, options.profileNames);

  let config;

  if (customConfig) {
    if (_.isFunction(customConfig)) {
      config = customConfig(composer, options, compose);
    } else {
      config = _.merge(compose(), customConfig);
    }
  } else {
    config = compose();
  }

  logger.verbose("Final Webpack config", JSON.stringify(config, null, 2));

  return config;
}

module.exports = generateConfig;
