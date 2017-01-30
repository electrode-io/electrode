"use strict";

var mergeWebpackConfig = require("webpack-partial").default;
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WebpackReporter = require("electrode-webpack-reporter");
var webpack = require("webpack");
var Fs = require("fs");
var archetype = require("../../archetype");
var Path = archetype.Path;

function notifyBundleValid() {
  setTimeout(function () {
    Fs.writeFileSync(Path.resolve(archetype.eTmpDir, "bundle.valid.log"), `${Date.now()}`);
  }, 100);
}

function webpackDevReporter(reporterOptions) {
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
        notifyBundleValid();
      } else {
        errMsg = " but there were errors."
      }
      console.info("webpack: bundle is now VALID" + errMsg);
    }
  } else {
    console.info("webpack: bundle is now INVALID.");
  }
}

module.exports = function () {
  return function (config) {
    config = mergeWebpackConfig(config, {
      devServer: {
        reporter: webpackDevReporter
      },
      output: {
        publicPath: `http://${archetype.webpack.devHostname}:${archetype.webpack.devPort}/js/`,
        filename: "[name].bundle.dev.js"
      },
      plugins: [
        new webpack.SourceMapDevToolPlugin("[file].map"),
        new ExtractTextPlugin("[name].style.css"),
        new webpack.NoErrorsPlugin()
      ]
    });

    if (!process.env.HTML_WEBPACK_REPORTER_OFF) {
      const reporter = new WebpackReporter();
      reporter.apply(config);
      reporter.on("report", (reporterOptions) => {
        if (reporterOptions.state && !reporterOptions.stats.hasErrors()) {
          notifyBundleValid();
        }
      });
    }

    return config;
  };
};
