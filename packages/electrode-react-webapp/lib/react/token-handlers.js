"use strict";

/* eslint-disable max-statements, max-depth */

const _ = require("lodash");
const groupScripts = require("../group-scripts");
const HttpStatusCodes = require("http-status-codes");

const HTTP_ERROR_500 = 500;

const utils = require("../utils");

const getIconStats = utils.getIconStats;
const getCriticalCSS = utils.getCriticalCSS;

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
    return WEBPACK_DEV
      ? data.devJSBundle
      : (data.jsChunk && `${prodBundleBase}${data.jsChunk.name}`) || "";
  };

  const htmlifyScripts = (scripts, scriptNonce) => {
    return scripts
      .map(
        x =>
          typeof x === "string"
            ? `<script${scriptNonce}>${x}</script>\n`
            : x.map(n => `<script src="${n.src}"></script>`).join("\n")
      )
      .join("\n");
  };

  const transformOutput = (result, context) => {
    const content = context.user.content;
    if (content && content.status !== HttpStatusCodes.OK) {
      return {
        status: content.status,
        path: content.path,
        store: content.store,
        html: result
      };
    }

    return result;
  };

  const beforeRender = async context => {
    const options = context.options;
    const request = options.request;
    const mode = options.mode;
    let renderSs = RENDER_SS;
    if (renderSs) {
      if (mode === "noss") {
        renderSs = false;
      } else if (renderSs === "datass" || mode === "datass") {
        // signal user content callback to populate prefetch data only and skips actual SSR
        _.set(request, ["app", "ssrPrefetchOnly"], true);
      }
    }

    const prepareContext = content => {
      if (content.render === false || content.html === undefined) {
        return context.skipRender(content);
      }

      let cspScriptNonce;
      let cspStyleNonce;
      if (routeOptions.cspNonceValue !== undefined) {
        const nonceObject = routeOptions.cspNonceValue;
        if (typeof nonceObject === "function") {
          cspScriptNonce = nonceObject(request, "script");
          cspStyleNonce = nonceObject(request, "style");
        } else {
          cspScriptNonce = _.get(request, nonceObject.script, undefined);
          cspStyleNonce = _.get(request, nonceObject.style, undefined);
        }
      }

      const chunkNames = chunkSelector(request);

      let devCSSBundle;
      if (chunkNames.css) {
        const cssChunks = Array.isArray(chunkNames.css) ? chunkNames.css : [chunkNames.css];
        devCSSBundle = _.map(cssChunks, chunkName => `${devBundleBase}${chunkName}.style.css`);
      } else {
        devCSSBundle = [`${devBundleBase}style.css`];
      }

      const devJSBundle = chunkNames.js
        ? `${devBundleBase}${chunkNames.js}.bundle.dev.js`
        : `${devBundleBase}bundle.dev.js`;
      const jsChunk = _.find(assets.js, asset => _.includes(asset.chunkNames, chunkNames.js));
      const cssChunk = _.filter(assets.css, asset =>
        _.some(asset.chunkNames, assetChunkName => _.includes(chunkNames.css, assetChunkName))
      );
      const scriptNonce = cspScriptNonce ? ` nonce="${cspScriptNonce}"` : "";
      const styleNonce = cspStyleNonce ? ` nonce="${cspStyleNonce}"` : "";

      const renderJs = RENDER_JS && mode !== "nojs";

      context.setOutputTransform(transformOutput);
      context.user = {
        request: options.request,
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

    let userContent = options.content;

    // prepare user content for container of SSR output

    if (typeof userContent === "function") {
      if (renderSs) {
        // invoke user content as a function, which could return any content
        // as static html or generated from react's renderToString
        userContent = userContent(options.request, options, context);
        if (userContent.then) {
          try {
            // user function needs to generate the content async, so wait for it.
            return prepareContext(await userContent);
          } catch (err) {
            if (!err.status) err.status = HTTP_ERROR_500;
            throw err;
          }
        }
      } else {
        userContent = { status: 200, html: "<!-- noss mode -->" };
      }
    } else if (typeof userContent === "string") {
      userContent = { status: 200, html: userContent };
    }

    return prepareContext(userContent);
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

    [META_TAGS_MARKER]: () => {
      return iconStats;
    },

    [CRITICAL_CSS_MARKER]: context => {
      return criticalCSS ? `<style${context.user.styleNonce}>${criticalCSS}</style>` : "";
    },

    INITIALIZE: () => undefined,
    HEAD_CLOSED: () => undefined,
    AFTER_SSR_CONTENT: () => undefined,
    BODY_CLOSED: () => undefined,
    HTML_CLOSED: () => undefined
  };

  return {
    name: "electrode-react-token-handlers",
    beforeRender,
    routeOptions,
    routeData,
    tokens: tokenHandlers
  };
};
