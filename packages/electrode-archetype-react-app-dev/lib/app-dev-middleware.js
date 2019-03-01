"use strict";

/* eslint-disable no-console, no-magic-numbers, max-statements */

const Path = require("path");
const _ = require("lodash");
const isomorphicExtendRequire = require("isomorphic-loader/lib/extend-require");
const { refreshAllSubApps } = require("subapp-util");

class AppDevMiddleware {
  constructor() {
    this.webpackDev = { valid: false, hasErrors: false, hasWarnings: false };
  }

  handleWebpackReport(data) {
    this.webpackDev.valid = data.valid;
    this.webpackDev.hasErrors = data.hasErrors;
    this.webpackDev.hasWarnings = data.hasWarnings;
    this.webpackDev.compileTime = Date.now();

    if (!data.valid) {
      isomorphicExtendRequire.deactivate();
      return process.send({
        name: "app-ack",
        from: data.name,
        fromId: data.id,
        isomorphicStatus: "off"
      });
    }

    if (!_.isEmpty(data.refreshModules)) {
      data.refreshModules.forEach(m => {
        try {
          const moduleFullPath = require.resolve(Path.resolve(m));
          delete require.cache[moduleFullPath];
        } catch (err) {
          //
        }
      });

      refreshAllSubApps();
    }

    return isomorphicExtendRequire.loadAssets(err2 => {
      if (err2) console.error("reload isomorphic assets failed", err2);
      return process.send({
        name: "app-ack",
        from: data.name,
        fromId: data.id,
        isomorphicStatus: "on"
      });
    });
  }

  setup() {
    process.on("message", data => {
      if (data.name === "webpack-report") {
        this.handleWebpackReport(data);
      }
    });
    setTimeout(() => {
      process.send({ name: "app-setup" });
    }, 100);
  }
}

module.exports = AppDevMiddleware;
