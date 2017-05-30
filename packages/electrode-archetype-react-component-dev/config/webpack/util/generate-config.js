"use strict";

const partialConfig = require("../partial");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");

function generateConfig(options) {
  const composer = new WebpackConfigComposer();
  composer.addProfiles(options.profiles);
  composer.addPartials(partialConfig.partials);

  const customConfig = optionalRequire(Path.resolve(options.configFilename)) ||
    optionalRequire(Path.resolve("archetype/config/webpack", options.configFilename));
  const keepCustomProps = options.keepCustomProps;
  const compose = () => composer.compose({
    keepCustomProps
  }, options.profileNames);

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

  if (process.env.DUMP_WEBPACK_CONFIG) {
    console.log(JSON.stringify(config, null, 2));
  }

  return config;
}

module.exports = generateConfig;
