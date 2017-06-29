"use strict";

const istanbulLibInstrument = require("istanbul-lib-instrument");
const loaderUtils = require("loader-utils");
const convert = require("convert-source-map");

module.exports = function(source, sourceMap) {
  // use inline source map, if any
  const inlineSourceMap = convert.fromSource(source);
  if (!sourceMap && inlineSourceMap) {
    sourceMap = inlineSourceMap.sourcemap;
  }

  const userOptions = loaderUtils.parseQuery(this.query);
  const instrumenter = istanbulLibInstrument.createInstrumenter(
    Object.assign({ produceSourceMap: this.sourceMap }, userOptions)
  );

  if (this.cacheable) {
    this.cacheable();
  }

  return instrumenter.instrument(
    source,
    this.resourcePath,
    (error, src) => {
      this.callback(error, src, instrumenter.lastSourceMap());
    },
    sourceMap
  );
};
