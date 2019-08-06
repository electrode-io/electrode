"use strict";

const generateConfig = require("./util/generate-config");

let profile = "production";
if (process.env.WEBPACK_DEV_PROFILE === "true") {
    profile =  "development";
}

const options = require(`./options/${profile}`);

module.exports = {
    compose: generateConfig,
    env: profile,
    options: options
};
