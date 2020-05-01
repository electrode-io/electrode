"use strict";

/* eslint-disable max-statements, complexity */

const ck = require("chalker");
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

const tagLevelMap = {
  warn: "warn",
  error: "error",
  fail: "error",
  rejection: "error",
  unhandled: "error",
  exception: "error",
  "debugger listening on": "silly"
};

function parse(str) {
  let jsonData;
  let show;

  try {
    if (str[0] === "{" || str[0] === "[") {
      jsonData = JSON.parse(str);
    }
  } catch {
    //
  }

  let message;
  let level;

  if (jsonData) {
    level = BunyanLevelLookup[jsonData.level];
    message = jsonData.msg || jsonData.message;
    if (level === "warn" || level === "error") {
      show = 2;
    }
  }

  if (!level) {
    const match = str.match(/warn|error|fail|rejection|unhandled|exception|debugger listening on/i);
    if (match) {
      const tag = match[0].toLowerCase();
      if (!level) {
        level = tagLevelMap[tag];
      }
      show = tag === "debugger listening on" ? 1 : 2;
    }
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
