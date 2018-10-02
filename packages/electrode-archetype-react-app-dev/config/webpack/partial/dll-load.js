"use strict";

//
// Check config archetype.webpack.loadDlls
//
// - If it's not empty, then each entry is name of an Electrode Webpack DLL
//   module to be loaded by the app.
//
// - Archetype will make sure:
//   - When in local dev mode, then DLL assets are made available through localhost.
//   - When in prod mode, then DLL assets are load with CDN URLs in cdn-mapping.json
//   - Source map properly made available
//
// This is similar to the dll-reference partial, except it's meant to work with
// the newer Electrode Webpack DLL modules.
//

const Fs = require("fs");
const Path = require("path");
const _ = require("lodash");
const webpack = require("webpack");
const logger = require("electrode-archetype-react-app/lib/logger");
const archetype = require("electrode-archetype-react-app/config/archetype");

const findDllManifests = name => {
  try {
    const modulePath = require.resolve(Path.join(name, "package.json"));
    const moduleDir = Path.dirname(modulePath);
    const dev = process.env.NODE_ENV === "production" ? "" : ".dev";
    const statsFile = Path.join(moduleDir, "dist", `stats${dev}.json`);
    const stats = JSON.parse(Fs.readFileSync(statsFile));
    const dllNames = Object.keys(stats.assetsByChunkName);
    const manifests = dllNames.map(n => {
      return Path.join(moduleDir, "dist", `dll_${n}-manifest${dev}.json`);
    });
    return manifests;
  } catch (err) {
    logger.error("Unable to resolve Electrode DLL module", name, err.message);
    throw err;
  }
};

const loadDllManifest = name => {
  return JSON.parse(Fs.readFileSync(name));
};

module.exports = function() {
  const loadDlls = archetype.webpack.loadDlls;

  const dlls = Object.keys(loadDlls).filter(x => loadDlls[x] && loadDlls[x].enable !== false);

  if (_.isEmpty(dlls)) return {};

  logger.info("Electrode DLL modules to be loaded", dlls.join(" "));

  const manifests = dlls.reduce((mani, dllName) => mani.concat(findDllManifests(dllName)), []);

  if (_.isEmpty(manifests)) {
    logger.warn("Electrode DLL found no manifests to load");
    return {};
  }

  logger.verbose("Electrode DLL manifests", manifests.join(", "));

  return {
    plugins: manifests.map(filename => {
      return new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: loadDllManifest(filename)
      });
    })
  };
};
