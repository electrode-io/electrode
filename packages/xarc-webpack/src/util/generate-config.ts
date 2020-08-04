/* eslint-disable @typescript-eslint/no-var-requires */

/* eslint-disable no-console, no-magic-numbers, no-unused-expressions, max-statements */

import * as _ from "lodash";
import * as Path from "path";

const xsh = require("xsh");
const partials = require("../partials");
const WebpackConfigComposer = require("webpack-config-composer");
const optionalRequire = require("optional-require")(require);
const logger = require("@xarc/app-dev/lib/logger");
const ck = require("chalker");

const xarcWebpackConfig = Symbol("Electrode X webpack config");

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
export function initWebpackConfigComposer(options) {
  options = Object.assign({ profileNames: [] }, options);

  if (!options.composer) {
    const composer = (options.composer = new WebpackConfigComposer());

    options.profiles && composer.addProfiles(options.profiles);
    composer.addProfile("user", {});
    composer.addPartials(partials);
    options.partials && composer.addPartials(options.partials);
  }

  return options;
}

export function generateConfig(opts, archetypeControl) {
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
    } else if (customConfig[xarcWebpackConfig]) {
      console.error(ck`<yellow>WARNING:
WARNING: Your custom webpack config file returned a config that contains Electrode webpack config.
WARNING: Assuming you want Electrode to start with your webpack config file.
WARNING: To supress this warning, please set env USE_APP_WEBPACK_CONFIG to true.
WARNING: </>`);
      config = customConfig;
    } else {
      composer.addPartialToProfile("custom", "user", customConfig);
    }
  }

  if (!config) config = compose();

  config[xarcWebpackConfig] = true;

  try {
    logger.verbose("Final Webpack config", JSON.stringify(config, null, 2));
  } catch (err) {
    logger.error("unable to stringify webpack config");
  }

  return config;
}
