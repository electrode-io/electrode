/* eslint-disable */

/* Service Worker Precache WebPack Plugin */
/* From https://github.com/goldhand/sw-precache-webpack-plugin */
/* Copied locally to turn off warning */

'use strict';

var _extends = Object.assign;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _del = require('del');

var _del2 = _interopRequireDefault(_del);

var _swPrecache = require('sw-precache');

var _swPrecache2 = _interopRequireDefault(_swPrecache);

var _uglifyJs = require('uglify-js');

var _uglifyJs2 = _interopRequireDefault(_uglifyJs);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const FILEPATH_WARNING = 'sw-prechache-webpack-plugin filepath: You are using a custom path for your service worker, this may prevent the service worker from working correctly if it is not available in the same path as your application.';

const DEFAULT_CACHE_ID = 'sw-precache-webpack-plugin',
  DEFAULT_WORKER_FILENAME = 'service-worker.js',
  DEFAULT_OUTPUT_PATH = '',
  DEFAULT_PUBLIC_PATH = '',
  DEFAULT_IMPORT_SCRIPTS = [],
  DEFAULT_IGNORE_PATTERNS = [];

const DEFAULT_OPTIONS = {
  cacheId: DEFAULT_CACHE_ID,
  filename: DEFAULT_WORKER_FILENAME,
  importScripts: DEFAULT_IMPORT_SCRIPTS,
  staticFileGlobsIgnorePatterns: DEFAULT_IGNORE_PATTERNS,
  forceDelete: false,
  mergeStaticsConfig: false,
  minify: false
};

class SWPrecacheWebpackPlugin {

  /**
   * SWPrecacheWebpackPlugin - A wrapper for sw-precache to use with webpack
   * @constructor
   * @param {object} options - All parameters should be passed as a single options object
   *
   * // sw-precache options:
   * @param {string} [options.cacheId]
   * @param {string} [options.directoryIndex]
   * @param {object|array} [options.dynamicUrlToDependencies]
   * @param {boolean} [options.handleFetch]
   * @param {array} [options.ignoreUrlParametersMatching]
   * @param {array} [options.importScripts]
   * @param {function} [options.logger]
   * @param {number} [options.maximumFileSizeToCacheInBytes]
   * @param {array} [options.navigateFallbackWhitelist]
   * @param {string} [options.replacePrefix]
   * @param {array} [options.runtimeCaching]
   * @param {array} [options.staticFileGlobs]
   * @param {string} [options.stripPrefix]
   * @param {string} [options.stripPrefixMulti]
   * @param {string} [options.templateFilePath]
   * @param {boolean} [options.verbose]
   *
   * // plugin options:
   * @param {string} [options.filename] - Service worker filename, default is 'service-worker.js'
   * @param {string} [options.filepath] - Service worker path and name, default is to use webpack.output.path + options.filename
   * @param {RegExp} [options.staticFileGlobsIgnorePatterns[]] - Define an optional array of regex patterns to filter out of staticFileGlobs
   * @param {boolean} [options.forceDelete=false] - Pass force option to del
   * @param {boolean} [options.mergeStaticsConfig=false] - Merge provided staticFileGlobs and stripPrefix(Multi) with webpack's config, rather than having those take precedence
   * @param {boolean} [options.minify=false] - Minify the generated Service worker file using UglifyJS
   */
  constructor(options) {
    // generated configuration options
    this.config = {};
    // configuration options passed by user
    this.options = _extends({}, DEFAULT_OPTIONS, options);
    // generated configuration that will override user options
    this.overrides = {};
  }

  /**
   * @returns {object} - plugin configuration
   */
  get workerOptions() {
    return _extends({}, this.config, this.options, this.overrides);
  }

  apply(compiler) {

    compiler.plugin('after-emit', (compilation, callback) => {

      // get the defaults from options
      var _options = this.options;
      const importScripts = _options.importScripts,
        staticFileGlobsIgnorePatterns = _options.staticFileGlobsIgnorePatterns,
        mergeStaticsConfig = _options.mergeStaticsConfig;

      // get the output path specified in webpack config

      const outputPath = compiler.options.output.path || DEFAULT_OUTPUT_PATH;

      // get the public path specified in webpack config
      var _compiler$options$out = compiler.options.output.publicPath;
      const publicPath = _compiler$options$out === undefined ? DEFAULT_PUBLIC_PATH : _compiler$options$out;


      if (this.options.filepath && !this.options.noWarning) {
        // warn about changing filepath
        compilation.warnings.push(new Error(FILEPATH_WARNING));
      }

      // get all assets outputted by webpack
      const assetGlobs = Object.keys(compilation.assets).map(f => _path2.default.join(outputPath, f));

      // merge assetGlobs with provided staticFileGlobs and filter using staticFileGlobsIgnorePatterns
      const staticFileGlobs = assetGlobs.concat(this.options.staticFileGlobs || []).filter(text => !staticFileGlobsIgnorePatterns.some(regex => regex.test(text)));

      const stripPrefixMulti = _extends({}, this.options.stripPrefixMulti);

      if (outputPath) {
        // strip the webpack config's output.path
        stripPrefixMulti[`${outputPath}${_path2.default.sep}`] = publicPath;
      }

      this.config = _extends({}, this.config, {
        staticFileGlobs: staticFileGlobs,
        stripPrefixMulti: stripPrefixMulti
      });

      if (importScripts) {
        this.overrides.importScripts = importScripts.map(f => f.replace(/\[hash\]/g, compilation.hash)) // need to override importScripts with stats.hash
          .map(f => _url2.default.resolve(publicPath, f)); // add publicPath to importScripts
      }

      if (mergeStaticsConfig) {
        // merge generated and user provided options
        this.overrides = _extends({}, this.overrides, {
          staticFileGlobs: staticFileGlobs,
          stripPrefixMulti: stripPrefixMulti
        });
      }

      const done = () => callback();
      const error = err => callback(err);

      this.writeServiceWorker(compiler).then(done, error);
    });
  }

  writeServiceWorker(compiler) {
    const fileDir = compiler.options.output.path || DEFAULT_OUTPUT_PATH;
    var _options$filepath = this.options.filepath;
    const filepath = _options$filepath === undefined ? _path2.default.join(fileDir, this.options.filename) : _options$filepath;


    return (0, _del2.default)(filepath, { force: this.options.forceDelete }).then(() => _swPrecache2.default.generate(this.workerOptions)).then(serviceWorkerFileContents => {
      if (this.options.minify) {
        const uglifyFiles = {};
        uglifyFiles[this.options.filename] = serviceWorkerFileContents;
        const minifedCodeObj = _uglifyJs2.default.minify(uglifyFiles, { fromString: true });
        return minifedCodeObj.code;
      }
      return serviceWorkerFileContents;
    }).then(possiblyMinifiedServiceWorkerFileContents => _fs2.default.writeFileSync(filepath, possiblyMinifiedServiceWorkerFileContents));
  }
}

module.exports = SWPrecacheWebpackPlugin;
