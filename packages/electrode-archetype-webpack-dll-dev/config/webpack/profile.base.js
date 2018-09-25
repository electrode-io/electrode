"use strict";

const profile = {
  partials: {
    _entry: { order: 200 },
    _output: { order: 400 },
    _resolve: { order: 600 },
    _define: { order: 800 },
    _dll: { order: 1000 },
    _optimize: { order: 1200 },
    _stats: { order: 1400 }
  }
};

module.exports = profile;
