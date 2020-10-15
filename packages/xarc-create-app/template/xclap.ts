import { loadXarcDevTasks } from "@xarc/app-dev/lib/dev-tasks";
import * as _ from "lodash";
import * as xrun from "@xarc/run";

require("@xarc/app")(xrun, {
  host: 'localhost',
  port: 3000,
  appServerPort: 3100,
  adminPort: 8991,
  adminLogLevel: 2,
  httpsPort: null,
  addOnFeatures: {
    "reactLib": "react",
    "karma": true,
    "sass": false,
    "mocha": true
  },
  webpackOptions: {
    webpackDev: true,
    devArtifactsPath: ".etmp",
    cssModuleSupport: true
  },
  babel: {
    enableTypeScript: true,
    enableFlow: false,
    proposalDecorators: false,
    transformClassProps: false
  }
});