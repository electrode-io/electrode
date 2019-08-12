"use strict";

const Fs = require("fs");
const xsh = require("xsh");
const partialConfigs = require("../partial");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");
const logger = require("electrode-archetype-react-app/lib/logger");

function isWebpackDirectlyControlled() {
  const customFilePath = Path.join(process.cwd(), "webpack.config.js");
  logger.info(`Webpack directly controlled by the App from ${customFilePath}`);
  return Fs.existsSync(customFilePath);
}

/* eslint-disable max-statements */
function generateConfig(options) {
  options = Object.assign({ profileNames: [] }, options);
  const composer = new WebpackConfigComposer();
  composer.addProfiles(options.profiles);
  composer.addProfile("user", {});
  composer.addPartials(partialConfigs.partials);

  let customConfig;
  const customDirs = isWebpackDirectlyControlled() ? [] : [process.cwd(), Path.resolve("archetype/config/webpack")];

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

module.exports = generateConfig;
