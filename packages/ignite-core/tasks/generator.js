"use strict";

const checkNode = require("../tasks/check-node");
const errorHandler = require("../lib/error-handler");
const Path = require("path");
const spawn = require("child_process").spawn;
const xsh = require("xsh");

const Generator = function(type, generator, igniteCore, spinner) {
  return checkNode(type, igniteCore, spinner)
    .then(function(nodeCheckPassed) {
      spinner.start();
      if (nodeCheckPassed) {
        let yoPath = "";
        let child = "";

        if (process.platform === "win32") {
          yoPath = Path.join(__dirname, "..", "..", ".bin", "yo.cmd");
          child = spawn("cmd", ["/c", `${yoPath} ${generator}`], {
            stdio: "inherit"
          });
        } else {
          yoPath = Path.join(__dirname, "..", "..", ".bin", "yo");
          child = spawn(yoPath, [generator], {
            stdio: "inherit"
          });
        }

        child.on("error", err =>
          errorHandler(err, `Failed at: Running ${generator} generator.`)
        );
        spinner.stop();
        return true;
      }
    })
    .catch(err => errorHandler(err, "Failed at: checking node env."));
};

module.exports = Generator;
