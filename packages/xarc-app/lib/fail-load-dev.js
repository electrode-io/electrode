"use strict";

const logger = require("./logger");

module.exports = function failLoadDev(err) {
  logger.error(err);
  logger.error(`

  Unable to load xrun tasks from the module @xarc/app-dev

  Please check to make sure that:

    - You have @xarc/app-dev in your devDependencies
    - It's installed under node_modules.  ie: 'npm ls @xarc/app-dev'
    - Both @xarc/app and @xarc/app-dev have the same version

`);

  process.exit(1); // eslint-disable-line
};
