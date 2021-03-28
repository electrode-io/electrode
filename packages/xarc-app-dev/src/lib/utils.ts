/* eslint-disable no-console, no-magic-numbers */

import readPkgUp from "read-pkg-up";
import pkgUp from "pkg-up";
import mkdirp from "mkdirp";
import { logger } from "./logger";
import ck from "chalker";
import Path from "path";
import Fs from "fs";
import _ from "lodash";
import Url from "url";
import { XarcInternalOptions, XarcOptions } from "../config/opt2/xarc-options";

export const getOptArchetypeRequire = require("@xarc/webpack/lib/util/get-opt-require"); // eslint-disable-line

/**
 * Form a url string from URL object
 *
 * @param urlObj - object with URL info
 * @param urlObj.protocol - protocol
 * @param urlObj.host - host
 * @param urlObj.port - port
 * @param urlObj.path - path
 *
 * @returns url string
 */
export const formUrl = ({
  protocol = "http",
  host = "",
  port = "",
  path = "",
  search = ""
}): string => {
  const proto = protocol.toString().toLowerCase();
  const sp = port.toString();
  const host2 =
    host && port && !(sp === "80" && proto === "http") && !(sp === "443" && proto === "https")
      ? `${host}:${port}`
      : host;

  return Url.format({ protocol: proto, host: host2, pathname: path, search });
};

/**
 * Check user's babel rc files
 *
 * @returns babel type or false if none was found
 */
export function checkUserBabelRc(): false | string {
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

/**
 * Return this module's package.json and directory
 *
 * @returns `{ myPkg, myDir }`
 */
export function getMyPkg(): any {
  if (!myPkg) {
    myPkg = readPkgUp.sync({ cwd: __dirname });
    myDir = Path.dirname(pkgUp.sync({ cwd: __dirname }));
  }

  return { myPkg, myDir };
}

/**
 * Create a directory that's ignored by git
 *
 * @param dir - name of dir to create
 * @param comment - comment about why it's ignored etc
 */
export function createGitIgnoreDir(dir: string, comment = ""): void {
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

const regExpSig = "@xarc/__RegExp__@";

/**
 * JSON.stringify custom stringifier, for converting Regex to string
 *
 * @param _key - unused
 * @param value - data to stringify
 * @returns string | unknown
 */
export const jsonStringifier = (_key: string, value: unknown): string | unknown => {
  if (value instanceof RegExp) {
    return `${regExpSig}${value.toString()}`;
  } else {
    return value;
  }
};

/**
 * JSON.parse custom parser, for detecting and converting regex string to RegEx object
 *
 * @param _key - unused
 * @param value - value to parse
 * @returns RegExp | unknown
 */
export const jsonParser = (_key: string, value: unknown): RegExp | unknown => {
  if (typeof value === "string" && value.startsWith(regExpSig)) {
    const m = value.substr(regExpSig.length).match(/\/(.*)\/(.*)?/);
    return new RegExp(m[1], m[2] || "");
  } else {
    return value;
  }
};

let cachedXarcOptions;

/**
 * Load xarc options that's saved to disk
 *
 * @param dir - app directory
 * @param showError - log error if failed
 * @returns xarc options
 */
export function loadXarcOptions(
  dir: string = process.env.XARC_CWD || process.cwd(),
  showError = true
): XarcInternalOptions {
  if (cachedXarcOptions) {
    return cachedXarcOptions;
  }
  const filename = Path.join(dir, ".etmp/xarc-options.json");
  try {
    const data = Fs.readFileSync(filename, "utf-8");
    return (cachedXarcOptions = JSON.parse(data, jsonParser));
  } catch (err) {
    // eslint-disable-next-line
    if (showError) {
      console.error(ck`
<red>ERROR</>: Electrode xarc fail to load <cyan>.etmp/xarc-options.json</> in
dev mode.  This means you are trying to use something not through
xarc's development tasks.

full path: ${filename}

Please run "clap setup-dev" once to initialize the file
<cyan>.etmp/xarc-options.json</> before doing your thing that loads
xarc's development code.
`);

      console.error(err.stack); // eslint-disable-line
    }

    return (cachedXarcOptions = {
      webpack: {},
      babel: {},
      options: {}
    } as XarcInternalOptions);
  }
}

/**
 * Create electrode's temp directory
 *
 * @param eTmpDir - name of the temp dir
 */
function createElectrodeTmpDir(eTmpDir = ".etmp") {
  createGitIgnoreDir(Path.resolve(eTmpDir), "Electrode tmp dir");
}

/**
 * Save xarc options to disk
 *
 * @param options - options to save
 */
export function saveXarcOptions(options: any): void {
  const filename = `${options.eTmpDir}/xarc-options.json`;
  const copy = { ...options, pkg: undefined, devPkg: undefined };
  let existStr;

  try {
    existStr = Fs.readFileSync(filename, "utf-8");
  } catch (err) {
    //
  }

  const str = JSON.stringify(copy, jsonStringifier, 2);
  if (str !== existStr) {
    try {
      createElectrodeTmpDir(options.eTmpDir);

      Fs.writeFileSync(filename, str);
    } catch (err) {
      console.error(
        `Unable to save development options to ${filename} - this will cause other failures.\n`,
        err
      );
    }
  }
}

/**
 * Detect if CSS modules should be enabled
 *
 * @param xOptions xarc options
 * @returns `true` or `false`
 */
export function detectCSSModule(xOptions: XarcOptions): boolean {
  const cssModuleSupport = _.get(xOptions, "webpack.cssModuleSupport", undefined);
  if (cssModuleSupport === undefined) {
    return true;
  }
  return Boolean(cssModuleSupport);
}

/**
 * Check if a port number is valid
 *
 * @param port - port number
 * @returns `true` or `false`
 */
export const isValidPort = (port: number): boolean => {
  return Number.isInteger(port) && port >= 0 && port < 65536;
};

/**
 * Get dev admin's http port from env
 *
 * @param fallback fallback port
 * @returns port number
 */
export function getDevAdminPortFromEnv(fallback?: number): number {
  const fromEnv = parseInt(
    process.env.XARC_ADMIN_PORT ||
      // deprecated but still check
      process.env.ELECTRODE_ADMIN_PORT
  );

  return [fromEnv, fallback, 0].find(x => isValidPort(x));
}
