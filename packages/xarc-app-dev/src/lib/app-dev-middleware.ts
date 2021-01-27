/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console, no-magic-numbers, max-statements */

const Path = require("path");
const _ = require("lodash");
import { xAppRequire } from "@xarc/app";
const { getXRequire } = xAppRequire("isomorphic-loader");
const { refreshAllSubApps } = require("subapp-util");
const { refreshAllSubApps2 } = require("@xarc/subapp");
import {
  WEBPACK_EVENT_ISOMORPHIC_CONFIG,
  WEBPACK_EVENT_REPORT,
  WEBPACK_EVENT_STATS
} from "./dev-admin/webpack-dev-relay";

import { loadXarcOptions } from "./utils";

export class AppDevMiddleware {
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
          const xarcOptions = loadXarcOptions();
          const xarcCwd = xarcOptions.cwd;
          const moduleFullPath = require.resolve(Path.resolve(xarcCwd, m));
          delete require.cache[moduleFullPath];
        } catch (err) {
          //
        }
      });

      refreshAllSubApps();
      refreshAllSubApps2();
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
