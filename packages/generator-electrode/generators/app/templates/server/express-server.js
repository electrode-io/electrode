"use strict";
const Promise = require("bluebird");
const express=require("express");
const app = express();
const path = require("path");
const _ = require("lodash");
const defaultConfig = require("electrode-confippet").config;
const Confippet = require("electrode-confippet");

const loadConfigs = function(userConfig) {
  //use confippet to merge user config and default config
  if ( userConfig.plugins && userConfig.plugins.electrodeStaticPaths && userConfig.plugins.electrodeStaticPaths.enable ) {
    userConfig.plugins.electrodeStaticPaths.enable = false;
  }
  return Confippet.util.merge(defaultConfig,userConfig);
}

const setStaticPaths = function() {
  app.use(express.static(path.join(__dirname, defaultConfig.$("plugins.electrodeStaticPaths.options.pathPrefix"))));
}

const setRouteHandler = () => new Promise((resolve, reject) => {
  const registerRoutes = require(path.resolve(defaultConfig.$("plugins.webapp.module")));
  return registerRoutes(app, defaultConfig.$("plugins.webapp.options"),
    function (err) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    }
  );
});

const startServer = () => new Promise((resolve, reject) => {
  app.listen(defaultConfig.$("connections.default.port"), function(err) {
    if (err) {
      reject(err);
    } else {
      console.log('App listening on port:', defaultConfig.$("connections.default.port"));
      resolve();
    }
  });
});

module.exports = function electrodeServer(userConfig, callback) {
  const promise = Promise.resolve({})
  .then(loadConfigs)
  .then(setStaticPaths)
  .then(setRouteHandler)
  .then(startServer);

  return callback ? promise.nodeify(callback) : promise;
}
