"use strict";

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
const Path = require("path");

const serverDir = process.argv[2] || "src/server";

try {
  // Try to load user's dev.js under src/server
  require(Path.resolve(serverDir, "dev.js"));
} catch (e) {
  const cwdNM = Path.resolve("node_modules");
  const cwd = process.cwd();

  // fallback to default action that loads babel-register and then requires
  // src/server, under which there should be an index.js file.
  require("babel-register")({ only: x => {
    x = Path.normalize(x);
    return x.startsWith(cwd) && !x.startsWith(cwdNM);
  }});
  require(Path.resolve(serverDir));
}
