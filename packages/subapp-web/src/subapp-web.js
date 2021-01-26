// xarc subapp client side lib version 1
// load into window.xarcV1 as a global
(function (w) {
  if (!w._wml) {
    w._wml = {};
  }

  const version = 1000000; // ###.###.### major.minor.patch

  if (w.xarcV1 && w.xarcV1.version >= version) return w.xarcV1;

  const runtimeInfo = {
    instId: 1,
    subApps: {},
    bundles: {},
    onLoadStart: {},
    groups: {},
    started: false
  };

  let xv1;

  const DEFAULT_NAMESPACE = "root";

  const ensureNamespace = (namespace = DEFAULT_NAMESPACE) => namespace;

  return (w.xarcV1 = xv1 = {
    IS_BROWSER: true,
    HAS_WINDOW: typeof window !== "undefined",

    version,

    rt: runtimeInfo,

    //
    // empty place holders for CDN mapping
    //
    cdnInit() {},
    cdnUpdate() {},
    cdnMap(x) {
      return x;
    },

    defer() {
      const defer = {};
      defer.promise = new Promise((resolve, reject) => {
        defer.resolve = resolve;
        defer.reject = reject;
        defer.done = (err, result) => {
          if (err) reject(err);
          else resolve(result);
        };
      });
      return defer;
    },

    /* implement concurrent async map */

    asyncMap(array, func, concurrency) {
      const mapped = [];
      let error;
      let completedCount = 0;
      let index = 0;
      let total = array && array.length;

      concurrency > 0 || (concurrency = 10);

      const defer = xv1.defer();

      const next = () => {
        if (error || index >= total || concurrency <= 0) {
          return;
        }

        concurrency--;
        const pendingIx = index++;
        mapped[pendingIx] = undefined;

        const save = r => {
          concurrency++;
          completedCount++;
          mapped[pendingIx] = r;
          if (!error && completedCount === total) {
            defer.resolve(mapped);
          } else {
            next();
          }
        };

        const fail = err => {
          if (error) {
            return;
          }
          error = err;
          err.partial = mapped;
          defer.reject(err);
        };

        try {
          const mapped = func(array[pendingIx], pendingIx, array);

          if (mapped && mapped.then) {
            // a promise
            mapped.then(save, fail);
            next();
          } else {
            save(mapped);
          }
        } catch (err) {
          fail(err);
        }
      };

      setTimeout(total > 0 ? next : () => defer.resolve(mapped), 0);

      return defer.promise;
    },

    getBundle(name, namespace) {
      namespace = ensureNamespace(namespace);

      if (
        !name ||
        !runtimeInfo.bundles[namespace] ||
        !runtimeInfo.bundles[namespace][name.toLowerCase()]
      ) {
        return;
      }

      return runtimeInfo.bundles[namespace][name.toLowerCase()];
    },

    setBundle(name, state, namespace) {
      namespace = ensureNamespace(namespace);
      runtimeInfo.bundles[namespace] = runtimeInfo.bundles[namespace] || {};
      runtimeInfo.bundles[namespace][name.toLowerCase()] = state;
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

    startSubApp(subApp, options, readyOnly) {
      let instance;
      const makeInvoke = m => () => subApp[m] && subApp[m](instance, options, subApp.info);
      const promise = Promise.resolve()
        .then(makeInvoke("preStart"))
        .then(x => (instance = x) && x._prepared) // await _prepared in case it's a promise
        .then(makeInvoke("preRender"))
        .then(makeInvoke("signalReady"));
      return !readyOnly ? promise.then(makeInvoke("start")) : promise;
    },

    startGroup(groupInfo) {
      if (!runtimeInfo.started || groupInfo.started || groupInfo.queue.length < groupInfo.total) {
        return;
      }
      const makeInvoke = (m, queue) => {
        return () =>
          xv1.asyncMap(queue || groupInfo.queue, startInfo => {
            const subApp = startInfo.subApp;
            return subApp[m] && subApp[m](startInfo.instance, startInfo.options, subApp.info);
          });
      };

      groupInfo.started = true;
      console.log("Starting subapp group", groupInfo);

      xv1
        .asyncMap(groupInfo.queue, startInfo => {
          return startInfo.instance._prepared;
        })
        .then(makeInvoke("preRender"))
        .then(makeInvoke("signalReady"))
        .then(
          makeInvoke(
            "start",
            groupInfo.queue.filter(x => !x.options.inline)
          )
        );
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
        runtimeInfo.onLoadWatcher = undefined;
      }

      const watchCheck = () => {
        runtimeInfo.onLoadWatcher = undefined;
        const ols = runtimeInfo.onLoadStart;
        let pending = 0;
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
              if (!options.id && !options.elementId) {
                options = Object.assign({}, options);
                options._genId = options.name + "_inst_id_" + runtimeInfo.instId++;
              }

              //
              // check and retrieve initialState.
              //
              if (options.getInitialState) {
                options.initialState = options.getInitialState();
              }
              if (options.group) {
                // start subapps as a group
                const grpInfo = runtimeInfo.groups[options.group];
                const startInfo = { options, subApp, instance: subApp.preStart(null, options) };
                grpInfo.queue.push(startInfo);
                xv1.startGroup(grpInfo);

                if (grpInfo.queue.length < grpInfo.total) {
                  console.log(
                    "subapp group",
                    options.group,
                    "not ready to start: total",
                    grpInfo.total,
                    "count",
                    grpInfo.queue.length
                  );
                }
              } else {
                return xv1.startSubApp(subApp, options);
              }
            });
          } else {
            console.error(`subApp ${name} exist but missing start or info`);
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

      runtimeInfo.onLoadWatcher = setTimeout(watchCheck, 10);
    },

    startSubAppOnLoad(options) {
      const { name } = options;
      const ols = runtimeInfo.onLoadStart;

      if (!ols[name]) {
        ols[name] = [];
      }

      const group = options.group;
      if (group) {
        let groupInfo = runtimeInfo.groups[group];
        if (!groupInfo) {
          groupInfo = runtimeInfo.groups[group] = { group: group, total: 0, queue: [] };
        }
        groupInfo.total++;
      }

      ols[name].push(options);
    },

    start() {
      console.log("xarcV1 start, version:", version);
      runtimeInfo.started = true;
      const groups = runtimeInfo.groups;
      for (let grp in groups) {
        xv1.startGroup(groups[grp]);
      }
      xv1.watchSubAppOnLoad(true);
    },

    markBundlesLoaded(ids, namespace) {
      [].concat(ids).forEach(id => {
        xv1.setBundle(id.toString(), 1, namespace);
      });
    },

    getBundleAssets(namespace) {
      namespace = ensureNamespace(namespace);

      if (!runtimeInfo.bundleAssets) {
        runtimeInfo.bundleAssets = {};
      }

      if (!runtimeInfo.bundleAssets[namespace]) {
        const bundleName = namespace === DEFAULT_NAMESPACE ? "bundleAssets" : `${namespace}Assets`;
        runtimeInfo.bundleAssets[namespace] = xv1.dyn(bundleName);

        const updater = !xv1.rt.md ? xv1.cdnInit : xv1.cdnUpdate;
        updater(runtimeInfo.bundleAssets[namespace]);
      }

      return runtimeInfo.bundleAssets[namespace];
    },

    loadSubAppBundles(names, done, namespace) {
      done = done || (() => {});
      namespace = ensureNamespace(namespace);

      const toLoad = [].concat(names).filter(x => xv1.getBundle(x, namespace) === undefined);

      if (toLoad.length === 0) {
        return done();
      }

      const ba = xv1.getBundleAssets(namespace);
      const loaded = [];
      const assetsToLoad = toLoad
        .reduce((a, name) => {
          const chunkIds = ba.entryPoints[name];
          return chunkIds.reduce((a2, id) => {
            // chunk could have multiple assets
            const assets = ba.jsChunksById[id];
            return assets
              ? a2.concat({
                  name,
                  id,
                  assets: [].concat(assets)
                })
              : a2;
          }, a);
        }, [])
        .filter(({ id }) => {
          id = id.toString();
          if (xv1.getBundle(id, namespace) === undefined) {
            xv1.setBundle(id, 0, namespace); // mark as loading

            return true;
          }

          return false;
        });
      assetsToLoad.forEach(({ name, id, assets }) => {
        const new_assets = assets.map(asset => `${ba.basePath}${asset}`);
        const afterLoad = () => {
          loaded.push(assets);
          if (loaded.length === assetsToLoad.length) {
            console.log("all assets loaded", assetsToLoad);
            done();
          }
        };
        loadjs(new_assets, id, {
          success: () => {
            console.log(`loaded asset for ${name} (id: ${id}) - ${assets}`);
            xv1.setBundle(id, 1, namespace);
            afterLoad();
          },
          error: () => {
            console.error(`load asset ${name} (id: ${id}) failed`, err);
            afterLoad();
          }
        });
      });
    },

    dyn(id) {
      const msg = "ERROR: fail retrieve dynamic data from element";
      const element = document.getElementById(id);
      if (!element) {
        console.error(msg, id, "- get");
      } else {
        try {
          return JSON.parse(element.innerHTML);
        } catch (err) {
          console.error(msg, "- parse");
          return {};
        }
      }
    }
  });
})(window);
