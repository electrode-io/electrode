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
    window.webSubApps._bundles[id] = 1;
  });
}

function loadSubAppBundles(names, done) {
  const wsa = window.webSubApps;
  done = done || (() => {});

  const toLoad = [].concat(names).filter(x => wsa._bundles[x] === undefined);
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
  const assetsToLoad = toLoad
    .reduce((a, name) => {
      const chunkIds = ba.entryPoints[name];
      return chunkIds.reduce((a2, id) => {
        // chunk could have multiple assets
        return [].concat(ba.jsChunksById[id]).reduce((a3, asset) => {
          return a3.concat({ name, id, asset });
        }, a2);
      }, a);
    }, [])
    .filter(({ id }) => {
      if (wsa._bundles[id] === undefined) {
        wsa._bundles[id] = 0; // mark as loading
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
          wsa._bundles[id]++;
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
