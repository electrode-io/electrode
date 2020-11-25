/* eslint-disable @typescript-eslint/no-var-requires */
export {};

module.exports = function getEnvKarma() {
  const xenvConfig = require("xenv-config");
  const { merge } = require("lodash");
  const userConfig = require("./user-config");

  const karmaConfigSpec = {
    browser: { env: "KARMA_BROWSER", default: "chrome" }
  };
  return xenvConfig(karmaConfigSpec, userConfig.karma, { merge });
};
