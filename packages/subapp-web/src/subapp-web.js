// xarc subapp client side lib version 1
// load into window.xarcV1 as a global
(function(w) {
  const version = 1000000; // ###.###.### major.minor.patch

  if (w.xarcV1 && w.xarcV1.version >= version) return w.xarcV1;

  const runtimeInfo = {
    instId: 1,
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

    copyObject(src, dst) {
      dst = dst || {};
      for (const x in src) {
        if (src.hasOwnProperty(x)) {
          dst[x] = src[x];
        }
      }
      return dst;
    },

    //
    // When there are subapps that need to load and start up front, SSR could
    // be tricky if any of them is inlined within other components, because when
    // UI render the component tree, any kind of async op (such as data prep)
    // can't occur in the middle of the render and must return a fallback while
    // async is loading, and that would cause SSR content to be replaced with the
    // fallback, producing a flash, nullifying the SSR.
    // To remedy this, a single data prep action would be waiting for subapps
    // to load, all subapp that's starting onLoad will have to wait for the data prep
    // action.
    //
    watchSubAppOnLoad(immediate) {
      if (runtimeInfo.onLoadWatcher) {
        clearTimeout(runtimeInfo.onLoadWatcher);
      }

      const watchCheck = () => {
        runtimeInfo.onLoadWatcher = undefined;
        const ols = runtimeInfo.onLoadStart;
        let pending = 0;
        let delay = 0;
        for (const name in ols) {
          if (!ols[name]) {
            continue;
          }
          const subApp = xv1.getSubApp(name);
          if (!subApp || !subApp._started) {
            pending++;
          } else if (subApp.start && subApp.info) {
            const queue = ols[name];
            ols[name] = undefined;
            queue.forEach(options => {
              if (!options.id || !options.elementId) {
                options = xv1.copyObject(options);
                options._genId = options.name + "_inst_id_" + runtimeInfo.instId++;
              }
              if (options.serverSideRendering && options.inline) {
                const instance = subApp.preStart(options);
                // async prepare needed, await for it and then start
                if (instance._prepared.then) {
                  return instance._prepared.then(() => {
                    return subApp.start(options, subApp.info);
                  });
                }
                // no async needed, continue down to start
              }

              setTimeout(() => {
                subApp.start(options, subApp.info);
              }, delay++);
            });
          } else {
            console.error(`subApp ${name} exist but missing start and info`);
          }
        }

        if (pending) {
          xv1.watchSubAppOnLoad();
        } else {
          runtimeInfo.onLoadStart = {};
        }
      };

      if (immediate) {
        watchCheck();
      }

      runtimeInfo.onLoadWatcher = setTimeout(watchCheck, 50);
    },

    startSubAppOnLoad(options) {
      const { name } = options;
      const ols = runtimeInfo.onLoadStart;

      if (!ols[name]) {
        ols[name] = [];
      }

      ols[name].push(options);
      xv1.watchSubAppOnLoad(true);
    },

    markBundlesLoaded(ids) {
      [].concat(ids).forEach(id => {
        xv1.setBundle(id.toString(), 1);
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
          if (xv1.getBundle(id.toString()) === undefined) {
            xv1.setBundle(id.toString(), 0); // mark as loading

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
