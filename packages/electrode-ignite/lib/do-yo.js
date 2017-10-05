"use strict";

const Path = require("path");
const childProcess = require("child_process");
const { logger } = require("ignite-core");
const _ = require("lodash");

const Lib = {};

module.exports = Object.assign(Lib, {
  platform: {
    win32: function win32(name) {
      const yoPath = Path.join(__dirname, "..", "node_modules", ".bin", "yo.cmd");

      return childProcess.spawn("cmd", ["/c", `${yoPath} ${name}`], {
        stdio: "inherit"
      });
    },

    posix: function posix(name) {
      const yoPath = Path.join(__dirname, "..", "node_modules", ".bin", "yo");

      return childProcess.spawn(yoPath, [name], {
        stdio: "inherit"
      });
    }
  },

  run: function run(name, platform) {
    const platformRun = _.get(Lib, ["platform", platform || process.platform], Lib.platform.posix);
    const child = platformRun(name);

    child.on("error", err => {
      logger.log(`Running ${name} generator failed: ${err.stack}.`);
    });
  }
});
