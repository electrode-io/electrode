"use strict";

const xsh = require("xsh");
const partialConfigs = require("../partial");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const Path = require("path");
const _ = require("lodash");

/* eslint-disable max-statements */
function generateConfig(options) {
  options = Object.assign({ profileNames: [] }, options);
  const composer = new WebpackConfigComposer();
  composer.addProfiles(options.profiles);
  composer.addProfile("user", {});
  composer.addPartials(partialConfigs.partials);

  let customConfig;
  const customDirs = [process.cwd(), Path.resolve("archetype/config/webpack")];

  const foundDir = customDirs.find(d => {
    customConfig = optionalRequire(Path.join(d, options.configFilename));
    return !!customConfig;
  });
  if (foundDir) {
    const dir = xsh.pathCwd.replace(foundDir);
  } else {
    const dirs = customDirs.map(d => xsh.pathCwd.replace(d)).join("; ");
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

  return config;
}

module.exports = generateConfig;
