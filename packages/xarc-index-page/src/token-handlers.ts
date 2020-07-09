/* eslint-disable max-statements, max-depth */

import {
  getIconStats,
  getCriticalCSS,
  getDevCssBundle,
  getDevJsBundle,
  getProdBundles,
  processRenderSsMode,
  getCspNonce,
  isReadableStream
} from "./utils";

import { getContent, transformOutput } from "./content";

import prefetchBundles from "./handlers/prefetch-bundles";

export const tokens = {
  INITIALIZE: "INITIALIZE",
  SSR_CONTENT: "SSR_CONTENT",
  PREFETCH_BUNDLES: "PREFETCH_BUNDLES",
  META_TAGS: "META_TAGS",
  CRITICAL_CSS: "CRITICAL_CSS",
  HEAD_INITIALIZE: "HEAD_INITIALIZE",
  HEAD_CLOSED: "HEAD_CLOSED",
  AFTER_SSR_CONTENT: "AFTER_SSR_CONTENT",
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

    return getContent(renderSs, options, context).then(content => {
      if (content.render === false || content.html === undefined) {
        return context.voidStop(content);
      }

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
        content,
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

      if (content.useStream || isReadableStream(content.html)) {
        context.setMunchyOutput();
      }

      context.setOutputTransform(transformOutput);

      return context;
    });
  };

  const tokenHandlers = {
    [tokens.SSR_CONTENT]: context => {
      return (context.user.content && context.user.content.html) || "";
    },

    [tokens.PREFETCH_BUNDLES]: prefetchBundles,

    [tokens.META_TAGS]: iconStats,

    [tokens.CRITICAL_CSS]: context => {
      return criticalCSS ? `<style${context.user.styleNonce}>${criticalCSS}</style>` : "";
    },

    [tokens.INITIALIZE]: Initialize,
    [tokens.HEAD_INITIALIZE]: null,
    [tokens.HEAD_CLOSED]: null,
    [tokens.AFTER_SSR_CONTENT]: null,
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
