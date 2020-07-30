/* eslint-disable @typescript-eslint/no-var-requires */
export {};

let cachedEnvKarma = null;

module.exports = function getEnvKarma() {
  const xenvConfig = require("xenv-config");
  const { merge } = require("lodash");
  const userConfig = require("./user-config");

  const karmaConfigSpec = {
    browser: { env: "KARMA_BROWSER", default: "chrome" }
  };
  cachedEnvKarma = cachedEnvKarma || xenvConfig(karmaConfigSpec, userConfig.karma, { merge });
  return cachedEnvKarma;
};
