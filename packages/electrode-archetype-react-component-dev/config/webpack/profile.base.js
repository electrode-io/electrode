"use strict";

const profile = {
  partials: {
    "_base-options": { order: 100 },
    _entry: { order: 200 },
    _output: { order: 300 },
    _resolve: { order: 400 },
    "_resolve-loader": { order: 500 },

    _babel: { order: 2000 },
    "_extract-style": { order: 2100 },
    _fonts: { order: 2200 },
    _images: { order: 2300 }
  }
};

module.exports = profile;
