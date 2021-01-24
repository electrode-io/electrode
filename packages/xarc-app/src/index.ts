/* eslint-disable @typescript-eslint/no-var-requires, global-require, no-param-reassign */
/* eslint-disable no-process-exit, no-console, max-statements */
/* eslint max-statements: 0 complexity: 0 */

import * as Fs from "fs";

const optionalRequire = require("optional-require")(require);
const { extendRequire, setXRequire, getXRequire } = require("isomorphic-loader");
const makeAppMode = require("../lib/app-mode");
const Path = require("path");
const constants = require("../lib/constants");
const logger = require("../lib/logger");
const devArchetype = optionalRequire("@xarc/app-dev/config/archetype");
const devRequire = optionalRequire("@xarc/app-dev/require");
const optionalDevRequire = require("optional-require")(devRequire);

let AppMode;

function getXarcDev() {
  return devArchetype ? devArchetype() : {};
}

function getAppMode() {
  if (!AppMode) {
    AppMode = getXarcDev().AppMode || makeAppMode(constants.PROD_DIR);
  }

  return AppMode;
}

function getXarcCwd() {
  return getXarcDev().cwd || process.env.XARC_CWD || process.cwd();
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
  mapping?: object;
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
 *   - **Default**:
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
  const xReq = extendRequire({
    appSrcDir,
    ignoreExtensions
  });

  setXRequire(xReq);

  return xReq;
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
 * Load run time supports
 *
 * @param options - options on what to load
 * @param callback - callback after loaded (returns Promise if no callback)
 * @returns Promise
 */
export function load(
  /**
   * support load options or a callback for when support load is done
   */
  options: XarcSupportOptions = {}
): Promise<any> {
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

if (!getAppMode().hasEnv()) {
  const guessAppSrcDir = () => {
    if (module.parent && module.parent.filename) {
      const fn = module.parent.filename;
      const cwd = getXarcCwd();
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
