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
    const dllInfo = dllNames.map(n => {
      return {
        name: n,
        moduleName: name,
        manifest: Path.join(moduleDir, "dist", `dll_${n}-manifest${dev}.json`),
        versions: Path.join(moduleDir, "dist", `dll_${n}-versions${dev}.json`)
      };
    });
    return dllInfo;
  } catch (err) {
    logger.error("Unable to resolve Electrode DLL module", name, err.message);
    throw err;
  }
};

const verifyVersions = info => {
  const versions = JSON.parse(Fs.readFileSync(info.versions));
  Object.keys(versions).forEach(modName => {
    let pkg;
    try {
      pkg = require(Path.join(modName, "package.json"));
    } catch (err) {
      logger.info(
        "Electrode DLL module",
        info.moduleName,
        "- You don't have module",
        modName,
        "installed.  Skipping it."
      );
      return;
    }
    if (pkg.version !== versions[modName]) {
      const aParts = pkg.version.split(".");
      const dParts = versions[modName].split(".");
      const major = aParts[0] !== dParts[0] ? "major " : "";
      logger.error(
        "Electrode DLL module",
        info.moduleName,
        "DLL",
        info.name,
        `has different ${major}versions for`,
        modName,
        versions[modName],
        "yours: ",
        pkg.version
      );
    } else {
      logger.verbose(
        "Electrode DLL module",
        info.moduleName,
        "DLL",
        info.name,
        `has matched versions for`,
        modName,
        pkg.version
      );
    }
  });
};

const loadDllManifest = name => {
  return JSON.parse(Fs.readFileSync(name));
};

module.exports = function() {
  const loadDlls = archetype.webpack.loadDlls;

  const dllMods = Object.keys(loadDlls).filter(x => loadDlls[x] && loadDlls[x].enable !== false);

  if (_.isEmpty(dllMods)) return {};

  logger.info("Electrode DLL modules to be loaded", dllMods.join(" "));

  const dllInfo = dllMods.reduce((mani, modName) => mani.concat(findDllManifests(modName)), []);

  if (_.isEmpty(dllInfo)) {
    logger.warn("Electrode DLL found no manifests to load");
    return {};
  }

  logger.verbose("Electrode DLL manifests", dllInfo.map(x => x.manifest).join(", "));

  dllInfo.forEach(verifyVersions);

  return {
    plugins: dllInfo.map(info => {
      return new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: loadDllManifest(info.manifest)
      });
    })
  };
};
