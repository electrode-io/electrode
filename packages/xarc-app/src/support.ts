/* eslint-disable @typescript-eslint/no-var-requires, global-require, no-param-reassign */
/* eslint-disable no-process-exit, no-console, max-statements */
/* eslint max-statements: 0 complexity: 0 */

import Fs from "fs";
import Path from "path";

import makeOptionalRequire from "optional-require";

import { extendRequire, setXRequire, getXRequire } from "isomorphic-loader";

import { makeAppMode } from "./app-mode";
import { PROD_DIR } from "./constants";
import { logger } from "./logger";

const optionalRequire = makeOptionalRequire(require);

const devRequire = optionalRequire("@xarc/app-dev/require");
const optionalDevRequire = makeOptionalRequire(devRequire);

const { getDevOptions } = optionalRequire("@xarc/app-dev/config/archetype", { default: {} });

let AppMode;

/**
 * get dev options
 * @returns nothing
 */
function getXarcDevOptions() {
  return getDevOptions ? getDevOptions() : {};
}

/**
 * get app mode data
 * @returns nothing
 */
function getAppMode() {
  if (!AppMode) {
    AppMode = getXarcDevOptions().AppMode || makeAppMode(PROD_DIR);
  }

  return AppMode;
}

/**
 * get app's CWD
 *
 * @returns nothing
 */
function getAppCwd() {
  return getXarcDevOptions().cwd || process.env.XARC_CWD || process.cwd();
}

/**
 * Options for setting up CDN assets mapping
 */
export type XarcCdnAssetsMappingOptions = {
  /**
   * isomorphic-loader extend require instance
   *
   * - if not provided, then the default instance is used
   */
  extendRequire?: any;
  /**
   * assets mapping data
   *
   * - if not provided, then will try to load it from one of these files:
   * 1. dist/cdn-mappings.json
   * 2. config/assets.json
   *
   */
  mapping?: Record<string, unknown>;
  /**
   * Only setup in production mode (NODE_ENV === "production")
   */
  prodOnly?: boolean;
};

/**
 * Setup assets mapping to CDN URLs
 *
 * @param options - asset mapping options
 * @returns nothing
 */
export const setupIsomorphicCdnAssetsMapping = (options?: XarcCdnAssetsMappingOptions) => {
  // only setup CDN mapping for production mode
  if (!options || (options.prodOnly && process.env.NODE_ENV !== "production")) {
    return;
  }

  const extRequire = options.extendRequire || getXRequire();
  if (!extRequire) return;

  let mapping = options.mapping;
  if (!mapping) {
    for (const fn of ["dist/cdn-mappings.json", "config/assets.json"]) {
      try {
        mapping = JSON.parse(Fs.readFileSync(fn, "utf-8"));
        break;
      } catch {
        //
      }
    }
  }

  if (!mapping) {
    return;
  }

  const cdnKeys = Object.keys(mapping).map(k => Path.basename(k));

  extRequire.setUrlMapper(url => {
    const urlBaseName = Path.basename(url);
    return (cdnKeys.includes(urlBaseName) && mapping[urlBaseName]) || url;
  });
};

/**
 * Load the require hook to support isomorphic assets when doing SSR
 *
 * @param ignoreExtensions - when a require file is not found, and its extension is
 *   in this, then it will be considered an isomorphic asset and an empty `{}` will
 *   be returned for it to avoid failing with module not found errors.
 *   - **Default**
 *     `".css|.scss|.sass|.pcss|.stylus|.styl|.less|.sss|.gif|.jpeg|.jpg|.png|.svg|.mp4|.webm|.ogv|.aac|.mp3|.wav|.ogg"`
 *   - set to `false` to disable this and let module not found error to throw
 *
 * @returns isomorphic require extender
 */
export function setupIsomorphicLoader(
  ignoreExtensions:
    | false
    | string
    | string[] = ".css|.scss|.sass|.pcss|.stylus|.styl|.less|.sss|.gif|.jpeg|.jpg|.png|.svg|.mp4|.webm|.ogv|.aac|.mp3|.wav|.ogg"
) {
  if (getXRequire()) {
    return getXRequire();
  }

  const appSrcDir = (getAppMode().getEnv() || getAppMode().lib.dir).split("/")[0];
  const xReq = extendRequire({ appSrcDir, ignoreExtensions });

  setXRequire(xReq);

  return xReq;
}

