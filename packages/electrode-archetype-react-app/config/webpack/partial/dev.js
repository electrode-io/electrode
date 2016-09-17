"use strict";

var archetype = require("../../archtype");
var mergeWebpackConfig = archetype.devRequire("webpack-partial").default;
var ExtractTextPlugin = archetype.devRequire("extract-text-webpack-plugin");
var webpack = archetype.devRequire("webpack");

var fs = require("fs");

var webpackDevReporter = function (reporterOptions) {
  var state = reporterOptions.state;
  var stats = reporterOptions.stats;
  var options = reporterOptions.options;

  if (state) {
    var displayStats = (!options.quiet && options.stats !== false);

    if (displayStats && !(stats.hasErrors() || stats.hasWarnings()) && options.noInfo) {
      displayStats = false;
    }

    if (displayStats) {
      console.log(stats.toString(options.stats))
    }

    if (!options.noInfo && !options.quiet) {
      var errMsg = ".";
      if (!stats.hasErrors()) {
        setTimeout(function () {
          fs.writeFileSync(".etmp/bundle.valid.log", `${Date.now()}`);
        }, 100);
      } else {
        errMsg = " but there were errors."
      }
      console.info("webpack: bundle is now VALID" + errMsg);
    }
  } else {
    console.info("webpack: bundle is now INVALID.");
  }
};


module.exports = function () {
  return function (config) {
    config = mergeWebpackConfig(config, {
      devServer: {
        reporter: webpackDevReporter
      },
      output: {
        publicPath: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}/js/`,
        filename: config.__wmlMultiBundle
          ? "[name].bundle.dev.js"
          : "bundle.dev.js"
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin("[file].map"),
        new ExtractTextPlugin(config.__wmlMultiBundle ? "[name].style.css" : "style.css"),
        new webpack.NoErrorsPlugin()
      ]
    });

    return config;
  };
};
