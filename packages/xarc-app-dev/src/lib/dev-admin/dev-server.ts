//
// indicate that app is running in webpack dev mode
// also set by @xarc/app/arch-clap.js
//
if (process.env.WEBPACK_DEV === undefined) {
  process.env.WEBPACK_DEV = "true";
}

import { startDevServer } from "./dev-server-start";
startDevServer();
