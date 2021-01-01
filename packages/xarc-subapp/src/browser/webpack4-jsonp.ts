//
// all console.log in this file will be optimized out for production
//

/**
 * When CDN is enabled, inject a jsonp src translation function
 * for webpack 4's bundle loading.
 *
 * Requires processing done by the plugin
 * xarc-webpack/src/plugins/jsonp-script-src-plugin
 *
 * @param w - window object
 */
export function webpack4JsonP(w: any) {
  /* eslint-disable-next-line camelcase */
  w.__webpack_get_script_src__ = (chunkId: any, publicPath: string, originalSrc: string) => {
    console.debug("webpack4JsonP", chunkId, publicPath, originalSrc); // eslint-disable-line
    return w.xarcV2.cdnMap(originalSrc) || originalSrc;
  };
}
