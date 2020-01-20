"use strict";

/* eslint-disable max-statements */

const Fs = require("fs");
const Path = require("path");
const util = require("./util");
const subappUtil = require("subapp-util");

module.exports = function setup(setupContext) {
  const distDir = process.env.NODE_ENV === "production" ? "../dist/min" : "../dist/dev";
  const clientJs = Fs.readFileSync(Path.join(__dirname, distDir, "subapp-web.js")).toString();
  const littleLoader = Fs.readFileSync(
    require.resolve("little-loader/dist/little-loader.min.js"),
    "utf8"
  );

  //
  // TODO: in webpack dev mode, we need to reload stats after there's a change
  //

  const { assets } = util.loadAssetsFromStats(setupContext.routeOptions.stats);

  setupContext.routeOptions.__internals.assets = assets;

  const cdnJsBundles = util.getCdnJsBundles(assets, setupContext.routeOptions);

  const bundleAssets = {
    jsChunksById: cdnJsBundles,
    entryPoints: assets.entryPoints,
    basePath: ""
  };

  const webSubAppJs = `<script id="bundleAssets" type="application/json">
${JSON.stringify(bundleAssets)}
</script>
<script>/*LL*/${littleLoader}/*LL*/
${clientJs}
</script>
`;

  // check if any subapp has server side code with initialize method and load them
  const subAppServers = Object.keys(subappUtil.getAllSubAppManifest())
    .map(name => subappUtil.loadSubAppServerByName(name))
    .filter(x => x && x.initialize);

  return {
    process: context => {
      context.user.assets = assets;
      context.user.includedBundles = {};

      // invoke the initialize method of subapp's server code
      if (subAppServers.length > 0) {
        for (const server of subAppServers) {
          server.initialize(context);
        }
      }

      return webSubAppJs;
    }
  };
};
