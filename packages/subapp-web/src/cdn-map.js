//
// add CDN mapping support to xarc subapp client side lib
//
(function (w) {
  const xv1 = w.xarcV1;
  if (!xv1) return;

  // cdnUpdate({md: {}}) - add mapping data to the CDN mapping resource
  xv1.cdnUpdate = data => {
    const md = data.md;
    for (const k in md) {
      if (xv1.rt.md[k]) {
        console.error("CDN map already exist:", k);
      } else {
        xv1.rt.md[k] = md[k];
      }
    }
  };

  // cdnMap(key) - lookup CDN URL for key in the mapping
  xv1.cdnMap = f => {
    for (const k in xv1.rt.md) {
      if (k.indexOf(f) >= 0) {
        return xv1.rt.md[k];
      }
    }
    console.error("CDN map not found:", f);
  };

  // compatible with window._wml.cdn
  if (!w._wml) {
    w._wml = {};
  }

  w._wml.cdn = {
    map: xv1.cdnMap,
    update: xv1.cdnUpdate
  };

  xv1.cdnInit = mapData => {
    w._wml.cdn.md = xv1.rt.md = mapData.md || mapData;
  };

  // initialize bundle assets
  xv1.getBundleAssets(w.__default__namespace);
})(window);
