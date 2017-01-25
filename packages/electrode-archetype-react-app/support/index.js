"use strict";

const optimizeModulesForProduction = require("./optimize-modules-for-production");
const babelRegister = require("babel-register");
const isomorphicExtendRequire = require("isomorphic-loader/lib/extend-require");
const babelPolyfill = require("babel-polyfill");
const archetype = require("../config/archetype");
const AppMode = archetype.AppMode;
const Path = require("path");

const support = {
  cssModuleHook: function (options) {
    options = options || {};
    options.generateScopedName = options.generateScopedName || "[hash:base64]";
    options.rootDir = options.rootDir || Path.resolve(process.cwd(), "client");

    require("css-modules-require-hook")(options);
  },
  require: require("../require"),
  babelRegister,
  isomorphicExtendRequire: () => {
    return isomorphicExtendRequire({
      processAssets: (assets) => {
        let appSrcDir = (AppMode.getEnv() || AppMode.lib.dir).split("/")[0];
        if (appSrcDir !== AppMode.src.dir && assets.marked) {
          const marked = assets.marked;
          Object.keys(marked).forEach((k) => {
            if (k.startsWith(AppMode.src.client) || k.startsWith(AppMode.src.server)) {
              const nk = k.replace(AppMode.src.dir, appSrcDir);
              marked[nk] = marked[k];
            }
          });
        }

        return assets;
      }
    });
  },
  babelPolyfill,
  optimizeModulesForProduction
};

if (AppMode.isSrc) {
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
  console.log(`Just FYI: ${AppMode.envKey} set to`, AppMode.getEnv());
}

support.load = function (options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  } else {
    options = options || {};
  }

  let br = options.babelRegister;
  if (br !== false) {
    if (!br) {
      br = !AppMode.isSrc; // we need babel-register if not in src/lib mode
    } else {
      br = true; // normalize flag to boolean
    }
  }

  if (br) {
    const regOptions = Object.assign({
      extensions: [".es6", ".es", ".jsx", ".js"]
    }, options.babelRegister || {});

    console.log(`Just FYI: installing babel-register for runtime transpilation files (extensions: ${regOptions.extensions}).`);
    console.log(`Just FYI: the transpilation only occurs the first time you load a file.`);
    support.babelRegister(regOptions);
  }

  if (options.optimizeModulesForProduction !== false) {
    const opts = options.optimizeModulesForProduction;

    support.optimizeModulesForProduction(typeof opts === "object" && opts);
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
  if (options.cssModuleHook !== false) {
    const opts = Object.assign({
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    }, options.cssModuleHook || {});

    support.cssModuleHook(opts);
  }

  if (options.isomorphicExtendRequire !== false) {
    return support.isomorphicExtendRequire();
  }

  if (callback) {
    callback();
  } else {
    return Promise.resolve();
  }
};

module.exports = support;
