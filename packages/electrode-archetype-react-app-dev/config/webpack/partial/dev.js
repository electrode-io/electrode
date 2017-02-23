"use strict";

const mergeWebpackConfig = require("webpack-partial").default;
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackReporter = require("electrode-webpack-reporter");
const webpack = require("webpack");
const Fs = require("fs");
const archetype = require("../../archetype");
const Path = archetype.Path;

function notifyBundleValid() {
  setTimeout(() => {
    Fs.writeFileSync(Path.resolve(archetype.eTmpDir, "bundle.valid.log"), `${Date.now()}`);
  }, 100);
}

/* eslint max-statements: 0 */
function webpackDevReporter(reporterOptions) {
  const state = reporterOptions.state;
  const stats = reporterOptions.stats;
  const options = reporterOptions.options;

  if (state) {
    let displayStats = (!options.quiet && options.stats !== false);

    if (displayStats && !(stats.hasErrors() || stats.hasWarnings()) && options.noInfo) {
      displayStats = false;
    }

    if (displayStats) {
      console.log(stats.toString(options.stats));
    }

    if (!options.noInfo && !options.quiet) {
      let errMsg = ".";
      if (!stats.hasErrors()) {
        notifyBundleValid();
      } else {
        errMsg = " but there were errors.";
      }
      console.info(`webpack: bundle is now VALID ${errMsg}`);
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
        new ExtractTextPlugin({ filename: "[name].style.css" }),
        new webpack.NoEmitOnErrorsPlugin()
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
