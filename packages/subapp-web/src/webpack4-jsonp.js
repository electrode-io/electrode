/**
 * When CDN is enabled, inject a jsonp src translation function
 * for webpack 4's bundle loading.
 *
 * Requires processing done by the plugin
 * xarc-webpack/src/plugins/jsonp-script-src-plugin
 */
(function (w) {
  w.__webpack_get_script_src__ = (chunkId, publicPath, originalSrc) => {
    const chunks = w.xarcV1 && w.xarcV1.getBundleAssets().jsChunksById;
    return (chunks && chunks[chunkId]) || originalSrc;
  };
})(window);
