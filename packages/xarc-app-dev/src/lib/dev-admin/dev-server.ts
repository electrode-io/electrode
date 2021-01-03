/* eslint-disable @typescript-eslint/no-var-requires, no-console */

//
// indicate that app is running in webpack dev mode
// also set by @xarc/app/arch-clap.js
//
if (process.env.WEBPACK_DEV === undefined) {
  process.env.WEBPACK_DEV = "true";
}

const optionalRequire = require("optional-require")(require);
const WT = optionalRequire("worker_threads");

let devServer; // eslint-disable-line

if (!process.send) {
  if (WT && WT.parentPort) {
    (process as any).send = data => {
      WT.parentPort.postMessage(data);
    };
    WT.parentPort.on("message", msg => {
      if (msg === "kill") {
        if (devServer && devServer.stop) {
          devServer.stop();
        }
        setTimeout(() => WT.parentPort.postMessage("exit"), 10);
      }
    });
  } else {
    console.error("webpack dev server doesn't have process.send - continuing with an empty mock");
    (process as any).send = () => {
      //
    };
  }
}

import { startDevServer } from "./dev-server-start";
devServer = startDevServer();
