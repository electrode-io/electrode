"use strict";

const MenuItem = require("../menu-item");

module.exports = function() {
  function execute(options) {
    options.menu.emit("exit");
  }

  return new MenuItem({
    icon: "\u261E",
    menuText: "Exit",
    execute
  });
};
