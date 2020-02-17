"use strict";

/* eslint-disable no-unused-expressions */

const xsh = require("xsh");
const partialConfigs = require("../partials");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");
const logger = require("@xarc/app/lib/logger");

function searchUserCustomConfig(options) {
  let customConfig;
  const cwd = process.cwd();
  const archPath = Path.resolve("archetype/config/webpack");

  let configFilename = options.configFilename;
  if (!configFilename.startsWith("webpack.config")) {
    switch (configFilename) {
      case "production.js":
        configFilename = `webpack.config.js`;
        break;
      case "development.js":
        configFilename = `webpack.config.dev.js`;
        break;
      default:
        configFilename = `webpack.config.${configFilename}`;
        break;
    }
  }

  const customLocations = [
    {
      dir: cwd,
      file: configFilename
    },
    {
      dir: archPath,
      file: configFilename
    }
  ];

  const foundLocation = customLocations.find(d => {
    customConfig = optionalRequire(Path.join(d.dir, d.file));
    return !!customConfig;
  });

  if (foundLocation) {
    const dir = xsh.pathCwd.replace(foundLocation.dir);
    logger.info(`Custom webpack config ${foundLocation.file} loaded from ${dir}`);
  } else {
    const dirs = [cwd, archPath].map(d => xsh.pathCwd.replace(d)).join("; ");
    logger.info(`No custom webpack config ${configFilename} found in dirs ${dirs}`);
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

    options.profiles && composer.addProfiles(options.profiles);
    composer.addProfile("user", {});
    composer.addPartials(partialConfigs.partials);
    options.partials && composer.addPartials(options.partials);
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
    const r = composer.compose({ keepCustomProps, meta: true }, options.profileNames);
    logger.info("Composed webpack config from profiles:", r.profileNames.join(", "));
    logger.info("Webpack config partials:", r.partialNames.join(", "));
    return r.config;
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
