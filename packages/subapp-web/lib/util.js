"use strict";

/* eslint-disable global-require, max-statements, no-loop-func, max-len */

const Fs = require("fs");
const assert = require("assert");
const Path = require("path");
const _ = require("lodash");
const { tryThrowOriginalSubappRegisterError } = require("subapp-util");
const EventEmitter = require("events");

let CDN_ASSETS;
let CDN_JS_BUNDLES;
let CDN_OTHER_MAPPINGS;
let FrameworkLib;

const utils = {
  getOrSet(obj, path, initial) {
    const x = _.get(obj, path);
    if (x === undefined) {
      _.set(obj, path, initial);
      return initial;
    }
    return x;
  },

  removeCwd(msg) {
    if (!msg) return msg;
    const cwd = process.cwd();
    if (cwd.length > 1) {
      const regex = new RegExp(cwd + Path.sep, "g");
      return msg.replace(regex, `.${Path.sep}`);
    }
    return msg;
  },

  getFramework(ref) {
    return new FrameworkLib(ref);
  },

  setupFramework(frameworkLib) {
    FrameworkLib = frameworkLib;
  },

  resetCdn() {
    CDN_ASSETS = undefined;
    CDN_JS_BUNDLES = undefined;
  },
  //
  // Each subapp is an entry, which has an array of all bundle IDs
  // using IDs to lookup bundle name from assets.chunksById
  // keep only chunks with name starts with subapp name
  // map chunks to actual assets
  //
  getSubAppBundle: (name, assets) => {
    const entryName = name.toLowerCase();
    // find entry point
    const entryPoints = assets.entryPoints[entryName];
    if (!entryPoints) {
      tryThrowOriginalSubappRegisterError(name);
      throw new Error(
        `subapp-web: no entry point found for subapp '${name}' - please double check its directory name match ${entryName}.`
      );
    }

    //
    // Normal entry output bundles are generated as <entryName>.bundle[.dev].js,
    // like header.bundle.js
    // See xarc-webpack/lib/partial/[output, dev]
    // The plugin SplitChunksPlugin generate chunks with name as
    // <entryName>.~<hash>.bundle[.dev].js
    // See xarc-webpack/lib/partial/subapp-chunks.js
    //
    const matchEntry = x =>
      x &&
      (x.startsWith(`${entryName}.bundle`) ||
        // if a subapp comes from a package in node_modules, webpack5 names entry like this
        x.startsWith(`${entryName}~_.bundle`) ||
        x.startsWith(`${entryName}.~`));
    // map all IDs to actual assets
    const bundleAssets = entryPoints
      .map(id => {
        let bundleName;
        const js = assets.chunksById.js[id];
        // Only use IDs that has bundle with name that starts with entry's name
        if (Array.isArray(js)) {
          bundleName = js.find(matchEntry);
        } else if (matchEntry(js)) {
          bundleName = js;
        }
        return bundleName && assets.js.find(x => x.name === bundleName);
      })
      .filter(x => x);
    assert(
      bundleAssets.length > 0,
      `subapp-web: ${name} doesn't have a JS bundle for entry ${entryName}`
    );
    // TODO: handle subapp bundle that got broken into multiple chunks, when splitChunks
    // minSize + maxSize cause it to be broken up
    return bundleAssets[0];
  },

  getBundleBase: routeData => {
    if (process.env.NODE_ENV === "production" || !routeData.webpackDev) {
      return routeData.prodBundleBase;
    } else {
      return routeData.devBundleBase;
    }
  },

  /*
    From an object of bundles:

    {
      bundleName: "bundle-file.js"
    }

    map with a CDN assets object:

    {
      "/dist/js/bundle-file.js": "/cdn.com/hash-12345.js"
    }

    to:

    {
      bundleName: "/cdn.com/hash-12345.js"
    }

    If a bundleName doesn't have a CDN map, then its URL is created by prepending basePath:

    {
      bundleName: "${basePath}bundle-file.js"
    }
  */

  /* webpack 4 production stats structure

  {
    entrypoints: {
      "extras": [0, 1, 4] --> A: assets.chunks[4], B: chunks.id
    },
    assets: [
      {
        "name": "extras.bundle.js",
        "size": 2104,
A: -->  "chunks": [4],
        "chunkNames": ["extras"], --> C: assetsByChunkName
        "info": {
          "development": true // if development only asset
        },
        "emitted": false
      },
    ],
    chunks: [
      {
B: -->  "id": 4,
        "hash": "60a75cbfa4c94ca0b4ff",
        "names": ["extras"], --> C: assetsByChunkName
        "entry": true,
        "initial": true,
        "rendered": true
      },
    ],
    assetsByChunkName: {
C: --> "extras": ["extras.bundle.js", "../map/extras.bundle.js.map"],
    }
  }

   */

  mapCdnAssets(bundlesById, basePath = "", cdnAssets) {
    const cdnBundles = {};

    for (const id in bundlesById) {
      const bundles = bundlesById[id];
      [].concat(bundles).forEach(bundleFile => {
        if (!bundleFile) return;

        let assetUrl;

        if (cdnAssets) {
          // lookup asset URL from CDN mapping
          for (const mapName in cdnAssets) {
            if (Path.basename(mapName) === Path.basename(bundleFile)) {
              assetUrl = cdnAssets[mapName];
              break;
            }
          }
        }

        if (!assetUrl) {
          // make asset URL by joining bundleFile with basePath
          assetUrl = Path.posix.join(basePath, bundleFile);
        }

        if (!cdnBundles[id]) {
          // set a simple string
          cdnBundles[id] = assetUrl;
        } else {
          // multiple assets for bundle, set and concat as an array
          cdnBundles[id] = [].concat(cdnBundles[id], assetUrl);
        }
      });
    }

    return cdnBundles;
  },

  loadCdnAssets(routeOptions, cdnAssetsFile = "config/assets.json") {
    if (routeOptions.cdn.enable === true && CDN_ASSETS === undefined) {
      const env = process.env.NODE_ENV;
      const prod = env === "production";
      const ignoreMsg = `== This is OK and you can ignore this message if it's what you intended. ==`;
      const logError = console.error; // eslint-disable-line
      if (!prod) {
        logError(
          `Warning: you've set cdn.enable to true for NODE_ENV ${env}.
Generally you should do that for production deployment in the cloud only.
${ignoreMsg}`
        );
      }

      try {
        const assetsFp = Path.resolve(cdnAssetsFile);
        CDN_ASSETS = JSON.parse(Fs.readFileSync(assetsFp));
      } catch (err) {
        if (prod) {
          logError("Error: Loading CDN assets map failed", err); // eslint-disable-line
        } else {
          logError(
            `Warning: load CDN asset map failed, default to local assets for NODE_ENV ${env} mode. path: ${cdnAssetsFile}
Error: ${err.message}
${ignoreMsg}`
          );
        }
        CDN_ASSETS = false;
      }
    }

    return CDN_ASSETS;
  },

  getCdnOtherMappings(routeOptions) {
    if (CDN_OTHER_MAPPINGS) {
      return CDN_OTHER_MAPPINGS;
    }
    utils.loadCdnAssets(routeOptions);

    /*
     * Send non js/css assets as CDN mapping data to the browser.
     *
     * For js and css assets, webpack is aware of them, and treat them as special chunks.
     * IDs are assign to each "chunks".  In dev mode, it's the chunk name, but in prod mode
     * it's an integer.
     *
     * For any other assets that are managed by Electrode, after they are uploaded to CDN,
     * there's just the CDN mapping info on them, and we need to send them to the browser
     * and provide code to map them from original file name to the CDN URL.
     */
    CDN_OTHER_MAPPINGS = Object.keys(CDN_ASSETS || {})
      .filter(x => !x.endsWith(".js") && !x.endsWith(".css"))
      .reduce((acc, k) => {
        acc[Path.basename(k)] = CDN_ASSETS[k];
        return acc;
      }, {});

    return CDN_OTHER_MAPPINGS;
  },

  getCdnJsBundles(assets, routeOptions) {
    if (CDN_JS_BUNDLES) {
      return CDN_JS_BUNDLES;
    }

    utils.loadCdnAssets(routeOptions);
    //
    // pack up entrypoints data from stats
    //

    const {
      chunksById: { js, css }
    } = assets;

    const bundleBase = utils.getBundleBase(routeOptions);
    const allChunks = _.mergeWith({}, js, css, (a, b) => (a && b ? [].concat(a, b) : a || b));
    CDN_JS_BUNDLES = utils.mapCdnAssets(allChunks, bundleBase, CDN_ASSETS);

    return CDN_JS_BUNDLES;
  },

  getChunksById(stats) {
    //
    // generate a byChunkId object so we can map entry points chunks like this:
    // id = entrypoints.<entryName>[0,1,2...]
    // .js asset URL = byChunkId.js[id], .css asset URL = byChunkId.css[id],
    // .map asset URL = byChunkId.map[id]
    //
    const chunksById = stats.chunks.reduce((result, chunk) => {
      const { id, names } = chunk;
      // in dev mode, chunk id is the same as the name
      // in prod mode, chunk id is an integer (index)
      if (names.indexOf(id) < 0) {
        // save the names for the id
        _.set(result, ["_names_", id], names);
      }

      names.forEach(name => {
        const assets = stats.assetsByChunkName[name];

        // now assign the assets into byChunkId according to extensions
        []
          .concat(assets)
          .filter(x => x)
          .forEach(asset => {
            const ext = Path.extname(asset).substring(1);
            assert(ext, `asset ${asset} doesn't have extension`);
            const found = _.get(result, [ext, id]);
            if (found) {
              if (found.indexOf(asset) < 0) {
                result[ext][id] = [].concat(found, asset);
              }
            } else {
              _.set(result, [ext, id], asset);
            }
          });
      });

      return result;
    }, {});

    return chunksById;
  },

  /**
   * Load stats.json which is created during build.
   * Attempt to load the stats.json file which contains a manifest of
   * The file contains bundle files which are to be loaded on the client side.
   *
   * @param {string} statsPath - path of stats.json
   * @returns {Promise.<Object>} an object containing an array of file names
   */
  loadAssetsFromStats(statsPath) {
    const statsFile = Path.resolve(statsPath);

    let stats;
    try {
      stats = JSON.parse(Fs.readFileSync(statsFile).toString());
    } catch (err) {
      const msg = `
+------------
| ERROR: subapp-web couldn't load the file ${statsFile}.
|
| This likely means that there was an error with webpack compile process.
| Please check in the terminal if status message indicates webpack bundle
| has ERRORS, and then look for webpack dev server reporter URL and open
| it to view webpack compile results.
|
| Also, in dev mode you should be starting with the command 'clap dev'.
|
| Continuing or reloading will result in further strange errors.
+------------
`;
      throw new Error(msg);
    }

    const assets = {};
    const manifestAsset = _.find(stats.assets, asset => asset.name.endsWith("manifest.json"));
    if (manifestAsset) {
      assets.manifest = manifestAsset.name;
    }

    //
    // How we determine the assets needed for each entry point:
    //
    // entryPoints:[id] => chunks.id:names[0] => assetsByChunkName[name] => bundle URL
    // Note: there are some redundant info in stats.  For example, stats.assets.chunks is
    // an array of chunk IDs, but at this point assuming the chunks array has length 1 only.
    //

    assets.chunksById = utils.getChunksById(stats);
    assets.all = stats.assets;
    assets.js = stats.assets.filter(asset => asset.name.endsWith(".js"));
    assets.css = stats.assets.filter(asset => asset.name.endsWith(".css"));
    assets.entryPoints = stats.entrypoints;
    assets.chunks = stats.chunks;

    return { assets, stats };
  },
  getEventEmiiter(reporter) {
    const emitter = new EventEmitter();
    const groupEvents = {};

    emitter.on("web_ssr", (data = {}) => {
      const group = data.group || "_";
      groupEvents[group] = groupEvents[group] || [];
      groupEvents[group].push(data);

      if (data.action === "group-ssr-total" || data.action === "subapps-ssr") {
        const events = groupEvents[group];
        events.forEach(event => reporter(event));
        delete groupEvents[group];
      }
    });

    return emitter;
  }
};

module.exports = utils;
