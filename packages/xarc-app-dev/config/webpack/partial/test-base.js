"use strict";

const Path = require("path");

module.exports = {
  module: {
    /*
     * This prevents webpack from running its parsers on any sinon files. Sinon breaks when it is
     * `import`ed by a file or module such as enzyme or your spec files.
     * See here:
     * https://github.com/webpack/webpack/issues/304
     * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
     */
    noParse: [new RegExp(Path.normalize("node_modules/sinon/").replace(/\\/g, "\\\\"))]
  },
  devServer: {
    stats: "errors-only", // only show errors
    /*
     * Karma browsers and webpack are running on different ports, which introduces
     * CORS issue.
     * The following code allows karma launched browsers to access webpack
     * bundle in `test-watch` and `test-watch-all` modes.
     */
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
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
