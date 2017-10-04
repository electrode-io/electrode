"use strict";

const generatorItem = require("./generator");

module.exports = function() {
  return generatorItem("electrode:component", {
    cliCmd: "generate-component",
    icon: "\u2606",
    menuText: "Generate an Electrode component repo"
  });
};
