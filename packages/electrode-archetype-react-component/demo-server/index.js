"use strict";
const archDevRequire = require("@walmart/electrode-archetype-react-component-dev/require");

const Promise = archDevRequire("bluebird");
const path = archDevRequire("path");
const fs = Promise.promisifyAll(archDevRequire("fs-extra"));
const _ = archDevRequire("lodash");

const babPath = require.resolve("@walmart/electrode-archetype-react-component/config/babel/.babelrc"); // eslint-disable-line
const babelConfig = JSON.parse(fs.readFileSync(babPath, "utf8"));

archDevRequire("babel-core/register")(babelConfig);

const electrodeServer = archDevRequire("@walmart/electrode-server");


const defaultElectrodeServerConfig = require("./default-electrode-server-config");

const getConfigOverrides = function getConfigOverrides(filePath) {
  try {
    return require(filePath); // eslint-disable-line global-require
  } catch (e) {
    return {};
  }
};

const localConfig = getConfigOverrides(path.join(process.cwd(), "archetype-demo-server.config.js"));

const demoServerConfig = _.merge(defaultElectrodeServerConfig, localConfig);

electrodeServer(demoServerConfig);
