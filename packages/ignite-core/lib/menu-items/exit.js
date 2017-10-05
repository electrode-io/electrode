"use strict";

const MenuItem = require("../menu-item");
const logger = require("../util/logger");

module.exports = function() {
  function execute(options) {
    logger.log("Bye!");
    options.menu.emit("exit");
  }

  return new MenuItem({
    icon: "\u261E",
    menuText: "Exit",
    noPause: true,
    execute
  });
};
