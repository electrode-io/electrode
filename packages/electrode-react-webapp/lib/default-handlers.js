"use strict";

const CONTENT_MARKER = "SSR_CONTENT";
const HEADER_BUNDLE_MARKER = "WEBAPP_HEADER_BUNDLES";
const BODY_BUNDLE_MARKER = "WEBAPP_BODY_BUNDLES";
const TITLE_MARKER = "PAGE_TITLE";
const PREFETCH_MARKER = "PREFETCH_BUNDLES";
const META_TAGS_MARKER = "META_TAGS";
const CRITICAL_CSS_MARKER = "CRITICAL_CSS";
const groupScripts = require("./group-scripts");

module.exports = function setup(options) {
  const routeOptions = options.routeOptions;
  const routeData = options.routeData;
  const WEBPACK_DEV = routeData.WEBPACK_DEV;
  const assets = routeData.assets;
  const devBundleBase = routeData.devBundleBase;
  const prodBundleBase = routeData.prodBundleBase;
  const iconStats = routeData.iconStats;
  const criticalCSS = routeData.criticalCSS;

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

  return {
    [CONTENT_MARKER]: context => {
      return context.content.html || "";
    },

    [TITLE_MARKER]: () => {
      return `<title>${routeOptions.pageTitle}</title>`;
    },

    [HEADER_BUNDLE_MARKER]: context => {
      const data = context.$.data;
      const manifest = bundleManifest();
      const manifestLink = manifest ? `<link rel="manifest" href="${manifest}" />\n` : "";
      const css = WEBPACK_DEV
        ? Array.prototype.concat(data.devCSSBundle)
        : Array.prototype.concat(data.cssChunk);

      const cssLink = css.reduce((acc, file) => {
        file = WEBPACK_DEV ? file : prodBundleBase + file.name;
        return `${acc}<link rel="stylesheet" href="${file}" />`;
      }, "");

      const htmlScripts = htmlifyScripts(
        groupScripts(routeOptions.unbundledJS.enterHead).scripts,
        context.$.data.scriptNonce
      );

      return `${manifestLink}${cssLink}${htmlScripts}`;
    },

    [BODY_BUNDLE_MARKER]: context => {
      const js = bundleJs(context.$.data);
      const jsLink = js ? { src: js } : "";

      const ins = routeOptions.unbundledJS.preBundle
        .concat([jsLink])
        .concat(routeOptions.unbundledJS.postBundle);
      const htmlScripts = htmlifyScripts(groupScripts(ins).scripts);

      return `${htmlScripts}`;
    },

    [PREFETCH_MARKER]: context => {
      return !context.content.prefetch
        ? ""
        : `<script${context.$.data.scriptNonce}>${context.content.prefetch}</script>`;
    },

    [META_TAGS_MARKER]: () => {
      return iconStats;
    },

    [CRITICAL_CSS_MARKER]: context => {
      return criticalCSS ? `<style${context.$.data.styleNonce}>${criticalCSS}</style>` : "";
    },

    INITIALIZE: () => undefined,
    HEAD_CLOSED: () => undefined,
    AFTER_SSR_CONTENT: () => undefined,
    BODY_CLOSED: () => undefined,
    HTML_CLOSED: () => undefined
  };
};
