"use strict";

const Fs = require("fs");
const Path = require("path");

function getWebpackConfig(envKey) {
    const fileToLook = envKey && `./webpack.config.${envKey}`;
    const isConfigReqExist = Fs.existsSync(Path.resolve(__dirname, `${fileToLook}.js`));
    const configFile = isConfigReqExist ? fileToLook : "./webpack.config";
    
    return require(configFile);
}

module.exports = getWebpackConfig;
