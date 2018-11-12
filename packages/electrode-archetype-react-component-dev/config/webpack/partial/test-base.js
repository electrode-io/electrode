"use strict";

var prodCfg = require("../webpack.config");

/*
 * This prevents webpack from running its
 * parsers on any sinon files. Sinon breaks
 * when it is `import`ed by a file or module.
 * Such as enzyme or your spec files.
 * See here:
 * https://github.com/webpack/webpack/issues/304
 * https://github.com/sinonjs/sinon/pull/600#issuecomment-162529457
 */
/*
 * Added fix for "clap check" on Windows
 */
if (process.platform === "win32") {
  prodCfg.module.noParse = [/node_modules\\sinon\\/];
} else {
  prodCfg.module.noParse = [/node_modules\/sinon\//];
}

module.exports = {
  cache: true,
  devtool: "source-map",
  module: prodCfg.module,
  plugins: prodCfg.plugins,
  externals: {
    jsdom: "window",
    cheerio: "window",
    "react/addons": true, // important!! https://github.com/airbnb/enzyme/issues/302
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  }
};
