"use strict";

/* eslint-disable max-statements, max-depth */

const groupScripts = require("../group-scripts");

const {
  getIconStats,
  getCriticalCSS,
  getDevCssBundle,
  getDevJsBundle,
  getProdBundles,
  processRenderSsMode,
  getCspNonce
} = require("../utils");

const { getContent, transformOutput, htmlifyScripts } = require("./content");

const CONTENT_MARKER = "SSR_CONTENT";
const HEADER_BUNDLE_MARKER = "WEBAPP_HEADER_BUNDLES";
const BODY_BUNDLE_MARKER = "WEBAPP_BODY_BUNDLES";
const TITLE_MARKER = "PAGE_TITLE";
const PREFETCH_MARKER = "PREFETCH_BUNDLES";
const META_TAGS_MARKER = "META_TAGS";
const CRITICAL_CSS_MARKER = "CRITICAL_CSS";

module.exports = function setup(handlerContext /* , asyncTemplate */) {
  const routeOptions = handlerContext.routeOptions;

  const WEBPACK_DEV = routeOptions.webpackDev;
  const RENDER_JS = routeOptions.renderJS;
  const RENDER_SS = routeOptions.serverSideRendering;
  const assets = routeOptions.__internals.assets;
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
    devBundleBase,
    prodBundleBase,
    chunkSelector,
    iconStats,
    criticalCSS
  };

  handlerContext.routeData = routeData;

  const bundleManifest = () => {
    if (!assets.manifest) {
      return "";
    }

    return WEBPACK_DEV
      ? `${devBundleBase}${assets.manifest}`
      : `${prodBundleBase}${assets.manifest}`;
  };

  const bundleJs = data => {
    if (!data.renderJs) {
      return "";
    }
    if (WEBPACK_DEV) {
      return data.devJSBundle;
    } else if (data.jsChunk) {
      return `${prodBundleBase}${data.jsChunk.name}`;
    } else {
      return "";
    }
  };

  const INITIALIZE = async context => {
    const options = context.options;
    const request = options.request;
    const mode = options.mode;
    const renderSs = processRenderSsMode(request, RENDER_SS, mode);

    const content = await getContent(renderSs, options, context);

    if (content.render === false || content.html === undefined) {
      return context.voidStop(content);
    }

    const chunkNames = chunkSelector(request);

    const devCSSBundle = getDevCssBundle(chunkNames, routeData);
    const devJSBundle = getDevJsBundle(chunkNames, routeData);

    const { jsChunk, cssChunk } = getProdBundles(chunkNames, routeData);
    const { scriptNonce, styleNonce } = getCspNonce(request, routeOptions.cspNonceValue);

    const renderJs = RENDER_JS && mode !== "nojs";

    context.setOutputTransform(transformOutput);

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

    return context;
  };

  const tokenHandlers = {
    [CONTENT_MARKER]: context => {
      return context.user.content.html || "";
    },

    [TITLE_MARKER]: () => {
      return `<title>${routeOptions.pageTitle}</title>`;
    },

    [HEADER_BUNDLE_MARKER]: context => {
      const manifest = bundleManifest();
      const manifestLink = manifest ? `<link rel="manifest" href="${manifest}" />\n` : "";
      const css = [].concat(WEBPACK_DEV ? context.user.devCSSBundle : context.user.cssChunk);

      const cssLink = css.reduce((acc, file) => {
        file = WEBPACK_DEV ? file : prodBundleBase + file.name;
        return `${acc}<link rel="stylesheet" href="${file}" />`;
      }, "");

      const htmlScripts = htmlifyScripts(
        groupScripts(routeOptions.unbundledJS.enterHead).scripts,
        context.user.scriptNonce
      );

      return `${manifestLink}${cssLink}${htmlScripts}`;
    },

    [BODY_BUNDLE_MARKER]: context => {
      const js = bundleJs(context.user);
      const jsLink = js ? { src: js } : "";

      const ins = routeOptions.unbundledJS.preBundle.concat(
        jsLink,
        routeOptions.unbundledJS.postBundle
      );
      const htmlScripts = htmlifyScripts(groupScripts(ins).scripts);

      return `${htmlScripts}`;
    },

    [PREFETCH_MARKER]: context => {
      return !context.user.content.prefetch
        ? ""
        : `<script${context.user.scriptNonce}>${context.user.content.prefetch}</script>`;
    },

    [META_TAGS_MARKER]: iconStats,

    [CRITICAL_CSS_MARKER]: context => {
      return criticalCSS ? `<style${context.user.styleNonce}>${criticalCSS}</style>` : "";
    },

    INITIALIZE,
    HEAD_INITIALIZE: null,
    HEAD_CLOSED: null,
    AFTER_SSR_CONTENT: null,
    BODY_CLOSED: null,
    HTML_CLOSED: null
  };

  return {
    name: "electrode-react-token-handlers",
    routeOptions,
    routeData,
    tokens: tokenHandlers
  };
};
