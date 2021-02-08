// webpack config collected from env-webpack.ts

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
   * Port to use for webpack dev URL.  **Default: 2992**
   * - If not set, then check env `WEBPACK_DEV_PORT`
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
   * @remarks
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
};
