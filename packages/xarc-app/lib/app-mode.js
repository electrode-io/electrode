"use strict";

/* eslint-disable no-param-reassign */

const Path = require("path");
const Fs = require("fs");
const subappUtil = require("subapp-util");
const logger = require("./logger");
const constants = require("./constants");

/**
 * Figure out the mode app is setup.
 *
 * 1. src/client, src/server => lib
 * 2. src/{subapp-directories}, src/server => lib
 * 3. which react lib is being used (default react)
 *
 * And then setup the env APP_SRC_DIR so in dev mode code in src is executed
 * with run time compiler like @babel/register, but in prod mode transpiled
 * code in lib will be executed.
 *
 * @param {*} prodDir - directory to save data of the app mode
 * @param {*} reactLib - UI framework (react)
 *
 * @returns app mode data
 */
function makeAppMode(prodDir = constants.PROD_DIR, reactLib = "react") {
  const client = "client";
  const server = "server";

  let srcDir = "";
  let libDir = "";
  const savedFile = Path.join(prodDir, ".app-mode.json");

  const version = 1;

  const loadSavedAppMode = () => {
    const savedFileFP = Path.resolve(savedFile);
    const subApps = subappUtil.scanSubAppsFromDir("src");
    const hasSubApps = Object.keys(subApps).length > 0;

    //
    // app still has src directory in production mode so we know
    // app is definitely in the src/lib dir structure setup
    //
    if (
      hasSubApps ||
      Fs.existsSync(Path.resolve("src", client)) ||
      Fs.existsSync(Path.resolve("src", server))
    ) {
      srcDir = "src";
      libDir = "lib";
      return hasSubApps ? { subApps, hasSubApps } : {};
    } else if (Fs.existsSync(savedFileFP)) {
      const saved = JSON.parse(Fs.readFileSync(savedFileFP));
      if (saved.version === version) {
        return saved;
      }
      logger.warn(`${savedFile} version ${saved.version} not match ${version} - ignoring.`);
    }

    return {};
  };

  const saved = loadSavedAppMode();

  reactLib = reactLib || "react";

  const posixify = s => s.replace(/\\/g, "/");

  const envKey = "APP_SRC_DIR";

  return {
    reactLib,
    savedFile,
    envKey,
    setEnv: dir => {
      if (dir) {
        dir = posixify(dir);
        if (!dir.endsWith("/")) {
          dir += "/";
        }
        process.env[envKey] = dir;
      } else {
        delete process.env[envKey];
      }
    },
    getEnv: () => {
      return process.env[envKey];
    },
    hasEnv: () => {
      return !!process.env[envKey];
    },
    client,
    server,
    src: {
      dir: srcDir,
      client: posixify(Path.join(srcDir, client)),
      server: posixify(Path.join(srcDir, server))
    },
    lib: {
      dir: libDir,
      client: posixify(Path.join(libDir, client)),
      server: posixify(Path.join(libDir, server))
    },
    ...saved,
    version
  };
}

module.exports = makeAppMode;
