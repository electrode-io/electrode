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

//
// when first load, the app will start before webpack finish compiling
// so webpack will inform app that modules refreshed when they didn't.
// set a one time flag to avoid refreshing when first start up
//
let initialLoad = true;

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

    if (!initialLoad && !_.isEmpty(data.refreshModules)) {
      const { refreshed, failed } = data.refreshModules.reduce(
        (agg, moduleName) => {
          if (!moduleName.startsWith("webpack/runtime")) {
            try {
              const xarcOptions = loadXarcOptions();
              const xarcCwd = xarcOptions.cwd;
              const moduleFullPath = require.resolve(Path.resolve(xarcCwd, moduleName));
              delete require.cache[moduleFullPath];
              agg.refreshed.push(moduleName);
            } catch (err) {
              agg.failed.push({ moduleName, err });
            }
          }

          return agg;
        },
        { refreshed: [], failed: [] }
      );

      if (failed.length > 0) {
        const failMsg = failed
          .map(({ moduleName, err }) => `${moduleName} (${err.message})`)
          .join(", ");
        console.error(`Failed refresh modules for hot reload: ${failMsg}`);
      }

      if (refreshed.length > 0) {
        console.log(`Refreshed modules for hot reload: ${refreshed.join(", ")}`);
        refreshAllSubApps();
        refreshAllSubApps2();
      }
    }

    initialLoad = false;

    // activate extend require for isomorphic assets
    getXRequire().activate();

    return process.send({
      name: "app-ack",
      from: data.name,
      fromId: data.id,
      isomorphicStatus: "on"
    });
  }

  setup({ serverPort = undefined } = {}) {
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

    this.update({ serverPort, name: "app-setup" });
  }

  update({ serverPort, name = "app-update" }) {
    process.nextTick(() => process.send && process.send({ name, appPort: serverPort }));
  }
}
