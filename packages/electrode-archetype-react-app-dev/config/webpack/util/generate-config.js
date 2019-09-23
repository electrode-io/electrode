"use strict";

const xsh = require("xsh");
const partialConfigs = require("../partial");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

function searchUserCustomConfig(options) {
  let customConfig;
  const customDirs = [process.cwd(), Path.resolve("archetype/config/webpack")];

  const foundDir = customDirs.find(d => {
    customConfig = optionalRequire(Path.join(d, options.configFilename));
    return !!customConfig;
  });

  if (foundDir) {
    const dir = xsh.pathCwd.replace(foundDir);
    logger.info(`Custom webpack config ${options.configFilename} loaded from ${dir}`);
  } else {
    const dirs = customDirs.map(d => xsh.pathCwd.replace(d)).join("; ");
    logger.info(`No custom webpack config ${options.configFilename} found in dirs ${dirs}`);
  }

  return customConfig;
}

//
// create a webpack config composer and add it to options as composer
// returns a new options copy
//
function initWebpackConfigComposer(options) {
  options = Object.assign({ profileNames: [] }, options);

  if (!options.composer) {
    const composer = (options.composer = new WebpackConfigComposer());

    composer.addProfiles(options.profiles);
    composer.addProfile("user", {});
    composer.addPartials(partialConfigs.partials);
  }

  return options;
}

function generateConfig(opts, archetypeControl) {
  const options = initWebpackConfigComposer(opts);

  const { composer } = options;

  if (options.profileNames.indexOf("user") < 0) {
    options.profileNames.push("user");
  }

  const keepCustomProps = options.keepCustomProps;

  const compose = () => {
    return composer.compose(
      { keepCustomProps },
      options.profileNames
    );
  };

  let config;

  const customConfig = archetypeControl && searchUserCustomConfig(options);

  if (customConfig) {
    if (_.isFunction(customConfig)) {
      config = customConfig(composer, options, compose);
    } else {
      composer.addPartialToProfile("custom", "user", customConfig);
    }
  }

  if (!config) config = compose();

  logger.verbose("Final Webpack config", JSON.stringify(config, null, 2));

  return config;
}

module.exports = { initWebpackConfigComposer, generateConfig };