/**
 * Setup APP_SRC_DIR when running node.js server
 *
 * - `src/` in development mode
 * - `lib/` in production mode
 *
 * @returns nothing
 */
export function setupAppSrcDir() {
  if (!getAppMode().hasEnv()) {
    const guessAppSrcDir = () => {
      if (module.parent && module.parent.filename) {
        const fn = module.parent.filename;
        const cwd = getAppCwd();
        const dir = fn.substr(cwd.length + 1).split("/")[0];
        if (dir === getAppMode().src.dir || dir === getAppMode().lib.dir) {
          return `${dir}/`;
        }
      }
      return "lib/";
    };

    getAppMode().setEnv(guessAppSrcDir());
  }

  logger.info(`${getAppMode().envKey} set to`, getAppMode().getEnv());
}

/**
 * Available options for setting up run time support
 */
type XarcSupportOptions = {
  /**
   * - boolean: true to load @babel/register
   * - Object: options to be passed to @babel/register
   */
  babelRegister?: any;
  /**
   * Set to false to avoid loading node.js require hook to handle isomorphic assets.
   */
  isomorphicExtendRequire?: boolean;
  /**
   * Setup CDN mapping for isomorphic assets
   *
   * @remarks - if this is disabled, then any `import "style.css"` or `import "image.png"`
   *   will result in syntax error or module not found error in node.js.
   */
  isomorphicCdnOptions?: XarcCdnAssetsMappingOptions;
  /**
   * If true, then ensure everything is ready before resolving the returned promise.
   *
   * @remarks
   * In dev mode, resolving the promise depends on the app server starting and loading
   * the dev plugin.  What this means is basically:
   *
   * ```js
   * const loadSupport = support.load({awaitReady: true});
   * await startServer();
   * await loadSupport;
   *
   * // do any other initialization that could trigger importing isomorphic assets
   *
   * ```
   */
  awaitReady?: boolean;
};

/**
 * start node.js run time support for app server
 *
 * @param options - options on what runtime support to start
 * @returns Promise
 */
export function loadRuntimeSupport(
  /**
   * support load options or a callback for when support load is done
   */
  options: XarcSupportOptions = {}
): Promise<any> {
  if (!process.env.APP_SRC_DIR) {
    setupAppSrcDir();
  }

  if (options.babelRegister) {
    const babelRegister = optionalDevRequire("@babel/register");
    if (!babelRegister) {
      console.error(
        "To use @babel/register mode, you need to install @xarc/app-dev in devDependencies."
      );
      return process.exit(1);
    }
    const regOptions = Object.assign(
      {
        extensions: [".es6", ".es", ".jsx", ".js"]
      },
      options.babelRegister || {}
    );

    logger.info(
      `Loading @babel/register for runtime transpilation files (extensions: ${regOptions.extensions}).`
    );
    logger.info(`The transpilation only occurs the first time you load a file.`);
    babelRegister(regOptions);
  }

  let promise;

  if (options.isomorphicExtendRequire !== false) {
    const xReq = setupIsomorphicLoader();
    const start = Date.now();
    if (options.awaitReady && !xReq.activated) {
      promise = new Promise((resolve, reject) => {
        let timer;
        const waitTo = () => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            const time = Math.round((Date.now() - start) / 1000);
            if (process.env.NODE_ENV === "production") {
              reject(new Error(`production mode: isomorphic assets not ready in ${time} seconds`));
            } else {
              console.error(
                `dev mode: waiting for isomorphic assets to be ready - time: ${time}secs`
              );
              waitTo();
            }
          }, 5000);
        };

        waitTo();
        xReq.once("activate", () => {
          clearTimeout(timer);
          resolve(null);
        });
      }).then(() => setupIsomorphicCdnAssetsMapping(options.isomorphicCdnOptions));
    } else {
      setupIsomorphicCdnAssetsMapping(options.isomorphicCdnOptions);
    }
  }

  return promise || Promise.resolve();
}
