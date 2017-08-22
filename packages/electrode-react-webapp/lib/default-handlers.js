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
  const emptyTitleRegex = /<title[^>]*><\/title>/;
  const iconStats = routeData.iconStats;

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

  const htmlifyScripts = (scripts, paddedNonce) => {
    return scripts
      .map(
        x =>
          typeof x === "string"
            ? `<script${paddedNonce}>${x}</script>\n`
            : x.map(n => `<script src="${n.src}"></script>`).join("\n")
      )
      .join("\n");
  };

  return {
    [CONTENT_MARKER]: context => {
      return context.content.html || "";
    },

    [TITLE_MARKER]: context => {
      const helmet = context.$.data.helmet;
      const helmetTitleScript = helmet.title.toString();
      const helmetTitleEmpty = helmetTitleScript.match(emptyTitleRegex);

      return helmetTitleEmpty ? `<title>${routeOptions.pageTitle}</title>` : helmetTitleScript;
    },

    [HEADER_BUNDLE_MARKER]: context => {
      const data = context.$.data;
      const manifest = bundleManifest();
      const manifestLink = manifest ? `<link rel="manifest" href="${manifest}" />\n` : "";
      const css = WEBPACK_DEV
        ? data.devCSSBundle
        : (data.cssChunk && `${prodBundleBase}${data.cssChunk.name}`) || "";
      const cssLink = css && !data.criticalCSS ? `<link rel="stylesheet" href="${css}" />` : "";
      const scriptsFromHelmet = ["link", "style", "script", "noscript"]
        .map(tagName => data.helmet[tagName].toString())
        .join("");

      const htmlScripts = htmlifyScripts(groupScripts(routeOptions.unbundledJS.enterHead).scripts);
      return `${manifestLink}${cssLink}${htmlScripts}\n${scriptsFromHelmet}`;
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
        : `<script${context.$.data.paddedNonce}>${context.content.prefetch}</script>`;
    },

    [META_TAGS_MARKER]: context => {
      const x = context.$.data.helmet.meta.toString() + iconStats;
      return x;
    },

    [CRITICAL_CSS_MARKER]: context => {
      return context.$.data.criticalCSS;
    }
  };
};
