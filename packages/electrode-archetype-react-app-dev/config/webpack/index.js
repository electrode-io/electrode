"use strict";

const generateConfig = require("./util/generate-config");

const profile = process.env.ELECTRODE_WEBPACK_PROFILE || "production";
const options = require(`./options/${profile}`);

module.exports = {
    compose: generateConfig,
    env: profile,
    options
};
