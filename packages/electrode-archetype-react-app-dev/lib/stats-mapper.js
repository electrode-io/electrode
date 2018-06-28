"use strict";

function extractBundles(stats) {
  // Stats has modules, single bundle
  if (stats.modules) return [stats];

  // Stats has children, multiple bundles
  if (stats.children && stats.children.length) return stats.children;

  // Not sure, assume single
  return [stats];
}

function getBundles(statsResult) {
  // For multi-compiler, stats will be an object with a 'children' array of stats
  const bundles = extractBundles(statsResult.toJson({ errorDetails: false }));
  return bundles.map(stats => {
    return {
      name: stats.name,
      time: stats.time,
      hash: stats.hash,
      warnings: stats.warnings || [],
      errors: stats.errors || [],
      modules: stats.modules.map(x => x.name)
    };
  });
}

module.exports = {
  getBundles
};
