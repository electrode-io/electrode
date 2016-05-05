"use strict";
const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");
const Promise = archDevRequire("bluebird");
const path = require("path");
const fs = Promise.promisifyAll(archDevRequire("fs-extra"));
const _ = archDevRequire("lodash");

const babPath = "./node_modules/@walmart/electrode-archetype-react-component/config/babel/.babelrc";
const babelConfig = JSON.parse(fs.readFileSync(path.resolve(babPath), "utf8"));

archDevRequire("babel-core/register")(babelConfig);

const electrodeServer = archDevRequire("@walmart/electrode-server");
const defaultElectrodeServerConfig = require("./default-electrode-server-config");

const overrideConfigPath = path.join(process.cwd(), "archetype-demo-server.config.js");

const doesFileExist = function doesFileExist(filePath) {
  try {
    // Throws if not found otherwise returns undefined
    fs.accessSync(filePath, fs.F_OK);

    return true;
  } catch (e) {
    return false;
  }
};

const getConfigOverrides = function getConfigOverrides(filePath) {
  return doesFileExist(filePath) ? require(filePath) : {}; // eslint-disable-line global-require
};

const localConfig = getConfigOverrides(overrideConfigPath);
const demoServerConfig = _.merge(defaultElectrodeServerConfig, localConfig);

electrodeServer(demoServerConfig);
