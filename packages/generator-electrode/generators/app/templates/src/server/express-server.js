"use strict";

const Promise = require("bluebird");
const express = require("express");
const app = express();
const path = require("path");
const _ = require("lodash");

const setStaticPaths = function() {
  app.use(express.static(path.join(__dirname, "../../dist")));
};

const setDevMiddleware = config => {
  try {
    const devSetup = require("electrode-archetype-react-app-dev/lib/webpack-dev-express");
    devSetup(app, "http", config.port);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.log("setup dev middleware failed", err);
    }
  }
};

const setRouteHandler = config =>
  new Promise((resolve, reject) => {
    const webapp = p => (p.startsWith(".") ? path.resolve(p) : p);
    const registerRoutes = require(webapp(config.webapp.module)); //eslint-disable-line

    return registerRoutes(app, config.webapp.options, err => {
      if (err) {
        console.error(err); //eslint-disable-line
        reject(err);
      } else {
        resolve();
      }
    });
  });

const startServer = config =>
  new Promise((resolve, reject) => {
    app.listen(config.port, err => {
      if (err) {
        reject(err);
      } else {
        //eslint-disable-next-line
        console.log(`\nApp listening on port: ${config.port}`);
        resolve();
      }
    });
  });

module.exports = function electrodeServer(userConfig, callback) {
  const promise = Promise.resolve(userConfig)
    .tap(setDevMiddleware)
    .tap(setStaticPaths)
    .tap(setRouteHandler)
    .tap(startServer);

  return callback ? promise.nodeify(callback) : promise;
};
