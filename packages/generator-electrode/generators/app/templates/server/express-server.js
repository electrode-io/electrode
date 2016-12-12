"use strict";
const Promise = require("bluebird");
const express = require("express");
const app = express();
const path = require("path");
const _ = require("lodash");
const defaultConfig = require("electrode-confippet").config;
const Confippet = require("electrode-confippet");

const loadConfigs = function (userConfig) {
  //use confippet to merge user config and default config

  if (_.get(userConfig, "plugins.electrodeStaticPaths.enable")) {
    userConfig.plugins.electrodeStaticPaths.enable = false;
  }
  return Confippet.util.merge(defaultConfig, userConfig);
};

const setStaticPaths = function () {
  app.use(express.static(path.join(__dirname,
    defaultConfig.$("plugins.electrodeStaticPaths.options.pathPrefix"))));
};

const setRouteHandler = () => new Promise((resolve, reject) => {
  const registerRoutes = require(path.resolve(defaultConfig.$("plugins.webapp.module"))); // eslint-disable-line
  return registerRoutes(app, defaultConfig.$("plugins.webapp.options"),
    (err) => {
      if (err) {
        console.error(err); // eslint-disable-line
        reject(err);
      } else {
        resolve();
      }
    }
  );
});

const startIOserver = () => new Promise((resolve) => {
  const io = require("socket.io")(5000); //eslint-disable-line global-require, no-magic-numbers
  io.on("connection", (socket) => socket.emit("hmr"));
  resolve();
});

const startServer = () => new Promise((resolve, reject) => {
  app.listen(defaultConfig.$("connections.default.port"), (err) => {
    if (err) {
      reject(err);
    } else {
      console.log("App listening on port:", defaultConfig.$("connections.default.port")); // eslint-disable-line
      resolve();
    }
  });
});

module.exports = function electrodeServer(userConfig, callback) {
  const promise = Promise.resolve({})
    .then(loadConfigs)
    .then(setStaticPaths)
    .then(setRouteHandler)
    .then(startIOserver)
    .then(startServer);

  return callback ? promise.nodeify(callback) : promise;
};
