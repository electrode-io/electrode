// xarc subapp client side lib version 1
// load into window.xarcV1 as a global
(function(w) {
  const version = 1000000; // ###.###.### major.minor.patch

  if (w.xarcV1 && w.xarcV1.version >= version) return w.xarcV1;

  const runtimeInfo = {
    subApps: {},
    bundles: {},
    onLoadStart: {}
  };

  let xv1;

  return (w.xarcV1 = xv1 = {
    version,

    rt: runtimeInfo,

    getBundle(name) {
      return name ? runtimeInfo.bundles[name.toLowerCase()] : undefined;
    },

    setBundle(name, state) {
      runtimeInfo.bundles[name.toLowerCase()] = state;
    },

    getSubApp(name) {
      return runtimeInfo.subApps[name];
    },

    setSubApp(name, sa) {
      runtimeInfo.subApps[name] = sa;
    },

    getOnLoadStart(name) {
      if (!runtimeInfo.onLoadStart[name]) runtimeInfo.onLoadStart[name] = [];
      return runtimeInfo.onLoadStart[name];
    },

    addOnLoadStart(name, load) {
      xv1.getOnLoadStart(name).push(load);
    },

    startSubAppOnLoad(options) {
      const { name } = options;
      const subApp = xv1.getSubApp(name);

      if (!subApp || !subApp._started) {
        const ols = runtimeInfo.onLoadStart;

        if (!ols[name]) {
          ols[name] = [];
        }

        ols[name].push(options);
      } else if (subApp.start && subApp.info) {
        setTimeout(() => subApp.start(options, subApp.info), 0);
      } else {
        console.error(`subApp ${name} started but missing start and info`);
      }
    },

    markBundlesLoaded(ids) {
      [].concat(ids).forEach(id => {
        xv1.setBundle(id, 1);
      });
    },

    loadSubAppBundles(names, done) {
      done = done || (() => {});

      const toLoad = [].concat(names).filter(x => xv1.getBundle(x) === undefined);

      if (toLoad.length === 0) {
        return done();
      }

      if (!runtimeInfo.bundleAssets) {
        try {
          // TODO: right way to extract JSON from script tag?
          runtimeInfo.bundleAssets = JSON.parse(document.getElementById("bundleAssets").innerHTML);
        } catch (err) {
          console.log("ERROR: fail retrieve bundleAssets", err);
          return;
        }
      }

      const ba = runtimeInfo.bundleAssets;
      const loaded = [];
      const assetsToLoad = toLoad
        .reduce((a, name) => {
          const chunkIds = ba.entryPoints[name];
          return chunkIds.reduce((a2, id) => {
            // chunk could have multiple assets
            return [].concat(ba.jsChunksById[id]).reduce((a3, asset) => {
              return asset
                ? a3.concat({
                    name,
                    id,
                    asset
                  })
                : a3;
            }, a2);
          }, a);
        }, [])
        .filter(({ id }) => {
          if (xv1.getBundle(id) === undefined) {
            xv1.setBundle(id, 0); // mark as loading

            return true;
          }

          return false;
        });
      assetsToLoad.forEach(({ name, id, asset }) => {
        window._lload(`${ba.basePath}${asset}`, {
          callback: err => {
            if (err) {
              console.error(`load asset ${name} (id: ${id}) failed`, err);
            } else {
              console.log(`loaded asset for ${name} (id: ${id}) - ${asset}`);
              runtimeInfo.bundles[id]++;
            }

            loaded.push(asset);

            if (loaded.length === assetsToLoad.length) {
              console.log("all assets loaded", assetsToLoad);
              done();
            }
          }
        });
      });
    }
  });
})(window);
