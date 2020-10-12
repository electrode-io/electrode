/* eslint-disable @typescript-eslint/no-var-requires */
export {};

/* eslint-disable no-console, no-magic-numbers, max-statements */

const Path = require("path");
const _ = require("lodash");
const { getXRequire } = require("isomorphic-loader");
const { refreshAllSubApps } = require("subapp-util");
import {
  WEBPACK_EVENT_ISOMORPHIC_CONFIG,
  WEBPACK_EVENT_REPORT,
  WEBPACK_EVENT_STATS
} from "./dev-admin/webpack-dev-relay";

class AppDevMiddleware {
  webpackDev: any;

  constructor() {
    this.webpackDev = {
      valid: false,
      hasErrors: false,
      hasWarnings: false,
      compileTime: Date.now()
    };
  }

  handleWebpackReport(data) {
    this.webpackDev.valid = data.valid;
    this.webpackDev.hasErrors = data.hasErrors;
    this.webpackDev.hasWarnings = data.hasWarnings;
    this.webpackDev.compileTime = Date.now();

    if (!data.valid) {
      getXRequire().deactivate();
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

    // activate extend require for isomorphic assets
    getXRequire().activate();

    return process.send({
      name: "app-ack",
      from: data.name,
      fromId: data.id,
      isomorphicStatus: "on"
    });
  }

  setup() {
    process.on("message", data => {
      switch (data.name) {
        case WEBPACK_EVENT_REPORT:
          this.handleWebpackReport(data);
          break;
        case WEBPACK_EVENT_ISOMORPHIC_CONFIG:
          getXRequire().initialize(data.config);
          break;
        case WEBPACK_EVENT_STATS:
          break;
      }
    });
    // notify dev-admin that app server started
    process.nextTick(() => process.send && process.send({ name: "app-setup" }));
  }
}

module.exports = AppDevMiddleware;
