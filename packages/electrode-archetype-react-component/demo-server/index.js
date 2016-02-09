"use strict";
const Promise = require("bluebird");
const path = require("path");
const fs = Promise.promisifyAll(require("fs-extra"));

const babPath = "./node_modules/@walmart/electrode-archetype-react-component/config/babel/.babelrc";
const babelConfig = JSON.parse(fs.readFileSync(path.resolve(babPath), "utf8"));

require("babel-core/register")(babelConfig);

const _ = require("lodash");
const electrodeServer = require("@walmart/electrode-server");
const defaultElectrodeServerConfig = require("./default-electrode-server-config");

const readFileAsJSON = function readFileAsJSON(filePath) {
  return fs.readFileAsync(filePath, "utf8")
    .then(JSON.parse);
};

const doesFileExist = function doesFileExist(filePath) {
  try {
    return fs.accessSync(filePath, fs.F_OK);
  } catch (e) {
    return false;
  }
};

const getConfigOverrides = function getConfigOverrides(filePath) {
  return doesFileExist(filePath) ? readFileAsJSON(filePath) : {};
};

Promise.all([
  defaultElectrodeServerConfig,
  getConfigOverrides()
])
  .then((config) => _.merge.apply(null, config))
  .then(electrodeServer)
  .catch((err) => {
    throw err;
  })
  .catch(() => {
    process.exit(1); //eslint-disable-line no-process-exit
  });
