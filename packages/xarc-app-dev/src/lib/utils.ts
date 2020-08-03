/* eslint-disable @typescript-eslint/no-var-requires */

import * as readPkgUp from "read-pkg-up";
import * as pkgUp from "pkg-up";

const Path = require("path");
const Fs = require("fs");
require("../typedef");

const Url = require("url");

const getOptRequire = require("@xarc/webpack/lib/util/get-opt-require");

const formUrl = ({ protocol = "http", host = "", port = "", path = "" }) => {
  const proto = protocol.toString().toLowerCase();
  const sp = port.toString();
  const host2 =
    host && port && !(sp === "80" && proto === "http") && !(sp === "443" && proto === "https")
      ? `${host}:${port}`
      : host;

  return Url.format({ protocol: proto, host: host2, pathname: path });
};

function checkUserBabelRc() {
  const user = Path.resolve(".babelrc");
  if (Fs.existsSync(user)) {
    const userRc = JSON.parse(Fs.readFileSync(user).toString());
    if (
      Object.keys(userRc).length === 1 &&
      typeof userRc.extends === "string" &&
      userRc.extends.indexOf("@xarc/app") >= 0
    ) {
      return "extendsOnly";
    } else {
      return "custom";
    }
  }

  return false;
}

const defaultCreateOptions = {
  electrodePackages: [],
  electrodePackagesDev: [],
  enableFeatures: true,
  assertNoGulpExecution: true,
  assertDevArchetypePresent: true
};

/**
 * @param {CreateXarcOptions} [userXarcOptions] user provided options to
 * configurearchetype generation
 * @returns {CreateXarcOptions} CreateXarcOptions
 */
const getXarcOptions = userXarcOptions => ({ ...defaultCreateOptions, ...userXarcOptions });

let myPkg;
let myDir;

function getMyPkg() {
  if (!myPkg) {
    myPkg = readPkgUp.sync({ cwd: __dirname });
    myDir = Path.dirname(pkgUp.sync({ cwd: __dirname }));
  }

  return { myPkg, myDir };
}

module.exports = {
  getOptArchetypeRequire: getOptRequire,
  formUrl,
  getXarcOptions,
  checkUserBabelRc,
  getMyPkg
};
