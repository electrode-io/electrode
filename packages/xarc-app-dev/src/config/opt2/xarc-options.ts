import { AddOnFeatures } from "./add-on-features";
import { WebpackOptions } from "./webpack-options";
import { BabelOptions } from "./babel-options";

/**
 * User facing options for configuring features
 */
export type XarcOptions = {
  // configurations from env-app.ts
  /**
   * hostname to listen on for serving your application
   *
   * - **Default: `localhost`**
   * - If not set, then check env `HOST`
   */
  host?: string;

  /**
   * port to listen on for serving your application
   *
   * "@remarks"
   *  In development, this is what the dev proxy listens on.  Your app server
   *  listens on `appServerPort` that the proxy forwards to.
   *
   * - Typical values are `3000` for `HTTP` or `443`/`8443` for `HTTPS`.
   *
   * - **Default: `3000`**
   * - If it's `443` or `8443`, then automatically enable `HTTPS` and try
   *   to **also** listen on `3000` or `3300` for `http`
   * - Set it to `0` and the proxy will pick a random port.
   * - Set it to `-1` to disable `http` and use `httpsPort` to listen on `https` only.
   * - If not set, then check env `PORT`
   *
   * "@remarks" Regarding `HTTPS`:
   * - If you want full control of `https` and `http` ports, set `httpsPort` and `port`.
   * - If you set `port` to `443` or `8443`, then dev proxy do `https` on that port, and
   *   listens on something that doesn't conflict with `appServerPort`, which is
   *   `3000` or `3300`.
   * - if `https` is enabled, the dev proxy will always try to listen on `http` also.
   *
   * .
   */
  port?: number;

  /**
   * Set this to force `https` on the port you want, in case you want to serve your app
   * with https on a port other than `443` or `8443`.
   *
   * - if not set, then check env then `XARC_DEV_HTTPS`
   * - Set it to `0` and the proxy will pick a random port for `https`.
   * - Set to `-1` to force disable `https`
   *
   * "@remarks"
   * If this is set, it cannot be the same as `port`, which then will be
   * forced to be `http` only.
   *
   * .
   */
  httpsPort?: number;

  /**
   * Port number for your app server to listen on so the dev proxy
   * can forward request to it.
   *
   * - **Default: `3100`**
   * - If not set, then check env `APP_PORT_FOR_PROXY`, then `APP_SERVER_PORT`
   *
   * .
   */
  appServerPort?: number; // renamed from portForProxy

  /**
   * Dev admin log level
   *
   * - if not set, then check env `XARC_ADMIN_LOG_LEVEL`
   * - TBD: list levels
   */
  adminLogLevel?: number;

  /**
   * Port number the dev admin listens to serve its pages.
   *
   * - **Default: 8991**
   * - if not set, then check env `XARC_ADMIN_PORT`
   *
   */
  adminPort?: number;

  /**
   * Additional optional features to enable
   */
  addOnFeatures?: AddOnFeatures;

  /**
   * options related to webpack
   */
  webpackOptions?: WebpackOptions;

  /**
   * options related to babel transpiler
   */
  babelOptions?: BabelOptions;

  /**
   * option for app directory if passed to loadXarcDevTasks using xrun-tasks.ts
   * e.g: loadXarcDevTasks(null, { cwd: "/actual-dir-of-app" });
   */
  cwd?: string;

  /**
   * Specify a namespace prefix for your application's JS/Style asset bundles
   * For example, instead of `main.bundle.js`, it's `{ns}.main.bundle.js`
   *
   * This is useful if you want to be able to mix subapps from different apps
   * on the same page, or if you want to implement a top level app shell that
   * loads subapps from different sources and render them on the page.
   *
   */
  namespace?: string;
};

/**
 * Internal options for configuring features base on user options
 */
export type XarcInternalOptions = XarcOptions & {
  options: any;
  webpack: any;
  babel: any;
  jest: any;
  karma: any;
  config: any;
  AppMode?: any;
  devDir?: string;
  eTmpDir?: string;
  prodModulesDir?: string;
  prodDir?: string;
  checkUserBabelRc?: () => boolean;
};
