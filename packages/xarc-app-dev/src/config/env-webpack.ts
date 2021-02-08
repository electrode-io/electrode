import xenvConfig from "xenv-config";
import { merge } from "lodash";
import { getUserConfig } from "./user-config";

/**
 * Get webpack settings from env (deprecated)
 *
 * @returns webpack settings from env
 */
export function getEnvWebpack(): any {
  const userConfig = getUserConfig();

  const webpackConfigSpec = {
    webpackDev: { env: "WEBPACK_DEV", default: false },
    devHostname: { env: ["WEBPACK_HOST", "WEBPACK_DEV_HOST", "HOST"], default: "localhost" },
    devPort: { env: "WEBPACK_DEV_PORT", default: 2992 },
    // Using a built-in reverse proxy, the webpack dev assets are served from the
    // same host and port as the app.  In that case, the URLs to assets are relative
    // without protocol, host, port.
    // However, user can simulate CDN server with the proxy and have assets URLs
    // specifying different host/port from the app.  To do that, the following
    // should be defined.
    cdnProtocol: { env: ["WEBPACK_DEV_CDN_PROTOCOL"], type: "string", default: null },
    cdnHostname: { env: ["WEBPACK_DEV_CDN_HOST"], type: "string", default: null },
    cdnPort: { env: ["WEBPACK_DEV_CDN_PORT"], default: 0 },
    //
    // in dev mode, all webpack output are saved to memory only, but some files like
    // stats.json are needed by different uses and the stats partial saves a copy to
    // disk.  It will use this as the path to save the file.
    devArtifactsPath: { env: "WEBPACK_DEV_ARTIFACTS_PATH", default: ".etmp" },
    cssModuleSupport: { env: "CSS_MODULE_SUPPORT", type: "boolean", default: undefined },
    enableBabelPolyfill: { env: "ENABLE_BABEL_POLYFILL", default: false },
    enableNodeSourcePlugin: { env: "ENABLE_NODESOURCE_PLUGIN", default: false },
    enableHotModuleReload: { env: "WEBPACK_HOT_MODULE_RELOAD", default: true },
    enableWarningsOverlay: { env: "WEBPACK_DEV_WARNINGS_OVERLAY", default: true },
    woffFontInlineLimit: { env: "WOFF_FONT_INLINE_LIMIT", default: 1000 },
    preserveSymlinks: {
      env: ["WEBPACK_PRESERVE_SYMLINKS", "NODE_PRESERVE_SYMLINKS"],
      default: false
    },
    enableShortenCSSNames: { env: "ENABLE_SHORTEN_CSS_NAMES", default: true },
    minimizeSubappChunks: { env: "MINIMIZE_SUBAPP_CHUNKS", default: false },
    optimizeCssOptions: {
      env: "OPTIMIZE_CSS_OPTIONS",
      type: "json",
      default: {
        cssProcessorOptions: {
          zindex: false
        }
      }
    },
    loadDlls: { env: "ELECTRODE_LOAD_DLLS", type: "json", default: {} },
    minify: { env: "WEBPACK_MINIFY", default: true }
  };

  return xenvConfig(webpackConfigSpec, userConfig.webpack, { merge });
}
