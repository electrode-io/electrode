/* eslint-disable */

/* Service Worker Precache WebPack Plugin */
/* From https://github.com/goldhand/sw-precache-webpack-plugin */
/* Copied locally to turn off warning */
"use strict";

var _extends = Object.assign;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _url = require("url");

var _url2 = _interopRequireDefault(_url);

var _swPrecache = require("sw-precache");

var _swPrecache2 = _interopRequireDefault(_swPrecache);

var _uglifyEs = require('uglify-es');

var _uglifyEs2 = _interopRequireDefault(_uglifyEs);

var _util = require("util");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const FILEPATH_WARNING =
  "sw-prechache-webpack-plugin [filepath]: You are using a custom path for your service worker, this may prevent the service worker from working correctly if it is not available in the same path as your application.";
const FORCEDELETE_WARNING =
  "sw-prechache-webpack-plugin [forceDelete]: You are specifying the option forceDelete. This was removed in v0.10. It should not affect your build but should no longer be required.";

const DEFAULT_CACHE_ID = "sw-precache-webpack-plugin",
  DEFAULT_WORKER_FILENAME = "service-worker.js",
  DEFAULT_PUBLIC_PATH = "",
  DEFAULT_IMPORT_SCRIPTS = [],
  DEFAULT_IGNORE_PATTERNS = [],
  CHUNK_NAME_NOT_FOUND_ERROR = 'Could not locate files for chunkName: "%s"',
  // eslint-disable-next-line max-len
  CHUNK_NAME_OVERRIDES_FILENAME_WARNING =
    "Don't use chunkName & filename together; importScripts[<index>].filename overriden by specified chunkName: %j";

const DEFAULT_OPTIONS = {
  cacheId: DEFAULT_CACHE_ID,
  filename: DEFAULT_WORKER_FILENAME,
  importScripts: DEFAULT_IMPORT_SCRIPTS,
  staticFileGlobsIgnorePatterns: DEFAULT_IGNORE_PATTERNS,
  mergeStaticsConfig: false,
  minify: false
};

class SWPrecacheWebpackPlugin {
  /**
   * SWPrecacheWebpackPlugin - A wrapper for sw-precache to use with webpack
   * @constructor
   * @param {object} options - All parameters should be passed as a single options object. All sw-precache options can be passed here in addition to plugin options.
   *
   * // plugin options:
   * @param {string} [options.filename] - Service worker filename, default is 'service-worker.js'
   * @param {string} [options.filepath] - Service worker path and name, default is to use webpack.output.path + options.filename
   * @param {RegExp} [options.staticFileGlobsIgnorePatterns[]] - Define an optional array of regex patterns to filter out of staticFileGlobs
   * @param {boolean} [options.mergeStaticsConfig=false] - Merge provided staticFileGlobs and stripPrefix(Multi) with webpack's config, rather than having those take precedence
   * @param {boolean} [options.minify=false] - Minify the generated Service worker file using UglifyJS
   * @param {boolean} [options.debug=false] - Output error and warning messages
   */
  constructor(options) {
    // generated configuration options
    this.config = {};
    // configuration options passed by user
    this.options = _extends({}, DEFAULT_OPTIONS, options);
    // generated configuration that will override user options
    this.overrides = {};
    // push warning messages here
    this.warnings = [];
  }

  /**
   * @returns {object} - plugin configuration
   */
  get workerOptions() {
    return _extends({}, this.config, this.options, this.overrides);
  }

  apply(compiler) {
    // sw-precache needs physical files to reference so we MUST wait until after assets are emitted before generating the service-worker.
    compiler.plugin("after-emit", (compilation, callback) => {
      this.configure(compiler, compilation); // configure the serviceworker options
      this.checkWarnings(compilation);

      // generate service worker then write to file system
      this.createServiceWorker()
        .then(serviceWorker => this.writeServiceWorker(serviceWorker, compiler))
        .then(() => callback())
        .catch(err => callback(err));
    });
  }

