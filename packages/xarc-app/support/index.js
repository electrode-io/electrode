"use strict";

const optionalRequire = require("optional-require")(require);
const isomorphicExtendRequire = require("isomorphic-loader/lib/extend-require");
const archetype = require("../config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");
const logger = require("../lib/logger");

const support = {
  cssModuleHook: options => {
    const defaultRootDirPath = process.env.NODE_ENV === "production" ? "lib" : "src";
    options = options || {};
    options.generateScopedName = options.generateScopedName || "[hash:base64]";
    options.rootDir = options.rootDir || Path.resolve(process.cwd(), defaultRootDirPath);

    require("css-modules-require-hook")(options);
  },
  require: require("../require"),
  isomorphicExtendRequire: () => {
    return isomorphicExtendRequire({
      processAssets: assets => {
        const appSrcDir = (AppMode.getEnv() || AppMode.lib.dir).split("/")[0];
        if (appSrcDir !== AppMode.src.dir && assets.marked) {
          const marked = assets.marked;
          Object.keys(marked).forEach(k => {
            if (k.startsWith(AppMode.src.client) || k.startsWith(AppMode.src.server)) {
              const nk = k.replace(AppMode.src.dir, appSrcDir);
              marked[nk] = marked[k];
            }
          });
        }

        return assets;
      }
    }).catch(err => {
      isomorphicExtendRequire._instance.interceptLoad();
    });
  },
};

if (!AppMode.hasEnv()) {
  const guessAppSrcDir = () => {
    if (module.parent && module.parent.filename) {
      const fn = module.parent.filename;
      const dir = fn.substr(process.cwd().length + 1).split("/")[0];
      if (dir === AppMode.src.dir || dir === AppMode.lib.dir) {
        return `${dir}/`;
      }
    }
    return "lib/";
  };
  AppMode.setEnv(guessAppSrcDir());
}
logger.info(`${AppMode.envKey} set to`, AppMode.getEnv());

/* eslint max-statements: 0 complexity: 0 */
support.load = function(options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

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
  if (options.cssModuleHook === true) {
    const opts = Object.assign(
      {
        generateScopedName: "[name]__[local]___[hash:base64:5]",
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

    support.cssModuleHook(opts);
  } else if (options.ignoreStyles !== false) {
    optionalRequire("ignore-styles");
  }

  if (options.isomorphicExtendRequire !== false) {
    return support.isomorphicExtendRequire();
  }

  return callback ? callback() : Promise.resolve();
};

module.exports = support;
