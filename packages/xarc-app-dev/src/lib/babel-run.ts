/* eslint-disable @typescript-eslint/no-var-requires */
/*
 * Start user's app server from src/server directory in dev mode.
 *
 * - If user has src/server/dev.js, then just requires that, and expect
 *   user does all the babel register setup etc in that file.
 * - otherwise load babel-register, with babel config to process files
 *   that are only under CWD and not within CWD/node_modules.
 *
 * This allows symlinked node modules to work in dev mode without babel
 * trying to load .babelrc or process files from them.
 *
 */
import Path from "path";
import { loadXarcOptions } from "../lib/utils";
import { util } from "@xarc/webpack";

const serverDir = process.argv[2] || "src/server";

let start;
const xarcOptions = loadXarcOptions();
const xarcCwd = xarcOptions.cwd;

try {
  // Try to load user's dev.js under src/server
  start = require(Path.resolve(xarcCwd, serverDir, "dev.js"));
} catch (e) {
  // fallback to default action that loads babel-register and then requires
  // src/server, under which there should be an index.js file.
  require("@babel/register")({
    ignore: [util.getBabelExclude(xarcOptions)],
    extensions: [".js", ".jsx"]
      .concat(xarcOptions.babel.enableTypeScript && [".ts", ".tsx"])
      .filter(x => x),
    cache: true
  });

  const fullServerDir = Path.resolve(xarcCwd, serverDir);

  start = require(fullServerDir);
}

if (typeof start === "function") {
  start();
}
