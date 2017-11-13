"use strict";

const generatorItem = require("./generator");

module.exports = function() {
  return generatorItem("electrode", {
    cliCmd: "generate-app",
    icon: "\u2661",
    menuText: "Generate an Electrode application"
  });
};
