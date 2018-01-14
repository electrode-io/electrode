"use strict";

const VisualLogger = require("visual-logger");

if (process.env.CI) {
  console.log("CI env detected");
}

module.exports = new VisualLogger().setItemType(process.env.CI ? "none" : "normal");
