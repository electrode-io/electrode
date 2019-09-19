"use strict";

const archetype = require("electrode-archetype-react-app/config/archetype");
const Path = require("path");
const requireAt = require("require-at");
const AppMode = archetype.AppMode;

const assign = require("lodash/assign");
const fileLoader = require.resolve("file-loader");
const optionalRequire = require("optional-require")(require);

const swConfigPath = Path.resolve("config", "sw-config.js");
const mkdirp = require("mkdirp");
const logger = require("electrode-archetype-react-app/lib/logger");

/**
 * Takes a file path and returns a webpack-compatible
 * filename descriptor with a hash matching the current naming schema
 * @param  {string} filepath  original file path
 * @return {string}           parsed file path
 */
function getHashedPath(filepath) {
  const parsed = Path.parse(filepath);
  const name = parsed.name;
  const ext = parsed.ext;
  return `${name}.[hash]${ext}`;
}

/**
 * Takes a file path and returns a webpack-dev compatible
 * filename descriptor matching the current naming schema
 * @param  {string} filepath  original file path
 * @return {string}           parsed file path
 */
function getDevelopmentPath(filepath) {
  const parsed = Path.parse(filepath);
  const name = parsed.name;
  const ext = parsed.ext;
  return `${name}.bundle.dev${ext}`;
}

/**
 * Takes an array of strings representing scripts that
 * a service worker will import and returns an object
 * representing the webpack entry config. Each script
 * will get its own entry point so they can be independantly
 * imported by the service worker.
 * @param  {array<string>} importScripts import scripts
 * @param  {object}        entry current entry config
 * @return {object}        new entry config
 */
function createEntryConfigFromScripts(importScripts, entry) {
  // Handle the case where there might already be multiple
  // entry points. If it is we create a new object with all
  // existing entry points to avoid mutating the config. If its not,
  // we assume its a string and use it as the main entry point.
  const newEntry = typeof entry === "object" ? Object.assign({}, entry) : { main: entry };
  return importScripts.reduce((acc, script) => {
    const name = Path.parse(script).name;
    acc[name] = script;
    return acc;
  }, newEntry);
}

module.exports = function(options) {
  /* eslint max-statements: 0 */
  const swConfig = (archetype.options.pwa && optionalRequire(swConfigPath, true)) || {};

  if (!swConfig.manifest) {
    return {};
  }

  //
  // load modules from within electrode-archetype-opt-pwa
  //
  const pwaRequire = requireAt(require.resolve("electrode-archetype-opt-pwa"));
  const webAppManifestLoader = pwaRequire.resolve("web-app-manifest-loader");
  const SWPrecacheWebpackPlugin = pwaRequire("./plugins/sw-precache");
  const FaviconsWebpackPlugin = pwaRequire("favicons-webpack-plugin");
  const AddManifestFieldsPlugin = pwaRequire("./plugins/add-manifest-fields");
  //

  logger.info(`PWA enabled with config from ${swConfigPath}`);

  mkdirp.sync(Path.resolve("dist"));

  const manifestConfig = assign(
    {
      background: "#FFFFFF",
      logo: "images/electrode.png",
      title: "Electrode",
      short_name: "Electrode",
      statsFilename: "../server/iconstats.json"
    },
    swConfig.manifest
  );

  const cacheConfig = assign(
    {
      staticFileGlobs: ["dist/js/*.{js,css}"],
      stripPrefix: "dist/js/",
      cacheId: "electrode",
      filepath: "dist/sw.js",
      maximumFileSizeToCacheInBytes: 4194304,
      skipWaiting: false,
      noWarning: true
    },
    swConfig.cache
  );

  if (cacheConfig.runtimeCaching) {
    cacheConfig.runtimeCaching = cacheConfig.runtimeCaching.map(runtimeCache => {
      return {
        handler: runtimeCache.handler,
        urlPattern: new RegExp(runtimeCache.urlPattern)
      };
    });
  }

  /**
   * If importScripts exists in the cache config we need to overwrite
   * the entry config and output config so we get an entry point for each
   * script with unique names.
   */
  let entry = options.currentConfig.entry;
  let output = {};
  if (cacheConfig.importScripts) {
    const importScripts = cacheConfig.importScripts;

    cacheConfig.importScripts =
      process.env.WEBPACK_DEV === "true"
        ? importScripts.map(getDevelopmentPath)
        : importScripts.map(getHashedPath);

    entry = createEntryConfigFromScripts(importScripts, options.currentConfig.entry);

    output = {
      filename: "[name].[hash].js"
    };
  }

  const logoPath = Path.resolve(AppMode.src.client, manifestConfig.logo);
  const plugins = [
    new FaviconsWebpackPlugin({
      logo: logoPath,
      emitStats: true,
      inject: false,
      background: manifestConfig.background,
      title: manifestConfig.title,
      statsFilename: manifestConfig.statsFilename,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true
      }
    }),
    new AddManifestFieldsPlugin({
      gcm_sender_id: manifestConfig.gcm_sender_id,
      short_name: manifestConfig.short_name,
      theme_color: manifestConfig.theme_color
    }),
    new SWPrecacheWebpackPlugin(cacheConfig)
  ];

  return {
    entry,
    output,
    module: {
      rules: [
        {
          _name: "manifest",
          test: /manifest.json$/,
          use: [
            {
              loader: fileLoader,
              options: {
                name: "manifest.json"
              }
            },
            webAppManifestLoader
          ]
        }
      ]
    },
    plugins
  };
};
