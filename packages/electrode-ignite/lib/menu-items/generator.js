"use strict";

const { MenuItem, helpers } = require("ignite-core");
const doYo = require("../do-yo");

module.exports = function(name, itemOptions) {
  function execute(options) {
    return helpers.yesNoPrompt(itemOptions.menuText).then(yes => {
      if (yes) {
        options.menu.emit("done");
        return doYo.run(name);
      }
      return undefined;
    });
  }

  itemOptions = Object.assign({}, itemOptions, { execute });

  return new MenuItem(itemOptions);
};