  configure(compiler, compilation) {
    // get the defaults from options
    var _options = this.options;
    const importScripts = _options.importScripts,
      staticFileGlobsIgnorePatterns = _options.staticFileGlobsIgnorePatterns,
      mergeStaticsConfig = _options.mergeStaticsConfig;
    var _options$stripPrefixM = _options.stripPrefixMulti;
    const stripPrefixMulti = _options$stripPrefixM === undefined ? {} : _options$stripPrefixM;

    // get the output path used by webpack

    const outputPath = compiler.outputPath;

    // outputPath + filename or the user option

    var _options$filepath = this.options.filepath;
    const filepath =
      _options$filepath === undefined
        ? _path2.default.resolve(outputPath, this.options.filename)
        : _options$filepath;

    // get the public path specified in webpack config

    var _compiler$options$out = compiler.options.output.publicPath;
    const publicPath =
      _compiler$options$out === undefined ? DEFAULT_PUBLIC_PATH : _compiler$options$out;

    // get all assets outputted by webpack

    const assetGlobs = Object.keys(compilation.assets).map(f => _path2.default.join(outputPath, f));

    // merge assetGlobs with provided staticFileGlobs and filter using staticFileGlobsIgnorePatterns
    const staticFileGlobs = assetGlobs
      .concat(this.options.staticFileGlobs || [])
      .filter(text => !staticFileGlobsIgnorePatterns.some(regex => regex.test(text)));

    if (outputPath) {
      // strip the webpack config's output.path (replace for windows users)
      stripPrefixMulti[`${outputPath}${_path2.default.sep}`.replace(/\\/g, "/")] = publicPath;
    }

    this.config = _extends({}, this.config, {
      staticFileGlobs: staticFileGlobs,
      stripPrefixMulti: stripPrefixMulti
    });

    // set the actual filepath
    this.overrides.filepath = filepath;

    // resolve [hash] used in importScripts
    this.configureImportScripts(importScripts, publicPath, compiler, compilation);

    if (mergeStaticsConfig) {
      // merge generated and user provided options
      this.overrides = _extends({}, this.overrides, {
        staticFileGlobs: staticFileGlobs,
        stripPrefixMulti: stripPrefixMulti
      });
    }
  }

  configureImportScripts(importScripts, publicPath, compiler, compilation) {
    if (!importScripts) {
      return;
    }

    var _compilation$getStats = compilation.getStats().toJson({ hash: true, chunks: true });

    const hash = _compilation$getStats.hash,
      chunks = _compilation$getStats.chunks;

    this.overrides.importScripts = importScripts.reduce((fileList, criteria) => {
      // legacy support for importScripts items defined as string
      if (typeof criteria === "string") {
        criteria = { filename: criteria };
      }

      const hasFileName = !!criteria.filename;
      const hasChunkName = !!criteria.chunkName;

      if (hasFileName && hasChunkName) {
        this.warnings.push(
          new Error((0, _util.format)(CHUNK_NAME_OVERRIDES_FILENAME_WARNING, criteria))
        );
      }

      if (hasChunkName) {
        const chunk = chunks.find(c => c.names.includes(criteria.chunkName));

        if (!chunk) {
          compilation.errors.push(
            new Error((0, _util.format)(CHUNK_NAME_NOT_FOUND_ERROR, criteria.chunkName))
          );
          return fileList;
        }

        const chunkFileName = chunk.files[chunk.names.indexOf(criteria.chunkName)];
        fileList.push(_url2.default.resolve(publicPath, chunkFileName));
      } else if (hasFileName) {
        const hashedFilename = criteria.filename.replace(/\[hash\]/g, hash);
        fileList.push(_url2.default.resolve(publicPath, hashedFilename));
      }

      return fileList;
    }, []);
  }

  createServiceWorker() {
    return _swPrecache2.default.generate(this.workerOptions).then(serviceWorkerFileContents => {
      if (this.options.minify) {
        const uglifyFiles = {};
        uglifyFiles[this.options.filename] = serviceWorkerFileContents;
        return _uglifyJs2.default.minify(uglifyFiles).code;
      }
      return serviceWorkerFileContents;
    });
  }

  writeServiceWorker(serviceWorker, compiler) {
    const filepath = this.workerOptions.filepath;
    var _compiler$outputFileS = compiler.outputFileSystem;
    const mkdirp = _compiler$outputFileS.mkdirp,
      writeFile = _compiler$outputFileS.writeFile;

    // use the outputFileSystem api to manually write service workers rather than adding to the compilation assets

    return new Promise(resolve => {
      mkdirp(_path2.default.resolve(filepath, ".."), () => {
        writeFile(filepath, serviceWorker, resolve);
      });
    });
  }

  /**
   * Push plugin warnings to webpack log
   * @param {object} compilation - webpack compilation
   * @returns {void}
   */
  checkWarnings(compilation) {
    if (!this.options.noWarnings) {
      if (this.options.filepath) {
        // warn about changing filepath
        this.warnings.push(new Error(FILEPATH_WARNING));
      }

      if (this.options.forceDelete) {
        // deprecate forceDelete
        this.warnings.push(new Error(FORCEDELETE_WARNING));
      }
    }

    if (this.workerOptions.debug) {
      this.warnings.forEach(warning => compilation.warnings.push(warning));
    }
  }
}

module.exports = SWPrecacheWebpackPlugin;
