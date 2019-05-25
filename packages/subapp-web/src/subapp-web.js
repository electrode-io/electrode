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

function markBundlesLoaded(names) {
  [].concat(names).forEach(x => {
    window.webSubApps._bundles[x] = true;
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
    const bundle = ba.byChunkName[name];
    wsa._bundles[name] = null; // mark as loading
    window._lload(`${ba.basePath}${bundle}`, {
      callback: err => {
        if (err) {
          console.error(`load bundle ${name} failed`, err);
        } else {
          console.log(`loaded bundle for ${name} - ${bundle}`);
          wsa._bundles[name] = true;
        }
        loaded.push(name);
        if (loaded.length === toLoad.length) {
          console.log("all bundles loaded", toLoad);
          done();
        }
      }
    });
  });
}
