/* eslint-disable no-console, max-statements, global-require, @typescript-eslint/no-var-requires */

import * as Path from "path";
import { generateNonce, loadCdnMap, mapCdn, wrapStringFragment } from "./utils";
import { WebpackStats } from "./webpack-stats";

/**
 * Pass nonce info to xarc for generating script and style tags into the HTML
 */
export type NonceInfo = {
  /** insert nonce for script tags? default: `true` */
  script?: boolean;
  /** insert nonce for style tags? default: `true` */
  style?: boolean;

  /** nonce tokens */
  tokens: {
    all?: string;
    script?: string;
    style?: string;
  };

  /** token generator */
  generator?: (tag?: string) => string;
};

/**
 * mapping of asset path by file extensions
 *
 * - extensions must have `.` prefix: `.js`
 * - `base` must be provided
 *
 * ie:
 * ```js
 * {
 *   base: "/assets",
 *   ".js": "/js",
 *   ".css": "/css"
 * }
 * ```
 */
export type AssetPathMap = {
  /** The common base path for all */
  base: string;
} & Record<string, string>;

/**
 * Initialize all the up front code required for running subapps in the browser.
 *
 * @param setupContext - context for setup
 * @param setupToken - token for setup
 * @returns data with template process callback
 */
export function initSubApp(setupContext: any, setupToken: any) {
  const isProd = process.env.NODE_ENV === "production";
  const distDir = isProd
    ? Path.join(__dirname, "../../dist/min")
    : Path.join(__dirname, "../../dist-browser~es5~cjs~/browser");

  // this only exist in dev because it's comment, which are removed from minified version
  const getClientJs = (file: string, exportName: string) => {
    const code = require(Path.join(distDir, file))[exportName].toString();
    return `(${code})(window);
`;
  };

  const isWebpackDev = Boolean(process.env.WEBPACK_DEV);

  const stats = new WebpackStats();
  stats.load();

  const assetBasePath = (!isWebpackDev && setupToken.props.assetPathMap) || {
    base: "/js"
  };

  const cdnMap = !isWebpackDev && setupToken.props.cdnMap;
  const cdnMapData = cdnMap && (typeof cdnMap === "string" ? loadCdnMap(cdnMap) : cdnMap);
  const cdnMapDataScripts = !cdnMapData
    ? ""
    : `window.xarcV2.cdnUpdate({md:${JSON.stringify(cdnMapData)}})
`;

  // client side JS code required to start subapps and load assets
  const webpack4JsonpJs = getClientJs("webpack4-jsonp.js", "webpack4JsonP");
  const xarcV2Js = getClientJs("xarc-subapp-v2.js", "xarcV2Client");
  const cdnMapScripts = !cdnMap ? "" : getClientJs("xarc-cdn-map.js", "xarcCdnMap");

  const getFileAssetPath = (file: string) => {
    const fromCdn = mapCdn(file, cdnMapData);
    if (fromCdn !== false) {
      return fromCdn;
    }

    const prefix = assetBasePath.base;
    const ext = assetBasePath[Path.extname(file)] || "";
    return Path.posix.join(prefix, ext, file);
  };

  const runtimeJsFiles = stats.getChunkAssetFilename("runtime", ".js");
  const runtimeJsScripts = wrapStringFragment(
    runtimeJsFiles
      .map((file: string) => `<script{{SCRIPT_NONCE}} src="${getFileAssetPath(file)}"></script>`)
      .join("\n"),
    "",
    "\n"
  );
  const mainJsFiles = stats.getChunkAssetFilename("main", ".js");
  const mainJsScripts = wrapStringFragment(
    mainJsFiles
      .map((file: string) => `<script{{SCRIPT_NONCE}} src="${getFileAssetPath(file)}"></script>`)
      .join("\n"),
    "",
    "\n"
  );

  // const mainCssFiles = stats.getChunkAssetFilename("main", ".css");
  // const mainCssLink =
  //   mainCssFiles.length < 1
  //     ? ""
  //     : mainCssFiles.map(file => `<link rel="stylesheet" href="${getFileAssetPath(file)}" />`);

  //
  // TODO: only preload CSS for subapp chunks that has SSR
  //
  const allCssLinks = wrapStringFragment(
    stats.allChunkNames
      .map(chunkName => {
        const links = stats.getChunkAssetFilename(chunkName, ".css").map(cssFile => {
          return `<link{{STYLE_NONCE}} rel="stylesheet" href="${getFileAssetPath(cssFile)}" />`;
        });
        return wrapStringFragment(links.join(""), `<!-- CSS for chunk ${chunkName} -->`);
      })
      .filter(x => x)
      .join("\n"),
    "",
    "\n<!-- End of CSS loading -->\n"
  );

  return {
    process(context) {
      const { attr: scriptNonceAttr, nonce: scriptNonce } = generateNonce(
        setupToken,
        null,
        "script"
      );
      const { attr: styleNonceAttr, nonce: styleNonce } = generateNonce(
        setupToken,
        scriptNonce,
        "style"
      );

      if (!context.user) {
        context.user = {};
      }

      context.user.request = context.options.request;
      context.user.scriptNonce = scriptNonce;
      context.user.scriptNonceAttr = scriptNonceAttr;
      context.user.styleNonce = styleNonce;
      context.user.styleNonceAttr = styleNonceAttr;

      const cspValues = [];
      const setCspNonce = (nonce, tag) => {
        if (nonce) {
          const { tokens } = nonce;
          const token = tokens[tag] || tokens.all;
          // strict-dynamic is required for webpack to load dynamic import bundles
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src#strict-dynamic_2
          cspValues.push(`${tag}-src-elem 'strict-dynamic' 'nonce-${token}';`);
        }
      };

      setCspNonce(context.user.scriptNonce, "script");
      setCspNonce(context.user.styleNonce, "style");

      if (cspValues.length > 0) {
        context.user.cspHeader = cspValues.join(" ");
      }

      const addScriptNonce = (text: string) => {
        return text && text.replace(/{{SCRIPT_NONCE}}/g, scriptNonceAttr);
      };

      const addStyleNonce = (text: string) => {
        return text && text.replace(/{{STYLE_NONCE}}/g, styleNonceAttr);
      };

      return `
${addStyleNonce(allCssLinks)}<script${scriptNonceAttr}>
// xarc client side support code
${webpack4JsonpJs}${xarcV2Js}${cdnMapScripts}// End of xarc client side support code
${cdnMapDataScripts}</script>
${addScriptNonce(runtimeJsScripts)}${addScriptNonce(mainJsScripts)}`;
    }
  };
}
