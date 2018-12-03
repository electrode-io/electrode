"use strict";

const Path = require("path");
const Fs = require("fs");
const childProcess = require("child_process");
const { logger } = require("ignite-core");
const _ = require("lodash");
const chalk = require("chalk");

const Lib = {};
let baseYoPath;

function searchYoBin(name) {
  let count = 0;
  let curDir = baseYoPath;

  const makeFile = dir => {
    dir = Path.join(dir, "."); // remove trailing / or \
    /* istanbul ignore else */
    if (!dir.endsWith("node_modules")) {
      dir = Path.join(dir, "node_modules");
    }
    return Path.join(dir, ".bin", name);
  };

  // eslint-disable-next-line
  while (++count < 50) {
    const yoBinFile = makeFile(curDir);

    if (Fs.existsSync(yoBinFile)) {
      return yoBinFile;
    }

    const tmp = Path.join(curDir, "..");
    if (tmp === curDir) break;
    curDir = tmp;
  }

  return Path.join(baseYoPath, "..", "node_modules", name);
}

module.exports = Object.assign(Lib, {
  platform: {
    win32: function win32(name) {
      const yoPath = searchYoBin("yo.cmd");

      return childProcess.spawn("cmd", ["/c", yoPath, name], {
        stdio: "inherit"
      });
    },

    posix: function posix(name) {
      const yoPath = searchYoBin("yo");

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

    /*
     * Avoid the hanging case when child process exits on its own by any reason.
     */
    child.on("exit", code => {
      if (code === 0) {
        logger.log(chalk.green(`Generator: ${name} exited without any errors.`));
      } else {
        logger.log(
          chalk.red(
            `Generator: ${name} failed with exit code ${code}.` +
              ` This could mean that it didn't generate your app properly. Please double check.`
          )
        );
      }
      return process.exit(code); //eslint-disable-line no-process-exit
    });
  },

  setBaseYoPath: function setBaseYoPath(path) {
    baseYoPath = path || __dirname;
  }
});

module.exports.setBaseYoPath();
