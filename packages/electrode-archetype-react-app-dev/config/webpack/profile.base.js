"use strict";

const profile = {
  partials: {
    "_base-options": { order: 100 },
    _entry: { order: 200 },
    _output: { order: 300 },
    _resolve: { order: 400 },
    "_resolve-loader": { order: 500 },
    //
    _babel: { order: 2000 },
    "_extract-style": { order: 2100 },
    _fonts: { order: 2200 },
    _images: { order: 2300 },
    _stats: { order: 2400 },
    _isomorphic: { order: 2500 },
    _pwa: { order: 2600 },
    "_dll-load": { order: 10000 },
    _node: { order: 30000 }
  }
};

module.exports = profile;
