"use strict";

const ck = require("chalker");
const { Levels } = require("./log-reader");

const FyiTag = ck`<yellow.inverse>[fyi]</> `;
const BunyanTag = ck`<cyan.inverse>[app]</> `;

const BunyanLevelLookup = {
  60: "error",
  50: "error",
  40: "warn",
  30: "info",
  20: "debug",
  10: "silly"
};

function parse(str) {
  let jsonData;
  let show;

  try {
    if (str[0] === "{" || str[0] === "[") {
      jsonData = JSON.parse(str);
    }
  } catch {}

  const match = str.match(/warn|error|fail|rejection|unhandled|exception|debugger listening on/i);
  if (match) {
    show = match[0].toLowerCase() === "debugger listening on" ? 1 : 2;
  }

  let message;
  let level;

  if (jsonData) {
    level = BunyanLevelLookup[jsonData.level];
    message = jsonData.msg || jsonData.message;
  }

  return {
    level: level || "info",
    message: message || str,
    json: jsonData,
    show
  };
}

module.exports = {
  BunyanTag,
  FyiTag,
  parse
};
