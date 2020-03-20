"use strict";

const xenvConfig = require("xenv-config");
const { merge } = require("lodash");
const userConfig = require("./user-config");

const karmaConfigSpec = {
  browser: { env: "KARMA_BROWSER", default: "chrome" }
};

module.exports = xenvConfig(karmaConfigSpec, userConfig.karma, { merge });
