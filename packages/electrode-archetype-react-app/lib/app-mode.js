"use strict";

var Path = require("path");
var Fs = require("fs");

function makeAppMode(prodDir) {
  const client = "client";
  const server = "server";

  let srcDir = "";
  let libDir = "";
  let saved = {};
  const savedFile = Path.join(prodDir, ".app-mode.json");
  const savedFileFP = Path.resolve(savedFile);
  if (Fs.existsSync(Path.resolve("src", client)) || Fs.existsSync(Path.resolve("src", server))) {
    srcDir = "src";
    libDir = "lib";
  } else if (Fs.existsSync(savedFileFP)) {
    saved = JSON.parse(Fs.readFileSync(savedFileFP));
  }

  if (!srcDir) {
    console.log(`Just FYI: There's a new src/lib mode that doesn't need babel-register.`);
  }

  const envKey = "APP_SRC_DIR";
  return Object.assign({
    savedFile,
    envKey,
    isSrc: !!srcDir,
    setEnv: (dir) => {
      if (dir) {
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
      client: Path.join(srcDir, client),
      server: Path.join(srcDir, server)
    },
    lib: {
      dir: libDir,
      client: Path.join(libDir, client),
      server: Path.join(libDir, server)
    }
  }, saved);
}

module.exports = makeAppMode;
