#!/usr/bin/env node

"use strict";

const Module = require("module");

const originalModuleCompile = Module.prototype._compile;

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

(function() {
  const webpackCliPkg = require("webpack-cli/package.json");

  if (!webpackCliPkg.version.startsWith("4.")) {
    throw new Error("This xarc-webpack-cli is only compatible with webpack-cli version 4");
  }

  const requireAt = require("require-at")(require.resolve("webpack-cli"));

  requireAt("v8-compile-cache");

  const runCLI = requireAt("../lib/bootstrap");
  const utils = requireAt("../lib/utils");

  // Prefer the local installation of `webpack-cli`
  // This breaks yarn workspace hoist package scheme when there are multiple apps in the workspace
  // that depend on different versions of webpack

  // const importLocal = requireAt("import-local");
  // Prefer the local installation of webpack-cli
  // if (importLocal(__filename)) {
  // 	return;
  // }

  process.title = "webpack";

  if (utils.packageExists("webpack")) {
    runCLI(process.argv, originalModuleCompile);
  } else {
    const { promptInstallation, logger, colors } = utils;

    promptInstallation("webpack", () => {
      utils.logger.error(`It looks like ${colors.bold("webpack")} is not installed.`);
    })
      .then(() => {
        logger.success(`${colors.bold("webpack")} was installed successfully.`);

        runCLI(process.argv, originalModuleCompile);
      })
      .catch(() => {
        logger.error(
          `Action Interrupted, Please try once again or install ${colors.bold("webpack")} manually.`
        );

        process.exit(2);
      });
  }
})();
//# fynSourceMap=false
