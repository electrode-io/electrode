"use strict";

const profile = {
  partials: {
    "_test-base": { order: 1000 },
    _entry: { order: 1010 },
    "_test-output": { order: 1020 },
    "_test-resolve": { order: 1030 },
    "_resolve-loader": { order: 1040 },

    _babel: { order: 2000 },
    "_extract-style": { order: 2100 },
    _fonts: { order: 2200 },
    _images: { order: 2300 }
  }
};

module.exports = profile;
