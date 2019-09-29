"use strict";

/* eslint-disable max-statements */

const Fs = require("fs");
const Path = require("path");
const util = require("./util");
const subappUtil = require("subapp-util");

module.exports = function setup(setupContext) {
  const distDir = process.env.NODE_ENV === "production" ? "../dist" : "../browser";
  const clientJs = Fs.readFileSync(Path.join(__dirname, distDir, "subapp-web.js")).toString();
  const littleLoader = Fs.readFileSync(
    require.resolve("little-loader/dist/little-loader.min.js"),
    "utf8"
  );

  const { assets } = util.loadAssetsFromStats(setupContext.routeOptions.stats);

  setupContext.routeOptions.__internals.assets = assets;

  const cdnJsBundles = util.getCdnJsBundles(assets, setupContext.routeOptions);

  let vendorBundleLoadJs = "";
  let commonScript = "";

  const vendorAssets = util.getVendorBundles(assets);
  const bundleNames = vendorAssets.map(a => a.chunkNames[0]);

  if (vendorAssets.length > 0) {
    vendorBundleLoadJs = `markBundlesLoaded(${JSON.stringify(bundleNames)});`;
    commonScript = vendorAssets
      .map(a => {
        // map all chunk names that has a URL mapped and load them with script tags
        return a.chunkNames
          .map(x => cdnJsBundles[x] && `<script src="${cdnJsBundles[x]}" async></script>`)
          .filter(x => x)
          .join("");
      })
      .join("\n");
  }

  const bundleAssets = {
    byChunkName: cdnJsBundles,
    entryPoints: assets.entryPoints,
    basePath: ""
  };

  const webSubAppJs = `\n<script id="bundleAssets" type="application/json">
${JSON.stringify(bundleAssets)}
</script>
<script>${littleLoader}
${clientJs}
${vendorBundleLoadJs}
</script>
`;

  const subAppServers = Object.keys(subappUtil.getAllSubAppManifest())
    .map(name => subappUtil.loadSubAppServerByName(name))
    .filter(x => x && x.initialize);

  return {
    process: context => {
      if (subAppServers.length > 0) {
        for (const server of subAppServers) {
          server.initialize(context);
        }
      }

      return `${commonScript}${webSubAppJs}`;
    }
  };
};
