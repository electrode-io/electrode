/* eslint-disable no-console, max-statements, global-require, @typescript-eslint/no-var-requires */

import Path from "path";
import { loadCdnMap, mapCdn, wrapStringFragment, urlJoin } from "./utils";
import { WebpackStats } from "./webpack-stats";
import Crypto from "crypto";
import { AssetPathMap, InitProps } from "./types";
import { SSR_PIPELINES, safeStringifyJson } from "./utils";

/**
 * Initialize assets that namespace will isolate
 *
 * @param props - server template token props
 * @param staticAssets - static assets
 * @param namespace - name space
 *
 * @returns assets
 */

function initializeNamespaceAssets(staticAssets: any, namespace: string) {
  const { cdnMapData, cdnMapDataString, randomId } = staticAssets;

  let cdnAsJsonScript = "";
  let cdnUpdateScript = "";
  if (cdnMapData) {
    const cdnMapJsonId = `${namespace}.cdn-map-${randomId}`;
    cdnAsJsonScript = `<script{{SCRIPT_NONCE}} type="application/json" id="${cdnMapJsonId}">
${cdnMapDataString}
</script>
`;
    cdnUpdateScript = `window.xarcV2.cdnUpdate({md:window.xarcV2.dyn("${cdnMapJsonId}")})
`;
  }

  return { cdnUpdateScript, cdnAsJsonScript };
}

/**
 * Initialize common static assets such as xarcV2 client code, CDN data, and other JS bundles.
 *
 * @param props - server template token props
 *
 * @returns assets
 */
function initializeStaticAssets(props: InitProps) {
  const isProd = process.env.NODE_ENV === "production";
  const distDir = isProd
    ? Path.join(__dirname, "../../dist/min")
    : Path.join(__dirname, "../../dist-browser~es5~cjs~/browser");

  const getClientJs = (file: string, exportName: string) => {
    const code = require(Path.join(distDir, file))[exportName].toString();
    return `(${code})(window);
`;
  };

  const isWebpackDev = Boolean(process.env.WEBPACK_DEV);

  const stats = new WebpackStats();
  stats.load();

  let pathMap: AssetPathMap;
  let cdnMap;

  if (isWebpackDev) {
    if (props.devAssetData) {
      pathMap = props.devAssetData.pathMap;
      cdnMap = props.devAssetData.cdnMap;
    }
  } else if (props.prodAssetData) {
    pathMap = props.prodAssetData.pathMap;
    cdnMap = props.prodAssetData.cdnMap;
  }

  if (!pathMap) {
    pathMap = { base: "/js" };
  }

  const cdnMapData = cdnMap && (typeof cdnMap === "string" ? loadCdnMap(cdnMap) : cdnMap);

  // eslint-disable-next-line
  const xarcVer = require("@xarc/app/package.json").version.split(".")[0];

  // client side JS code required to start subapps and load assets
  // @xarc/app version 10 above use webpack 5 and no longer need webpack4Jsonp scripts
  const webpack4JsonpJs = xarcVer < 10 ? getClientJs("webpack4-jsonp.js", "webpack4JsonP") : "";
  const xarcV2Js = getClientJs("xarc-subapp-v2.js", "xarcV2Client");
  const cdnMapScripts = !cdnMap ? "" : getClientJs("xarc-cdn-map.js", "xarcCdnMap");

  const getFileAssetPath = (file: string) => {
    const fromCdn = mapCdn(file, cdnMapData);
    if (fromCdn !== false) {
      return fromCdn;
    }

    const prefix = pathMap.base;
    const ext = pathMap[Path.extname(file)] || "";
    return urlJoin(prefix, ext, file);
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
    webpack4JsonpJs,
    xarcV2Js,
    cdnMapScripts,
    cdnMapData,
    cdnMapDataString: cdnMapData && safeStringifyJson(cdnMapData),
    runtimeJsScripts,
    mainJsScripts,
    allCssLinks,
    randomId: Crypto.randomBytes(8).toString("base64") //  eslint-disable-line
  };
}

/**
 * Initialize all the up front code required for running subapps in the browser.
 *
 * @param setupContext - context for setup
 * @param setupToken - token for setup
 * @returns data with template process callback
 */
export function initSubApp(setupContext: any, setupToken: Partial<{ props: InitProps }>) {
  const staticAssets = initializeStaticAssets(setupToken.props);
  const {
    allCssLinks,
    xarcV2Js,
    cdnMapScripts,
    webpack4JsonpJs,
    runtimeJsScripts,
    mainJsScripts
  } = staticAssets;

  return {
    process(context) {
      const { request, scriptNonceAttr, styleNonceAttr, namespace } = context.user;

      const { cdnAsJsonScript, cdnUpdateScript } = initializeNamespaceAssets(
        staticAssets,
        namespace
      );

      request[SSR_PIPELINES] = [];

      const addScriptNonce = (text: string) => {
        return !scriptNonceAttr
          ? text
          : text && text.replace(/{{SCRIPT_NONCE}}/g, context.user.scriptNonceAttr);
      };

      const addStyleNonce = (text: string) => {
        return !styleNonceAttr
          ? text
          : text && text.replace(/{{STYLE_NONCE}}/g, context.user.styleNonceAttr);
      };

      return `
${addStyleNonce(allCssLinks)}${addScriptNonce(cdnAsJsonScript)}<script${scriptNonceAttr}>
// xarc client side support code
${webpack4JsonpJs}${xarcV2Js}${cdnMapScripts}// End of xarc client side support code
${cdnUpdateScript}</script>
${addScriptNonce(runtimeJsScripts)}${addScriptNonce(mainJsScripts)}`;
    }
  };
}
