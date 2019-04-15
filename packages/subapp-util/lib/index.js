"use strict";

/* eslint-disable no-console, no-process-exit, max-params */

const Path = require("path");
const assert = require("assert");
const optionalRequire = require("optional-require")(require);
const scanDir = require("filter-scan-dir");
const appMode = optionalRequire(Path.resolve(".prod/.app-mode.json"), { default: {} });
const xrequire = require;

let SUBAPP_MANIFEST;
const SUBAPP_CONTAINER_SYM = Symbol.for("Electrode SubApps Container");

const appSrcDir = () => {
  const dir = process.env.APP_SRC_DIR || (process.env.NODE_ENV === "production" ? "lib" : "src");
  return dir;
};

function es6Require(r, xreq = xrequire) {
  const mod = xreq(r);
  return mod.default || mod;
}

function removeExt(f) {
  const ix = f.lastIndexOf(".");
  return ix > 0 ? f.substring(0, ix) : f;
}

function scanSubApp(name, verbatimName, dir, file) {
  const subAppDir = Path.dirname(file);
  const subAppFullPath = Path.resolve(dir, subAppDir);

  const entries = ["server.", `server-${name}.`, `server-${verbatimName}.`].map(x =>
    x.toLowerCase()
  );

  const serverEntry = scanDir.sync({
    dir: subAppFullPath,
    filterExt: [".js", ".jsx", ".ts", ".tsx"],
    filter: x => entries.find(e => x.toLowerCase().startsWith(e)),
    maxLevel: 0
  })[0];

  const manifest = {
    subAppDir,
    type: "app",
    name,
    entry: removeExt(Path.basename(file)),
    serverEntry: serverEntry ? removeExt(serverEntry) : false
  };

  return manifest;
}

function determineName(file) {
  const dirName = Path.basename(Path.dirname(file));
  // convert dir name to mix case to use as subapp name
  // skip parts before a . to allow naming subapp dirs like 01.app1
  const verbatimName = dirName.substr(dirName.indexOf(".") + 1);

  const name = verbatimName.replace(/^(.)|-(.)/g, (a, b, c) =>
    b ? b.toUpperCase() : c && c.toUpperCase()
  );

  return { verbatimName, name };
}

/*
 * Search for subapps under `srcDir`.
 * - subapp should be in their own directory
 * - subapp can specify its info in subapp-manifest.js or name a file that starts
 *   with `subapp` as the main entry.
 * - without subapp-manifest.js, subapp info is generated as follows:
 *   - Look for a file name starts with `subapp` to use as main entry
 *   - Use its directory name to convert to subapp's name, converted to mixcaps
 *   - ie: main-body => MainBody
 *   - directory name can have a `.` to have a prefix for ordering.
 *   - ie: 01.main-body (01. part is ignored)
 *   - Look for a file named `server.js` to use as server side main entry
 */
function scanSubAppsFromDir(srcDir, maxLevel = Infinity) {
  const dir = Path.resolve(srcDir);

  const subApps = {};
  const { maniFiles = [], files = [] } = scanDir.sync({
    dir: srcDir,
    grouping: true,
    maxLevel,
    filter: (f, p, ex) => {
      if (ex.noExt === "subapp-manifest") return "maniFiles";
      return f.startsWith("subapp");
    },
    filterExt: [".js", ".jsx", ".ts", ".tsx"]
  });

  // process subapps with manifest first
  const errors1 = maniFiles.map(mani => {
    try {
      const manifest = xrequire(Path.join(dir, mani));
      subApps[manifest.name] = Object.assign({ subAppDir: Path.dirname(mani) }, manifest);
      return null;
    } catch (error) {
      return error;
    }
  });

  // process subapps without manifest
  const errors2 = files.map(file => {
    const { name, verbatimName } = determineName(file);
    if (subApps[name]) return null;
    try {
      subApps[name] = scanSubApp(name, verbatimName, srcDir, file);
    } catch (error) {
      return error;
    }
    return null;
  });

  const errors = [].concat(errors1, errors2).filter(x => x);
  if (errors.length > 0) {
    console.error("Loading SubApps failed");
    errors.forEach(err => {
      console.error("error:", err);
      console.error("\n");
    });
    process.exit(1);
  }

  return subApps;
}

//
// load a single subapp's manifest from its directory directly
// - since all subapps are expected to be under a single source directory,
//   the caller is expected to ensure all parts to the path is included,
//   but the manifest would set the subAppDir to the base directory only.
//
function scanSingleSubAppFromDir(subAppDir) {
  const subApps = scanSubAppsFromDir(subAppDir, 0);
  for (const n in subApps) {
    const manifest = subApps[n];
    manifest.subAppDir = Path.basename(subAppDir);
    return manifest;
  }
  return null;
}

function getSubAppContainer() {
  if (!global[SUBAPP_CONTAINER_SYM]) {
    global[SUBAPP_CONTAINER_SYM] = {};
  }

  return global[SUBAPP_CONTAINER_SYM];
}

const subAppManifest = () => {
  if (!SUBAPP_MANIFEST) {
    SUBAPP_MANIFEST =
      (process.env.NODE_ENV === "production" && appMode.subApps) || scanSubAppsFromDir(appSrcDir());
  }
  return SUBAPP_MANIFEST;
};

function registerSubApp(subapp) {
  const container = getSubAppContainer();
  if (container[subapp.name]) {
    console.error(`registerSubApp: subapp '${subapp.name}' already registered - replacing`);
  }

  container[subapp.name] = Object.assign({}, container[subapp.name], subapp);

  return container[subapp.name];
}

function getAllSubAppManifest() {
  return subAppManifest();
}

function loadSubAppByName(name) {
  const manifest = subAppManifest()[name];
  const container = getSubAppContainer();
  const subAppDir = manifest.subAppDir;
  // load subapp's entry
  xrequire(Path.resolve(appSrcDir(), subAppDir, manifest.entry));

  // if subapp did not regiser itself then register it
  if (!container[name]) {
    registerSubApp(manifest);
  }

  assert(container[name], `subapp-util: ${name} didn't load and register itself`);
  return container[name];
}

function loadSubAppServerByName(name) {
  const manifest = subAppManifest()[name];
  const subAppDir = manifest.subAppDir;

  const x = manifest.serverEntry;

  if (x) {
    return es6Require(Path.resolve(appSrcDir(), subAppDir, x));
  }

  return {};
}

function refreshSubAppByName(name) {
  const manifest = subAppManifest()[name];
  const { subAppDir } = manifest;

  const entryFullPath = xrequire.resolve(Path.resolve(appSrcDir(), subAppDir, manifest.entry));
  if (!xrequire.cache[entryFullPath] && manifest.serverEntry) {
    // also reload server side module
    const serverEntryFullPath = xrequire.resolve(
      Path.resolve(appSrcDir(), subAppDir, manifest.serverEntry)
    );
    console.log("reloading server side subapp", name, serverEntryFullPath);
    delete xrequire.cache[serverEntryFullPath];
  }
}

function refreshAllSubApps() {
  const container = getSubAppContainer();
  for (const name in container) {
    refreshSubAppByName(name);
  }
}

module.exports = {
  es6Require,
  scanSubAppsFromDir,
  scanSingleSubAppFromDir,
  getAllSubAppManifest,
  registerSubApp,
  getSubAppContainer,
  loadSubAppByName,
  loadSubAppServerByName,
  refreshSubAppByName,
  refreshAllSubApps
};
