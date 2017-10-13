"use strict";

const { MenuItem, helpers, logger } = require("ignite-core");
const doYo = require("../do-yo");
const Promise = require("bluebird");

module.exports = function(name, itemOptions) {
  function execute(options) {
    const promise = options.menu._clap
      ? Promise.resolve(true)
      : helpers.yesNoPrompt(itemOptions.menuText);

    return promise.then(yes => {
      if (yes) {
        options.menu.emit("done");
        logger.log(`Loading generator ${name} ...`);
        return doYo.run(name);
      }
      return undefined;
    });
  }

  itemOptions = Object.assign({}, itemOptions, { execute, noPause: true });

  return new MenuItem(itemOptions);
};
