"use strict";

const Path = require("path");
const Fs = require("fs");
const logger = require("./logger");

function makeAppMode(prodDir, reactLib) {
  const client = "client";
  const server = "server";

  let srcDir = "";
  let libDir = "";
  const savedFile = Path.join(prodDir, ".app-mode.json");

  const loadSavedAppMode = () => {
    const savedFileFP = Path.resolve(savedFile);
    if (Fs.existsSync(Path.resolve("src", client)) || Fs.existsSync(Path.resolve("src", server))) {
      srcDir = "src";
      libDir = "lib";
    } else if (Fs.existsSync(savedFileFP)) {
      return JSON.parse(Fs.readFileSync(savedFileFP));
    }

    return {};
  };

  const saved = loadSavedAppMode();

  if (!srcDir) {
    logger.info(`There's a new src/lib mode that doesn't need babel-register.`);
  }

  reactLib = reactLib || "react";

  const posixify = s => s.replace(/\\/g, "/");

  const envKey = "APP_SRC_DIR";
  return Object.assign(
    {
      reactLib,
      savedFile,
      envKey,
      isSrc: !!srcDir,
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
      src: {
        dir: srcDir,
        client: posixify(Path.join(srcDir, client)),
        server: posixify(Path.join(srcDir, server))
      },
      lib: {
        dir: libDir,
        client: posixify(Path.join(libDir, client)),
        server: posixify(Path.join(libDir, server))
      }
    },
    saved
  );
}

module.exports = makeAppMode;
