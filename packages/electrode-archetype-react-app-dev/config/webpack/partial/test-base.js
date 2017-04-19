"use strict";

const sinonRegex = process.platform === "win32" ?
  /node_modules\\sinon\\/ :
  /node_modules\/sinon\//;

module.exports = {
  module: {
    /*
     * This prevents webpack from running its parsers on any sinon files. Sinon breaks when it is
     * `import`ed by a file or module such as enzyme or your spec files.
     * See here:
     * https://github.com/webpack/webpack/issues/304
     * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
     */
    noParse: [
      sinonRegex
    ]
  },
  devServer: {
    stats: "errors-only"  // only show errors
  },
  // Enzyme depends jsdom and cheerio being global to render their DOM.
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  }
};
