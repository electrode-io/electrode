/* eslint-disable @typescript-eslint/no-var-requires */

import * as readPkgUp from "read-pkg-up";
import * as pkgUp from "pkg-up";
const mkdirp = require("mkdirp");
const logger = require("./logger");
const ck = require("chalker");
const Path = require("path");
const Fs = require("fs");
const _ = require("lodash");

const Url = require("url");

export const getOptArchetypeRequire = require("@xarc/webpack/lib/util/get-opt-require");

export const formUrl = ({ protocol = "http", host = "", port = "", path = "" }) => {
  const proto = protocol.toString().toLowerCase();
  const sp = port.toString();
  const host2 =
    host && port && !(sp === "80" && proto === "http") && !(sp === "443" && proto === "https")
      ? `${host}:${port}`
      : host;

  return Url.format({ protocol: proto, host: host2, pathname: path });
};

export function checkUserBabelRc() {
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

let myPkg;
let myDir;

export function getMyPkg() {
  if (!myPkg) {
    myPkg = readPkgUp.sync({ cwd: __dirname });
    myDir = Path.dirname(pkgUp.sync({ cwd: __dirname }));
  }

  return { myPkg, myDir };
}

export function createGitIgnoreDir(dir, comment) {
  comment = comment || "";
  const dirFP = Path.resolve(dir);
  try {
    mkdirp.sync(dirFP);
  } catch (e) {
    logger.info("mkdir", e);
  }

  const gitIgnore = Path.join(dirFP, ".gitignore");
  if (!Fs.existsSync(gitIgnore)) {
    Fs.writeFileSync(gitIgnore, `# ${comment}\n*\n`);
  }
}

let cachedXarcOptions;

export function loadXarcOptions(dir: string = process.cwd()) {
  if (cachedXarcOptions) {
    return cachedXarcOptions;
  }
  const filename = Path.join(dir, ".etmp/xarc-options.json");
  try {
    const data = Fs.readFileSync(filename, "utf-8");
    return (cachedXarcOptions = JSON.parse(data));
  } catch (err) {
    // eslint-disable-next-line
    console.error(ck`
<red>ERROR</>: Electrode xarc fail to load <cyan>.etmp/xarc-options.json</> in
dev mode.  This means you are trying to use something not through
xarc's development tasks.

full path: ${filename}

Please run "clap setup-dev" once to initialize the file
<cyan>.etmp/xarc-options.json</> before doing your thing that loads
xarc's development code.
`);
    return (cachedXarcOptions = {
      webpack: {},
      babel: {},
      options: {}
    });
  }
}

export function detectCSSModule(xOptions) {
  const cssModuleSupport = _.get(xOptions, "webpack.cssModuleSupport", undefined);
  if (cssModuleSupport === undefined) {
    return true;
  }
  return Boolean(cssModuleSupport);
}
