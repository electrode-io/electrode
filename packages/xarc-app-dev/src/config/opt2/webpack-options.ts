// webpack config collected from env-webpack.ts

import { RemoteSubAppOptions } from "./remote-federation";

/**
 * Options for CDN server.
 *
 */
export type WebpackCdnOptions = {
  /**
   * Enable the use of a CDN server for serving assets.
   *
   * - Setting this `true` will force `publicPath` default to `"auto"` for production mode **unless**
   * mapping is also set to `true`.
   *
   */
  enable?: boolean;
  /**
   * Enable URL mapping if CDN server gives a different URL for each asset
   *
   * - If `mapping` is `false`, then `publicPath` must be `"auto"` for assets to work.
   * - If `mapping` is `true`, then post processing is required to provide the mapping data
   *   for the app.
   */
  mapping?: boolean;

  /**
   * If you don't need CDN mapping, but `"auto"` `publicPath` doesn't work, and you know
   * ahead of time what it should be, then you can set it here.
   */
  publicPath?: string;
};

/**
 * User configurable options that are related to Webpack
 */
export type WebpackOptions = {
  /**
   * Enable webpack dev mode.  **Default: `false`**
   *  - If not set, then will check env `WEBPACK_DEV`
   */
  webpackDev?: boolean;
  /**
   * Host name to use for webpack dev URL.  **Default: `localhost`**
   *  - If not set, then check env `WEBPACK_HOST`, then `WEBPACK_DEV_HOST`, and finally `HOST`
   */
  devHostname?: string;

  /**
   *
   * In dev mode, this sets the proxy forward port for the webpack dev server.
   * If it's not defined or `0`, then a randomly available port is picked every time.
   *
   * - **Default: `0`** - pick a random port
   *
   * - If not set, then check env `WEBPACK_DEV_PORT`
   *
   * .
   */
  devPort?: number;

  /**
   * Using a built-in reverse proxy, the webpack dev assets are served from the
   * same host and port as the app.  In that case, the URLs to assets are relative
   * without protocol, host, port.
   *
   * However, user can simulate CDN server with the proxy and have assets URLs
   * specifying different host/port from the app.  To do that, the following
   * should be defined.
   *
   * - If not set, then check env `WEBPACK_DEV_CDN_PROTOCOL`
   */
  cdnProtocol?: string;
  /**
   * Host name to use for CDN simulation, see option `cdnProtocol` for more info.
   *
   * - If not set, then check env `WEBPACK_DEV_CDN_HOST`
   */
  cdnHostname?: string;
  /**
   * Host name to use for CDN simulation, see option `cdnProtocol` for more info.
   *
   * - If not set, then check env `WEBPACK_DEV_CDN_PORT`
   */
  cdnPort?: number;

  /**
   * in dev mode, all webpack output are saved to memory only, but some files like
   * stats.json are needed by different uses and the stats partial saves a copy to
   * disk.  It will use this as the path to save the file.
   * - **Default: `.etmp`**
   * - If not set, then check env `WEBPACK_DEV_ARTIFACTS_PATH`
   */
  devArtifactsPath?: string;

  /**
   * Configure CSS module support.
   *
   * Settings:
   * 1. `true` or "cssOnly" (**default**): CSS module for any file with `.css` extension
   * 2. RegExp: CSS module for any file that matches the custom RegExp
   * 3. `"all"`: CSS module for all style files (`css`, `styl`, `sass`, `scss`)
   * 4. `"byModExt"`: Use the preset RegExp that matches any file ending with `.mod.{ext}` or `.module.{ext}`
   *    ie: `/\.(mod|module)\.(css|styl|sass|scss)$/i`
   * 5. `false`: Disable CSS module completely
   *
   * - Legacy: You can also set this option with env `CSS_MODULE_SUPPORT`.
   *
   */
  cssModuleSupport?: boolean | RegExp | "all" | "byModExt" | "cssOnly";

  /**
   * Enable loading `@babel/polyfill` for application
   * - **Default: `false`**
   */
  enableBabelPolyfill?: boolean;

  /**
   * Enable webpack's NodeSourcePlugin to simulate node.js libs in browser
   * - **Default: `false`**
   * - If not set, then check env `ENABLE_NODESOURCE_PLUGIN`
   *
   * "@remarks"
   *  This will bundle 100K+ of JavaScript to simulate node.js env
   */
  enableNodeSourcePlugin?: boolean;

  /**
   * Support hot module reload for your web app code
   * - **Default: `true`**
   * - if not set, then we check env `WEBPACK_HOT_MODULE_RELOAD`
   */
  enableHotModuleReload?: boolean;
  /**
   * If hot module reload is enabled, then if you make a change that has error,
   * then an overlay on top of the browser page will show the error.
   * - **Default: `true`**
   * - if not set, then we check env `WEBPACK_DEV_WARNINGS_OVERLAY`
   */
  enableWarningsOverlay?: boolean;

  /**
   * Size limit to prevent inlining woff fonts data
   * - **Default: `1000`**
   * - if not set, then we check env `WOFF_FONT_INLINE_LIMIT`
   */
  woffFontInlineLimit?: number;

  /**
   * https://webpack.js.org/configuration/resolve/#resolve-symlinks
   * - **Default: `false`**
   * - if not set, then we check env `WEBPACK_PRESERVE_SYMLINKS`, then `NODE_PRESERVE_SYMLINKS`
   */
  preserveSymlinks?: boolean;

  /**
   * If CSS module is used, then use a shorten class name for CSS in production mode
   * - **Default: `true`**
   * - if not set, then we check env `ENABLE_SHORTEN_CSS_NAMES`
   */
  enableShortenCSSNames?: boolean;

  /**
   * Code splitting should optimize to minimize the number of JS chunks are generated.
   *
   * **Default: `false`**
   * - if not set, then we check env: `MINIMIZE_SUBAPP_CHUNKS`
   */
  minimizeSubappChunks?: boolean;

  /**
   * Custom options for optimizing critical CSS
   * - if not set, then we check env: `OPTIMIZE_CSS_OPTIONS` (which should be a JSON string)
   * - TBD: define type for it
   */
  optimizeCssOptions?: Record<any, unknown>;
  /**
   * Custom object with list of webpack DLLs to load
   * - **Default: `{}`**
   * - if not set, then we check env: `ELECTRODE_LOAD_DLLS` (which should be a JSON string)
   * - TBD: define type for it
   */
  loadDlls?: Record<any, unknown>;
  /**
   * Should webpack minify code output in production mode?
   * - **Default: `true`**
   * - Useful if you want to build production without minifying for debugging
   */
  minify?: boolean;

  /**
   * Use this flag to control how we load your `webpack.config.js|ts`.
   *
   * When you create your own `webpack.config.js|ts` to customize webpack config, we start webpack
   * with your config, which is responsible for loading xarc's internal config.
   *
   * If you want to turn off this behavior so we start with xarc's internal webpack config
   * and then load yours, then set this to false.
   *
   * If you use `.ts` (typescript) for your config file, then we will try to load `ts-node/register`.
   * You need to install ts-node package and have your tsconfig setup for your typescript.
   */
  useAppWebpackConfig?: boolean;

  /**
   * Options for if you need to serve your assets from a CDN server
   *
   * **When should you use this:**
   *
   * - You need to serve your assets from a CDN server that gives URLs that are:
   *
   * > 1. Changes original asset filenames
   * > 2. Gives a different URL for each asset file
   *
   * - or if you need to set a `publicPath` other than `"auto"`.  Normally, webpack can auto detect
   *   the correct base URL, but if that doesn't work and you know ahead of time what it can be, you
   *   can set it.
   *
   * - If `"auto"` doesn't work and you don't know ahead of time what `publicPath` should be, then
   *   you would need CDN mapping.
   *
   * **About how CDN and mapping affects `publicPath`**
   *  - Without CDN mapping, for module federation remote assets to work, it must set
   *    `publicPath` to `"auto"`.
   *  - In development mode, webpack dev server serves the assets and CDN options
   *    will have no effect, and `publicPath` is forced to be the following:
   *  > - module federation remote assets - `"auto"`
   *  > - normal assets - `"/js"`
   *
   */
  cdn?: WebpackCdnOptions;

  /**
   * Specify Module Federation options to expose or consume remote V1 subapps through webpack5's
   * ModuleFederationPlugin.  See docs at https://webpack.js.org/concepts/module-federation/
   *
   * TODO: Exposing SubApps remotely has these limitations:
   * 1. `publicPath` must be `"auto"` to expose subapps remotely.
   * 2. Due to 1, cannot use CDN for assets.
   * 3. Cannot use `"single"` shared webpack `runtimeChunk` optimization.
   *
   * @remark this is only for subappV1
   */
  v1RemoteSubApps?: RemoteSubAppOptions;
};
