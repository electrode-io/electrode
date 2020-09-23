import { XarcUserConfigs } from "./xarc-user-configs";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const getUserConfig = require("./user-config");
export const syncWebpackProcessEnvVars = (
  xarcUserConfig: XarcUserConfigs = {}
): XarcUserConfigs => {
  const userVals = xarcUserConfig.webpack || {};
  const userKeys = "webpackDev,devHostname,devPort,cdnProtocol,cdnHostname,cdnPort".split(",");
  const envKeys = `WEBPACK_DEV,WEBPACK_HOST,WEBPACK_PORT,WEBPACK_DEV_CDN_PROTOCOL,WEBPACK_DEV_CDN_HOSTNAME,WEBPACK_DEV_CDN_PORT`.split(
    ","
  );
  userKeys.map((userKey, idx) => {
    const envKey = envKeys[idx];
    if (userVals[userKey]) {
      process.env[envKey] = userVals[userKey];
    }
  });

  return xarcUserConfig;
};

export const syncAdditionalEnvVars = (xarcUserConfig: XarcUserConfigs = {}): XarcUserConfigs => {
  [
    "KARMA_BROWSER",
    "SERVER_ES6",
    "ELECTRODE_DEV_OPEN_BROWSER",
    "_ELECTRODE_DEV_",
    "STATIC_FILES",
    "ENABLE_KARMA_COV",
    "NODE_ENV",
    "WEBPACK_DEV",
    "HOST",
    "PORT"
  ].map(key => {
    if (xarcUserConfig[key]) {
      process.env[key] = xarcUserConfig[key];
    }
  });

  return xarcUserConfig;
};

export const mergeOptionalCheckIntoConfig = (
  xarcUserConfig: XarcUserConfigs = {}
): XarcUserConfigs => {
  const configs = getUserConfig();
  xarcUserConfig.options = { ...configs.options, ...xarcUserConfig.options };
  return xarcUserConfig;
};
