"use strict";

/* eslint-disable max-statements, no-magic-numbers */

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
const logger = require("@xarc/app/lib/logger");
const archetype = require("@xarc/app/config/archetype");
const mkdirp = require("mkdirp");
const { devServerBaseUrl } = require("../util/webpack-dev-url");
const requireAt = require("require-at");

const loadJson = (name, defaultVal) => {
  try {
    return JSON.parse(Fs.readFileSync(name));
  } catch (err) {
    if (defaultVal !== undefined) return defaultVal;
    throw err;
  }
};

const getEnvTag = () => (process.env.NODE_ENV === "production" ? "" : ".dev");

const findDllManifests = name => {
  try {
    const modulePath = require.resolve(Path.join(name, "package.json"));
    const moduleDir = Path.dirname(modulePath);
    const dev = getEnvTag();
    const statsFile = Path.join(moduleDir, "dist", `stats${dev}.json`);
    const stats = JSON.parse(Fs.readFileSync(statsFile));
    const dllNames = Object.keys(stats.assetsByChunkName);
    const dllInfo = dllNames.map(n => {
      return {
        name: n,
        moduleName: name,
        manifest: Path.join(moduleDir, "dist", `dll_${n}-manifest${dev}.json`),
        versions: Path.join(moduleDir, "dist", `dll_${n}-versions${dev}.json`),
        cdnMapping: Path.join(moduleDir, "dist", "cdn-mapping.json"),
        assets: stats.assetsByChunkName[n]
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
  Object.keys(versions).forEach(pkgDir => {
    const pkgInfo = versions[pkgDir];
    const modName = pkgInfo.name;
    const pkgNmDir = Path.posix.join("node_modules", pkgDir);
    let pkg;
    try {
      pkg = requireAt(Path.resolve(pkgNmDir), "./package.json");
    } catch (err) {
      logger.info(
        "Electrode DLL module",
        info.moduleName,
        "- You don't have module",
        modName,
        `installed at ${pkgNmDir}. Skipping it.`
      );
      return;
    }
    const versionInDll = pkgInfo.version;
    if (pkg.version !== versionInDll) {
      const aParts = pkg.version.split(".");
      const dParts = versionInDll.split(".");
      const major = aParts[0] !== dParts[0] ? "major " : "";
      logger.error(
        "Electrode DLL module",
        info.moduleName,
        "DLL",
        info.name,
        `has different ${major}versions for`,
        modName,
        "installed at",
        pkgNmDir,
        versionInDll,
        "yours:",
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
        "installed at",
        pkgNmDir,
        pkg.version
      );
    }
  });
};

const electrodeDllDevBasePath = "__electrode_dev/dll";

const updateDllAssetsForDev = dllAssets => {
  const baseUrl = devServerBaseUrl(archetype.webpack);

  const tag = getEnvTag();

  Object.keys(dllAssets).forEach(modName => {
    const encModName = encodeURIComponent(modName);
    const cdnMapping = (dllAssets[modName].cdnMapping = {});
    Object.keys(dllAssets[modName]).forEach(dll => {
      if (dll === "cdnMapping") return;
      const bundle = dllAssets[modName][dll].assets.find(n => n.endsWith(`${tag}.js`));
      cdnMapping[bundle] = `${baseUrl}/${electrodeDllDevBasePath}/${encModName}/${bundle}`;
    });
  });
};

module.exports = {
  loadJson,
  updateDllAssetsForDev,
  loadAssets: () => {
    const loadDlls = archetype.webpack.loadDlls;

    const dllMods = Object.keys(loadDlls).filter(x => loadDlls[x] && loadDlls[x].enable !== false);

    let dllInfo = [];
    let dllAssets = {};

    if (!_.isEmpty(dllMods)) {
      logger.info("Electrode DLL modules to be loaded", dllMods.join(" "));

      dllInfo = dllMods.reduce((mani, modName) => mani.concat(findDllManifests(modName)), []);

      if (_.isEmpty(dllInfo)) {
        logger.warn("Electrode DLL found no manifests to load");
      } else {
        logger.verbose("Electrode DLL manifests", dllInfo.map(x => x.manifest).join(", "));
        dllInfo.forEach(verifyVersions);

        dllAssets = dllInfo.reduce((a, x) => {
          if (!a[x.moduleName]) {
            a[x.moduleName] = {
              cdnMapping: loadJson(x.cdnMapping, {})
            };
          }
          a[x.moduleName][x.name] = { assets: x.assets };
          return a;
        }, {});
      }
    }

    return { info: dllInfo, assets: dllAssets };
  },

  saveDllAssets: dllAssets => {
    const tag = getEnvTag();
    mkdirp.sync(Path.resolve("dist"));
    Fs.writeFileSync(
      Path.resolve(`dist/electrode-dll-assets${tag}.json`),
      `${JSON.stringify(dllAssets, null, 2)}\n`
    );
  }
};
