/* eslint-disable max-statements, max-depth */

import {
  getIconStats,
  getCriticalCSS,
  getDevCssBundle,
  getDevJsBundle,
  getProdBundles,
  processRenderSsMode,
  getCspNonce
} from "./utils";

import prefetchBundles from "./handlers/prefetch-bundles";

export const tokens = {
  INITIALIZE: "INITIALIZE",
  PREFETCH_BUNDLES: "PREFETCH_BUNDLES",
  META_TAGS: "META_TAGS",
  CRITICAL_CSS: "CRITICAL_CSS",
  HEAD_INITIALIZE: "HEAD_INITIALIZE",
  HEAD_CLOSED: "HEAD_CLOSED",
  BODY_CLOSED: "BODY_CLOSED",
  HTML_CLOSED: "HTML_CLOSED"
};

/**
 * @param handlerContext
 */
export default function setup(handlerContext /*, asyncTemplate*/) {
  const routeOptions = handlerContext.user.routeOptions;

  const WEBPACK_DEV = routeOptions.webpackDev;
  const RENDER_JS = routeOptions.renderJS;
  const RENDER_SS = routeOptions.serverSideRendering;
  const assets = routeOptions.__internals.assets;
  const otherAssets = routeOptions.__internals.otherAssets;
  const devBundleBase = routeOptions.__internals.devBundleBase;
  const prodBundleBase = routeOptions.prodBundleBase;
  const chunkSelector = routeOptions.__internals.chunkSelector;
  const iconStats = getIconStats(routeOptions.iconStats);
  const criticalCSS = getCriticalCSS(routeOptions.criticalCSS);

  const routeData = {
    WEBPACK_DEV,
    RENDER_JS,
    RENDER_SS,
    assets,
    otherAssets,
    devBundleBase,
    prodBundleBase,
    chunkSelector,
    iconStats,
    criticalCSS
  };

  handlerContext.user.routeData = routeData;

  const Initialize = context => {
    const options = context.options;
    const request = options.request;
    const mode = options.mode;
    const renderSs = processRenderSsMode(request, RENDER_SS, mode);

    const chunkNames = chunkSelector(request);

    const devCSSBundle = getDevCssBundle(chunkNames, routeData);
    const devJSBundle = getDevJsBundle(chunkNames, routeData);

    const { jsChunk, cssChunk } = getProdBundles(chunkNames, routeData);
    const { scriptNonce, styleNonce } = getCspNonce(request, routeOptions.cspNonceValue);

    const renderJs = RENDER_JS && mode !== "nojs";

    context.user = {
      request: options.request,
      response: {
        headers: {}
      },
      routeOptions,
      routeData,
      mode,
      renderJs,
      renderSs,
      scriptNonce,
      styleNonce,
      chunkNames,
      devCSSBundle,
      devJSBundle,
      jsChunk,
      cssChunk
    };

    if (context.options.useStream) {
      context.setMunchyOutput();
    }

    return context;
  };

  const tokenHandlers = {
    [tokens.PREFETCH_BUNDLES]: prefetchBundles,

    [tokens.META_TAGS]: iconStats,

    [tokens.CRITICAL_CSS]: context => {
      return criticalCSS ? `<style${context.user.styleNonce}>${criticalCSS}</style>` : "";
    },

    [tokens.INITIALIZE]: Initialize,
    [tokens.HEAD_INITIALIZE]: null,
    [tokens.HEAD_CLOSED]: null,
    [tokens.BODY_CLOSED]: null,
    [tokens.HTML_CLOSED]: null
  };

  return {
    name: "@xarc/index-page",
    routeOptions,
    routeData,
    tokens: tokenHandlers
  };
}
