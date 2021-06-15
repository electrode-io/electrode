"use strict";

/* eslint-disable no-console, no-process-exit, max-params */

const Url = require("url");
const Path = require("path");
const assert = require("assert");
const _ = require("lodash");
const optionalRequire = require("optional-require")(require);
const scanDir = require("filter-scan-dir");
const appMode = optionalRequire(Path.resolve(".prod/.app-mode.json"), { default: {} });
const xrequire = require;

let SUBAPP_MANIFEST;
const SUBAPP_CONTAINER_SYM = Symbol.for("Electrode SubApps Container");
const MAP_BY_PATH_SYM = Symbol("subapps map by path");

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

const validateModuleManifest = manifest => {
  const entries = _.pick(manifest, ["entry", "serverEntry", "reducers"]);
  Object.keys(entries).forEach(x => {
    if (!Path.isAbsolute(entries[x])) {
      throw new Error(
        `Could not resolve subapp ${x} "${entries[x]}".\
 Please provide absolute path to the ${x} in subapp manifest`
      );
    }
  });
};

//
// scan a subapp's directory for additional things:
// - server side entry in server.js, server-{name}.js, server-{verbatimName}.js
// - reducers directory, reducers[.js|.jsx|.ts|.tsx]
//
function scanSubAppAdditions(dir, manifest) {
  const { name, verbatimName } = manifest;
  // does subapp dir contain a file matching server.*, server-<name>.* pattern
  const entries = ["server.", name && `server-${name}.`, verbatimName && `server-${verbatimName}.`]
    .filter(x => x)
    .map(x => x.toLowerCase());

  const scanned = scanDir.sync({
    dir,
    grouping: true,
    filterExt: [".js", ".jsx", ".ts", ".tsx"],
    filterDir: x => x === "reducers" && "dir",
    filter: x => {
      if (entries.find(e => x.toLowerCase().startsWith(e))) {
        return "server";
      } else if (x.startsWith("reducers")) {
        return "reducers";
      }
      return false;
    },
    maxLevel: 0
  });

  if (!manifest.serverEntry && scanned.server) {
    manifest.serverEntry = removeExt(scanned.server[0]);
  }

  const reducers =
    (scanned.dir && scanned.dir[0]) || (scanned.reducers && removeExt(scanned.reducers[0]));

  if (!manifest.reducers && reducers) {
    manifest.reducers = reducers;
  }
}

function scanSubApp(name, verbatimName, dir, file) {
  const subAppDir = Path.dirname(file);
  const subAppFullPath = Path.resolve(dir, subAppDir);

  const manifest = {
    // fullDir: subAppFullPath,
    subAppDir,
    type: "app",
    name,
    verbatimName,
    entry: removeExt(Path.basename(file))
  };

  scanSubAppAdditions(subAppFullPath, manifest);

  return manifest;
}

function determineName(file) {
  const dirName = Path.basename(Path.dirname(file));
  //
  // convert dir name to mix case to use as subapp name
  // skip parts before a . to allow naming subapp dirs like 01.app1
  //
  // verbatimName is subapp's dir as named
  //
  const verbatimName = dirName.substr(dirName.indexOf(".") + 1);

  // verbatimName converted to mix case by removing any . or -
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
  const fullSrcDir = Path.resolve(srcDir);

  const subApps = { [MAP_BY_PATH_SYM]: {} };
  const { maniFiles = [], files = [], modFiles = [] } = scanDir.sync({
    dir: srcDir,
    grouping: true,
    maxLevel,
    filter: (f, p, ex) => {
      if (ex.noExt === "subapps-modules") return "modFiles";
      if (ex.noExt === "subapp-manifest") return "maniFiles";
      return f.startsWith("subapp");
    },
    filterExt: [".js", ".jsx", ".ts", ".tsx"]
  });

  // process subapps with manifest first
  const errors1 = maniFiles.map(mani => {
    try {
      const subAppDir = Path.dirname(mani);
      const fullDir = Path.join(fullSrcDir, subAppDir);
      const manifest = es6Require(Path.join(fullSrcDir, mani));
      const subapp = Object.assign({ subAppDir }, manifest);
      scanSubAppAdditions(fullDir, subapp);
      subApps[manifest.name] = subApps[MAP_BY_PATH_SYM][fullDir] = subapp;
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
      const subapp = scanSubApp(name, verbatimName, srcDir, file);
      const fullDir = Path.join(fullSrcDir, subapp.subAppDir);
      subApps[name] = subApps[MAP_BY_PATH_SYM][fullDir] = subapp;
    } catch (error) {
      return error;
    }
    return null;
  });

  // process subapps modules
  let errors3 = [];
  if (modFiles.length > 0) {
    const manifests = es6Require(Path.join(fullSrcDir, modFiles[0]));
    errors3 = Object.keys(manifests).map(modName => {
      try {
        const manifest = manifests[modName];
        validateModuleManifest(manifest);
        const modFullDir = Path.dirname(require.resolve(modName));
        const subapp = Object.assign({ subAppDir: modName, module: true }, manifest);
        subApps[manifest.name] = subApps[MAP_BY_PATH_SYM][modFullDir] = subapp;
      } catch (error) {
        return error;
      }
      return null;
    });
  }

  const errors = [].concat(errors1, errors2, errors3).filter(x => x);
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
  // return the first (and should be only) entry from the result
  for (const n in subApps) {
    return subApps[n];
  }
  return null;
}

