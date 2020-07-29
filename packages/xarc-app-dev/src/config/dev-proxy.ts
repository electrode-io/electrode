"use strict";

const getDevProxy = require("./get-dev-proxy");

/*
 * For compatible with module (subapp-server/lib/util) that expect this file to
 * export the dev proxy object.
 *
 */

module.exports = getDevProxy();
