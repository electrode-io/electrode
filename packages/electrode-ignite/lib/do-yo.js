"use strict";

const Path = require("path");
const childProcess = require("child_process");
const { logger } = require("ignite-core");
const _ = require("lodash");

const Lib = {};
let baseYoPath = "";

module.exports = Object.assign(Lib, {
  platform: {
    win32: function win32(name) {
      baseYoPath = baseYoPath || __dirname;
      const yoPath = Path.join(
        baseYoPath,
        "..",
        "node_modules",
        ".bin",
        "yo.cmd"
      );

      return childProcess.spawn("cmd", ["/c", `${yoPath} ${name}`], {
        stdio: "inherit"
      });
    },

    posix: function posix(name) {
      baseYoPath = baseYoPath || __dirname;
      const yoPath = Path.join(baseYoPath, "..", "node_modules", ".bin", "yo");

      return childProcess.spawn(yoPath, [name], {
        stdio: "inherit"
      });
    }
  },

  run: function run(name, platform) {
    const platformRun = _.get(
      Lib,
      ["platform", platform || process.platform],
      Lib.platform.posix
    );
    const child = platformRun(name);

    child.on("error", err => {
      logger.log(`Running ${name} generator failed: ${err.stack}.`);
    });

    /*
    * Avoid the hanging case when child process exits on its own by any reason.
    */
    child.on("exit", (code, signal) => {
      logger.log(
        `Generator: ${name} terminated. Child process exited with code ${code}, signal ${signal}.`
      );
      return process.exit(code); //eslint-disable-line no-process-exit
    });
  },

  setBaseYoPath: function setBaseYoPath(path) {
    baseYoPath = path;
  }
});
