import * as Fs from "fs";
import * as Path from "path";
import * as _ from "lodash";

/**
 * Add a list of packages to a package.json's depedencies
 * @param pkgJson - package.json data
 * @param packages - list of packages to add
 * @param dep - which dependencies section to add
 *
 * @returns packages actually added
 */
export const addDepToPkgJson = (pkgJson: any, packages: Record<string, string>, dep: string) => {
  const section = (pkgJson[dep] = pkgJson[dep] || {});
  const added = {};
  Object.keys(packages).forEach(name => {
    if (!section.hasOwnProperty(name)) {
      section[name] = packages[name];
      added[name] = packages[name];
    }
  });

  if (!_.isEmpty(added)) {
    pkgJson[dep] = Object.keys(section)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = section[key];
        return sorted;
      }, {});
  }

  return added;
};

/**
 * Load a package.json from dir
 * @param dir - directory
 * @returns package.json object
 */
export const loadPkgJson = (dir: string) => {
  return JSON.parse(Fs.readFileSync(Path.resolve(dir, "package.json"), "utf-8"));
};

/**
 * Save a package.json to dir
 * @param dir - directory
 * @params pkgJson - package.json object
 * @returns none
 */
export const savePkgJson = (dir: string, pkgJson: any) => {
  return Fs.writeFileSync(
    Path.resolve(dir, "package.json"),
    `${JSON.stringify(pkgJson, null, 2)}\n`
  );
};

/* eslint-disable @typescript-eslint/no-var-requires */
const xarcAppPkgJson = require("@xarc/app/package.json");
const logger = require("../logger");

/**
 * Update app's dependencies
 *
 * @param xarcCwd - CWD for app
 * @returns nothing
 */
export const updateAppDep = (xarcCwd: string) => {
  const appPkg = loadPkgJson(xarcCwd);
  const added = addDepToPkgJson(
    appPkg,
    _.pick(xarcAppPkgJson.dependencies, ["@babel/runtime"]),
    "dependencies"
  );
  if (!_.isEmpty(added)) {
    savePkgJson(xarcCwd, appPkg);
    logger.info(
      `***
      Added these packages to your dependencies, please run install again: ${Object.keys(added)}
***`
    );
  }
};
