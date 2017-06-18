/**
 * @file this file is responsible for the persitance disk caching
 * it offers helpers to prevent recompilation of the favicons on
 * every build
 */
/* eslint-disable */
"use strict";
var fs = require("fs");
var path = require("path");
var crypto = require("crypto");
var pluginVersion = "private-0.0.8"; // require('../package.json').version;

/**
 * Stores the given iconResult together with the control hashes as JSON file
 */
function emitCacheInformationFile(loader, query, cacheFile, fileHash, iconResult) {
  if (!query.persistentCache) {
    return;
  }
  loader.emitFile(
    cacheFile,
    JSON.stringify({
      hash: fileHash,
      version: pluginVersion,
      optionHash: generateHashForOptions(query),
      result: iconResult
    })
  );
}

/**
 * Checks if the given cache object is still valid
 */
function isCacheValid(cache, fileHash, query) {
  // Verify that the source file is the same
  return (
    cache.hash === fileHash &&
    // Verify that the options are the same
    cache.optionHash === generateHashForOptions(query) &&
    // Verify that the favicons version of the cache maches this version
    cache.version === pluginVersion
  );
}

/**
 * Try to load the file from the disc cache
 */
function loadIconsFromDiskCache(loader, query, cacheFile, fileHash, callback) {
  // Stop if cache is disabled
  if (!query.persistentCache) return callback(null);
  var resolvedCacheFile = path.resolve(
    loader._compiler.parentCompilation.compiler.outputPath,
    cacheFile
  );

  fs.exists(resolvedCacheFile, function(exists) {
    if (!exists) return callback(null);
    fs.readFile(resolvedCacheFile, function(err, content) {
      if (err) return callback(err);
      var cache;
      try {
        cache = JSON.parse(content);
        // Bail out if the file or the option changed
        if (!isCacheValid(cache, fileHash, query)) {
          return callback(null);
        }
      } catch (e) {
        return callback(e);
      }
      callback(null, cache.result);
    });
  });
}

/**
 * Generates a md5 hash for the given options
 */
function generateHashForOptions(options) {
  var hash = crypto.createHash("md5");
  hash.update(JSON.stringify(options));
  return hash.digest("hex");
}

module.exports = {
  loadIconsFromDiskCache: loadIconsFromDiskCache,
  emitCacheInformationFile: emitCacheInformationFile
};
