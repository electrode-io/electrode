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

let AppMode;

function getAppMode() {
  if (!AppMode) {
    AppMode = devArchetype ? devArchetype().AppMode : makeAppMode(constants.PROD_DIR);
  }

  return AppMode;
}

function getXarcCwd() {
  const archetype = devArchetype && devArchetype();
  return (archetype && archetype.cwd) || process.env.XARC_CWD || process.cwd();
}

/**
 * Load CSS module run time hook
 *
 * @param options - options for the hook
 */
export function cssModuleHook(
  options: {
    /**
     * template for scope name to generate, default: "[hash:base64]"
     */
    generateScopedName?: string;
    /**
     * rootDir - src or lib in production
     */
    rootDir?: string;
    /**
     * any other options for css-modules-require-hook
     */
    [key: string]: any;
  } = {}
) {
  const defaultRootDirPath = process.env.NODE_ENV === "production" ? "lib" : "src";
  options.generateScopedName = options.generateScopedName || "[hash:base64]";
  options.rootDir = options.rootDir || Path.resolve(getXarcCwd(), defaultRootDirPath);

  require("css-modules-require-hook")(options);
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

export const setupIsomorphicCdnAssetsMapping = (options?: XarcCdnAssetsMappingOptions) => {
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
 * @param assetExtensions - when a require file is not found, and its extension is
 *   in this, then it will be considered an isomorphic asset and an empty `{}` will
 *   be returned for it to avoid failing with module not found errors.
 *   - **Default**: `".jpg|.jpeg|.gif|.svg|.png|.css|.less|.styl|.sass|.scss"`
 *   - set to `false` to disable this and let module not found error to throw
 *
 * @returns isomorphic require extender
 */
export function setupIsomorphicLoader(
  assetExtensions:
    | false
    | string
    | string[] = ".jpg|.jpeg|.gif|.svg|.png|.css|.less|.styl|.sass|.scss"
) {
  if (getXRequire()) {
    return getXRequire();
  }

  const appSrcDir = (getAppMode().getEnv() || getAppMode().lib.dir).split("/")[0];
  const xReq = extendRequire({
    appSrcDir,
    interceptByExts: assetExtensions
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
   * - boolean: if true, then load and setup CSS module runtime for node.js
   * - object: options to be passed to cssModuleHook
   */
  cssModuleHook?: boolean | object;
  /**
   * if no CSS module hook, then a default ignore hook is load to avoid errors
   * when trying to load CSS modules.
   *
   * Set this to false to avoid loading the ignore hook.
   */
  ignoreStyles?: boolean;
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
    const babelRegister = optionalRequire("@babel/register");
    if (!babelRegister) {
      console.log(
        "To use @babel/register mode, you need to install the @babel/register and support modules."
      );
      console.log("Please see documentation for more details.");
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

  /**
   * Any app that needs CSS module support has to set this flag when calling
   * support.  We can't default this to enabled because it would break apps
   * that doesn't use CSS modules.
   *
   * css-modules-require-hook: handle css-modules on node.js server.
   * similar to Babel's babel/register it compiles CSS modules in runtime.
   *
   * generateScopedName - Short alias for the postcss-modules-scope plugin's option.
   * Helps you to specify the custom way to build generic names for the class selectors.
   * You may also use a string pattern similar to the webpack's css-loader.
   *
   * https://github.com/css-modules/css-modules-require-hook#generatescopedname-function
   * https://github.com/webpack/css-loader#local-scope
   * https://github.com/css-modules/postcss-modules-scope
   */
  if (options.cssModuleHook === true || Object.keys(options.cssModuleHook || {}).length > 0) {
    const opts = Object.assign(
      {
        generateScopedName: `${
          process.env.NODE_ENV === "production" ? "" : "[name]__[local]___"
        }[hash:base64:5]`,
        extensions: [".scss", ".styl", ".less", ".css"],
        preprocessCss: function(css, filename) {
          if (filename.endsWith(".styl")) {
            return require("stylus")(css)
              .set("filename", filename)
              .render();
          } else if (filename.endsWith(".scss")) {
            return require("node-sass").renderSync({
              css,
              file: filename
            }).css;
          } else {
            return css;
          }
        },
        processorOpts: { parser: require("postcss-less").parse }
      },
      options.cssModuleHook || {}
    );

    cssModuleHook(opts);
  } else if (options.ignoreStyles !== false) {
    optionalRequire("ignore-styles");
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
