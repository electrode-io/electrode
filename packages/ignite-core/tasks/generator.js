"use strict";

const checkNode = require("../tasks/check-node");
const errorHandler = require("../lib/error-handler");
const Path = require("path");
const spawn = require("child_process").spawn;
const xsh = require("xsh");

const Generator = function(type, generator) {
  return checkNode()
    .then(function(nodeCheckPassed) {
      if (nodeCheckPassed) {
        let yoPath = "";
        let child = "";

        if(process.platform.startsWith("win")) {
          yoPath = Path.join(__dirname, '..', '..', '.bin', 'yo.cmd');
          yoPath = yoPath.replace(/\//g, "\\");
          generator = generator.replace(/\//g,"\\");
          child = spawn("cmd", ["/c", `${yoPath} ${generator}`], {
            stdio: "inherit"
          });
        } else {
          yoPath = Path.join(__dirname, '..', '..', '.bin', 'yo');
          child = spawn(yoPath, [generator], {
            stdio: "inherit"
          });
        }

        child.on("error", err =>
          errorHandler(err, `Failed at: Running ${generator} generator.`)
        );
      }
    })
    .catch(err => errorHandler(err, "Failed at: checking node env."));
};

module.exports = Generator;
