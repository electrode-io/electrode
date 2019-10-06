window.webSubApps = {
  _bundles: {},
  _onLoadStart: {}
};

function startSubAppOnLoad(options) {
  const { name } = options;
  const subApp = window.webSubApps[name];

  if (!subApp || !subApp._started) {
    const ols = window.webSubApps._onLoadStart;
    if (!ols[name]) {
      ols[name] = [];
    }
    ols[name].push(options);
  } else if (subApp.start && subApp.info) {
    setTimeout(() => subApp.start(options, subApp.info), 0);
  } else {
    console.error(`subApp ${name} started but missing start and info`);
  }
}

function markBundlesLoaded(ids) {
  [].concat(ids).forEach(id => {
    window.webSubApps._bundles[id] = true;
  });
}

function loadSubAppBundles(names, done) {
  let wsa = window.webSubApps;
  done = done || (() => {});

  let toLoad = [].concat(names).filter(x => !wsa._bundles[x]);
  if (toLoad.length === 0) {
    return done();
  }

  if (!wsa.bundleAssets) {
    try {
      // TODO: right way to extract JSON from script tag?
      wsa.bundleAssets = JSON.parse(document.getElementById("bundleAssets").innerHTML);
    } catch (err) {
      console.log("ERROR: fail retrieve bundleAssets", err);
      return;
    }
  }
  const ba = wsa.bundleAssets;
  const loaded = [];

  toLoad.forEach(name => {
    const entries = ba.entryPoints[name];
    entries.forEach(id => {
      const bundle = ba.jsChunksById[id];
      wsa._bundles[id] = null; // mark as loading
      window._lload(`${ba.basePath}${bundle}`, {
        callback: err => {
          if (err) {
            console.error(`load bundle ${name} (id: ${id}) failed`, err);
          } else {
            console.log(`loaded bundle for ${name} (id: ${id}) - ${bundle}`);
            wsa._bundles[id] = true;
          }
          loaded.push(id);
          if (loaded.length === toLoad.length) {
            console.log("all bundles loaded", toLoad);
            done();
          }
        }
      });
    });
  });
}