function getSubAppByPathMap(subApps) {
  return subApps[MAP_BY_PATH_SYM];
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
  const _trace = new Error(
    `registerSubApp - subapp name '${subapp.name}' does not match its directory name`
  );
  const container = getSubAppContainer();
  if (container[subapp.name]) {
    console.error(`registerSubApp: subapp '${subapp.name}' already registered - replacing`);
  }

  container[subapp.name] = Object.assign({ _trace }, container[subapp.name], subapp);

  return container[subapp.name];
}

function getAllSubAppManifest() {
  return subAppManifest();
}

function loadSubAppByName(name) {
  const manifest = subAppManifest()[name];

  if (!manifest) {
    const msg = `loadSubApp: No subapp named '${name}' found. Your subapp's name
  comes from its subapp-manifest.js file. Without that file, the name is the
  subapp's directory name in MixCase form. ie: 'my-subapp' => 'MySubapp'`;
    console.error(msg);
    throw new Error(msg);
  }

  const container = getSubAppContainer();
  const subAppDir = manifest.subAppDir;
  // load subapp's entry
  xrequire(manifest.module ? manifest.entry : Path.resolve(appSrcDir(), subAppDir, manifest.entry));

  // if subapp did not register itself then register it
  if (!container[name]) {
    registerSubApp(manifest);
  }

  assert(container[name], `subapp-util: ${name} didn't load and register itself`);
  return container[name];
}

function loadSubAppServerByName(name, serverSideRendering) {
  const manifest = subAppManifest()[name];
  const { subAppDir, serverEntry } = manifest;

  if (serverEntry) {
    return es6Require(
      manifest.module ? serverEntry : Path.resolve(appSrcDir(), subAppDir, serverEntry)
    );
  } else if (serverEntry === false) {
    return {};
  } else if (serverSideRendering) {
    const subapp = es6Require(
      manifest.module ? manifest.entry : Path.resolve(appSrcDir(), subAppDir, manifest.entry)
    );

    return {
      StartComponent: subapp.Component
    };
  }
  return {};
}

function refreshSubAppByName(name) {
  const manifest = subAppManifest()[name];
  const { subAppDir } = manifest;

  const entryFullPath = xrequire.resolve(
    manifest.module ? manifest.entry : Path.resolve(appSrcDir(), subAppDir, manifest.entry)
  );
  if (!xrequire.cache[entryFullPath] && manifest.serverEntry) {
    // also reload server side module
    const serverEntryFullPath = xrequire.resolve(
      manifest.module
        ? manifest.serverEntry
        : Path.resolve(appSrcDir(), subAppDir, manifest.serverEntry)
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

const formUrl = ({ protocol = "http", host = "", port = "", path = "" }) => {
  let proto = protocol.toString().toLowerCase();
  let host2 = host;

  if (port) {
    const sp = port.toString();
    if (sp === "80") {
      proto = "http";
    } else if (sp === "443") {
      proto = "https";
    } else if (host) {
      host2 = `${host}:${port}`;
    }
  }

  return Url.format({ protocol: proto, host: host2, pathname: path });
};

const tryThrowOriginalSubappRegisterError = name => {
  // an entry point can't be found for a subapp name, so try to match it to
  // the scanned result.
  const container = getSubAppContainer();
  const subapp = container[name];
  if (subapp && subapp._trace) {
    throw subapp._trace;
  }
};

module.exports = {
  es6Require,
  scanSubAppsFromDir,
  scanSingleSubAppFromDir,
  getAllSubAppManifest,
  registerSubApp,
  getSubAppByPathMap,
  getSubAppContainer,
  loadSubAppByName,
  loadSubAppServerByName,
  refreshSubAppByName,
  refreshAllSubApps,
  formUrl,
  tryThrowOriginalSubappRegisterError
};
//# fynSourceMap=false
