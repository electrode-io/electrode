"use strict";

const generatorItem = require("./generator");

module.exports = function() {
  return generatorItem("electrode:component-add", {
    cliCmd: "add-component",
    icon: "\u272A",
    menuText: "Add a React component to your electrode component repo"
  });
};
