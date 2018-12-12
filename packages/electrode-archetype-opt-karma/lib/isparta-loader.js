"use strict";

const isparta = require("isparta");

module.exports = function(source) {
  const options = this.options || {};
  const config = options.isparta || {
    embedSource: true,
    noAutoWrap: true,
    babel: options.babel
  };

  const instrumenter = new isparta.Instrumenter(config);

  if (this.cacheable) {
    this.cacheable();
  }

  return instrumenter.instrumentSync(source, this.resourcePath);
};
