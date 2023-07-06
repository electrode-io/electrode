/**
 * DEMO: https://github.com/jchip/webpack-5-demo
 * REF:
 * - https://webpack.js.org/api/module-variables/
 * - https://webpack.js.org/api/module-variables/#__webpack_public_path__-webpack-specific
 * - https://github.com/webpack/webpack/pull/8462
 * - https://github.com/webpack/webpack.js.org/pull/3033
 */

/* eslint-disable no-undef, @typescript-eslint/camelcase */
// @ts-nocheck

function setup(w: any) {
  const originalGet = __webpack_get_script_filename__;
  const originalLoad = __webpack_chunk_load__;
  const originalPublicPath = __webpack_public_path__;
  __webpack_public_path__ = "";

  const xarc = w.xarcV2 || w.xarcV1;

  if (xarc && typeof __remoteCdnMapping !== "undefined") {
    xarc.cdnUpdate({ md: __remoteCdnMapping });
  }

  const getCdnMapSrc = originalSrc => {
    const src = xarc && xarc.cdnMap(originalSrc);
    return src && src !== originalSrc ? src : null;
  };

  __webpack_chunk_load__ = id => {
    __webpack_get_script_filename__ = () => {
      const originalSrc = originalGet(id);
      return getCdnMapSrc(originalSrc) || originalPublicPath + originalSrc;
    };
    const loading = originalLoad(id); // async function that returns promise for fetching
    __webpack_get_script_filename__ = originalGet;
    return loading;
  };

  const originalMiniCssF = __webpack_require__.miniCssF;
  if (originalMiniCssF) {
    __webpack_require__.miniCssF = id => {
      const originalSrc = originalMiniCssF(id);
      return getCdnMapSrc(originalSrc) || originalPublicPath + originalSrc;
    };
  }
}

if (!module.hot && typeof __webpack_chunk_load__ !== "undefined") {
  setup(window);
}
