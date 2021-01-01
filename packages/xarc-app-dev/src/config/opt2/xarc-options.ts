import { AddOnFeatures } from "./add-on-features";
import { WebpackOptions } from "./webpack-options";
import { BabelOptions } from "./babel-options";

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
   * @remarks
   *  This is what the dev proxy listens on.  Your app server
   *  listens on a different port that the proxy forwards to.
   *
   * - **Default: `3000`**
   * - If it's 443, then automatically enable HTTPS.
   * - If not set, then check env `PORT`
   */
  port?: number;

  /**
   * In case you want to serve your app with https on a port other
   * than 443, then you can set it with this.
   *
   * - if not set, then check env then `XARC_DEV_HTTPS`
   *
   * @remarks
   * If this is set, it cannot be the same as `port`, which then will be
   * forced to be HTTP only.
   */
  httpsPort?: number;
  /**
   * Port number for your app server to listen on so the dev proxy
   * can forward request to it.
   *
   * - **Default: `3100`**
   * - If not set, then check env `APP_PORT_FOR_PROXY`, then `APP_SERVER_PORT`
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
   * option for app directory if passed to loadXarcDevTasks using xclap.ts
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
