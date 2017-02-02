"use strict";

var Path = require("path");
Path = Path[process.platform] || Path;
var Fs = require("fs");
var pkg = require("../package.json");

const prodDir = ".prod";

function getInt(str, def) {
  if (str) {
    const n = parseInt(str, 10);
    if (n !== null && !isNaN(n)) {
      return n;
    }
  }

  return def;
}

function makeAppMode() {
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

function checkUserBabelRc() {
  const user = Path.resolve(".babelrc");
  if (Fs.existsSync(user)) {
    const userRc = JSON.parse(Fs.readFileSync(user).toString());
    if (Object.keys(userRc).length === 1 && typeof userRc.extends === "string" &&
      userRc.extends.indexOf(pkg.name) >= 0) {
      return "extendsOnly";
    } else {
      return "custom";
    }
  }

  return false;
}

function getArchetypeOptions() {
  var archetypeOptionsPath = Path.join(process.cwd(), "archetype", "config.js");
  var archetypeOptions;

  try {
    archetypeOptions = require(archetypeOptionsPath) || {};
  } catch (err) {
    archetypeOptions = {};
  }

  return archetypeOptions;
}


module.exports = {
  dir: Path.resolve(__dirname, ".."),
  pkg,
  Path,
  options: getArchetypeOptions(),
  AppMode: makeAppMode(),
  prodDir,
  eTmpDir: ".etmp",
  prodModulesDir: Path.join(prodDir, "modules"),
  checkUserBabelRc
};

//
// Try to set dev settings, if the dev archetype is available.
// It may have been removed for production deployment.
//
function loadDev() {
  const devPkgFile = "electrode-archetype-react-app-dev/package.json";
  let devPkg;
  try {
    devPkg = require(devPkgFile);
  } catch (e) { // eslint-disable-line
    module.exports.noDev = true;
    return;
  }

  const devDir = Path.dirname(require.resolve(devPkgFile));
  const devRequire = require(`${devPkg.name}/require`);
  const configDir = `${devDir}/config`;

  Object.assign(module.exports, {
    devDir,
    devPkg,
    devRequire,
    webpack: {
      devHostname: "localhost",
      devPort: getInt(process.env.WEBPACK_DEV_PORT, 2992),
      testPort: getInt(process.env.WEBPACK_TEST_PORT, 3001),
      modulesDirectories: []
    },
    config: {
      babel: `${configDir}/babel`,
      eslint: `${configDir}/eslint`,
      istanbul: `${configDir}/istanbul`,
      karma: `${configDir}/karma`,
      mocha: `${configDir}/mocha`,
      webpack: `${configDir}/webpack`
    }
  });
}

loadDev();

