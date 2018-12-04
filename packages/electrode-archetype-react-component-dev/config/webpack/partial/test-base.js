"use strict";

/*
 * This prevents webpack from running its
 * parsers on any sinon files. Sinon breaks
 * when it is `import`ed by a file or module.
 * Such as enzyme or your spec files.
 * See here:
 * https://github.com/webpack/webpack/issues/304
 * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
 */

// match paths that contain node_modules/sinon/ or node_modules\sinon\ (win32)
const noParse = [/node_modules[\/\\]sinon[\/\\]/];

module.exports = {
  cache: true,
  devtool: "source-map",
  module: { noParse },
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/addons": true, // important!! https://github.com/airbnb/enzyme/issues/302
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  }
};
